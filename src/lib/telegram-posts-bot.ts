/**
 * ============================================================
 * BOT DE APROVAÇÃO DE POSTS — t.me/posts_do_dia_bot
 * RCT — Ressonância Científica Tecnológica
 * ============================================================
 *
 * Fluxo:
 *   1. Cron 03h gera rascunho (publicado: false, pendente_revisao: true)
 *   2. Este bot envia mensagem personalizada ao fundador com botões
 *   3. Sem aprovação no botão -> NADA é publicado
 *
 * Bot dedicado, separado do assistente RCT (TELEGRAM_BOT_TOKEN).
 * ============================================================
 */

import TelegramBot from "node-telegram-bot-api";
import { publicarArtigoPorId, rejeitarArtigoPorId } from "@/lib/blog-agent";
import { prisma } from "@/lib/prisma";

type Artigo = {
  id: string;
  titulo: string;
  subtitulo: string | null;
  slug: string;
  categoria: string;
  tempo_leitura: string | null;
  meta_descricao: string | null;
  conteudo_html: string;
  image_url: string | null;
};

export interface PostsCallbackQuery {
  id: string;
  data?: string;
  message?: { chat: { id: number }; message_id: number };
  from?: { id: number; first_name?: string };
}

export interface PostsUpdate {
  message?: { chat: { id: number }; text?: string; from?: { id: number; first_name?: string } };
  callback_query?: PostsCallbackQuery;
}

function getBot(): TelegramBot | null {
  const token = process.env.TELEGRAM_POSTS_BOT_TOKEN;
  if (!token) return null;
  return new TelegramBot(token, { polling: false });
}

function chatAutorizado(): string | null {
  return process.env.TELEGRAM_POSTS_CHAT_ID?.trim() || null;
}

function stripHtml(html: string, max = 380): string {
  const texto = html
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return texto.length > max ? `${texto.slice(0, max)}…` : texto;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function montarMensagem(artigo: Artigo): string {
  const base = siteUrl();
  const preview = stripHtml(artigo.conteudo_html);
  const linhas = [
    "📝 <b>Novo artigo aguardando sua aprovação</b>",
    "",
    `<b>${escapeHtml(artigo.titulo)}</b>`,
    artigo.subtitulo ? `<i>${escapeHtml(artigo.subtitulo)}</i>` : "",
    "",
    `📂 Categoria: <code>${escapeHtml(artigo.categoria)}</code>`,
    artigo.tempo_leitura ? `⏱️ ${escapeHtml(artigo.tempo_leitura)}` : "",
    artigo.meta_descricao ? `\n${escapeHtml(artigo.meta_descricao)}` : "",
    "",
    `<b>Prévia:</b> ${escapeHtml(preview)}`,
    "",
    `🔗 Revisar completo: ${base}/admin/artigos/${artigo.slug}`,
    "",
    "Aprove para publicar ou rejeite para descartar. Sem sua confirmação, nada é postado.",
  ];
  return linhas.filter((l) => l !== "").join("\n");
}

/** Envia a proposta do artigo (rascunho) para aprovação humana. */
export async function enviarPropostaArtigo(artigo: Artigo): Promise<boolean> {
  const bot = getBot();
  const chatId = chatAutorizado();
  if (!bot) {
    console.warn("[posts-bot] TELEGRAM_POSTS_BOT_TOKEN ausente — proposta não enviada.");
    return false;
  }
  if (!chatId) {
    console.warn("[posts-bot] TELEGRAM_POSTS_CHAT_ID ausente — envie /start ao bot e configure.");
    return false;
  }

  try {
    await bot.sendMessage(chatId, montarMensagem(artigo), {
      parse_mode: "HTML",
      disable_web_page_preview: false,
      reply_markup: {
        inline_keyboard: [
          [
            { text: "✅ Aprovar e publicar", callback_data: `aprovar:${artigo.id}` },
            { text: "🗑️ Rejeitar", callback_data: `rejeitar:${artigo.id}` },
          ],
        ],
      },
    });
    return true;
  } catch (error) {
    console.error("[posts-bot] Falha ao enviar proposta:", error);
    return false;
  }
}

async function responderCallback(
  bot: TelegramBot,
  cb: PostsCallbackQuery,
  texto: string
): Promise<void> {
  try {
    await bot.answerCallbackQuery(cb.id, { text: texto });
  } catch (error) {
    console.error("[posts-bot] Falha ao responder callback:", error);
  }
}

async function editarMensagem(
  bot: TelegramBot,
  cb: PostsCallbackQuery,
  sufixo: string
): Promise<void> {
  if (!cb.message) return;
  try {
    await bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: cb.message.chat.id, message_id: cb.message.message_id }
    );
    await bot.sendMessage(cb.message.chat.id, sufixo, { parse_mode: "HTML" });
  } catch (error) {
    console.error("[posts-bot] Falha ao editar mensagem:", error);
  }
}

/** Processa updates do webhook do bot de posts (mensagens e cliques nos botões). */
export async function handlePostsWebhook(update: PostsUpdate): Promise<void> {
  const bot = getBot();
  if (!bot) return;

  // Comandos de texto (/start, /pendentes)
  if (update.message?.text) {
    const { chat, text, from } = update.message;
    const autorizado = chatAutorizado();

    if (text.startsWith("/start")) {
      const jaConfig = autorizado
        ? "\n\n✅ Este chat já está configurado para receber as propostas."
        : "\n\n⚠️ Configure TELEGRAM_POSTS_CHAT_ID com o id acima para ativar as notificações.";
      await bot.sendMessage(
        chat.id,
        `🤖 <b>Bot de Aprovação de Posts — RCT</b>\n\nSeu chat id é: <code>${chat.id}</code>${jaConfig}\n\nA cada 03h você receberá o artigo do dia para aprovar ou rejeitar.`,
        { parse_mode: "HTML" }
      );
      console.log(`[posts-bot] /start de ${from?.first_name ?? "?"} — chat id ${chat.id}`);
      return;
    }

    if (text.startsWith("/pendentes")) {
      if (autorizado && String(chat.id) !== autorizado) return;
      const pendentes = await prisma.artigo.findMany({
        where: { publicado: false, pendente_revisao: true },
        orderBy: { created_at: "desc" },
        take: 10,
        select: { id: true, titulo: true, slug: true },
      });
      if (!pendentes.length) {
        await bot.sendMessage(chat.id, "Nenhum rascunho pendente no momento.");
        return;
      }
      const lista = pendentes.map((p, i) => `${i + 1}. ${p.titulo}`).join("\n");
      await bot.sendMessage(chat.id, `📋 <b>Rascunhos pendentes (${pendentes.length})</b>\n\n${lista}`, {
        parse_mode: "HTML",
      });
      return;
    }
    return;
  }

  // Cliques nos botões
  const cb = update.callback_query;
  if (!cb?.data) return;

  const autorizado = chatAutorizado();
  const origem = cb.message?.chat.id ?? cb.from?.id;
  if (autorizado && String(origem) !== autorizado) {
    await responderCallback(bot, cb, "Não autorizado.");
    return;
  }

  const [acao, id] = cb.data.split(":");
  if (!id) {
    await responderCallback(bot, cb, "Ação inválida.");
    return;
  }

  if (acao === "aprovar") {
    const artigo = await publicarArtigoPorId(id);
    if (!artigo) {
      await responderCallback(bot, cb, "Rascunho não encontrado.");
      return;
    }
    await responderCallback(bot, cb, "Publicado!");
    await editarMensagem(
      bot,
      cb,
      `✅ <b>Publicado:</b> ${escapeHtml(artigo.titulo)}\n${siteUrl()}/blog/${artigo.slug}`
    );
    return;
  }

  if (acao === "rejeitar") {
    const artigo = await rejeitarArtigoPorId(id);
    if (!artigo) {
      await responderCallback(bot, cb, "Rascunho não encontrado.");
      return;
    }
    await responderCallback(bot, cb, "Rejeitado e descartado.");
    await editarMensagem(bot, cb, `🗑️ <b>Rejeitado:</b> ${escapeHtml(artigo.titulo)}`);
    return;
  }

  await responderCallback(bot, cb, "Ação desconhecida.");
}
