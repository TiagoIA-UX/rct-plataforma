import TelegramBot from "node-telegram-bot-api";
import Groq from "groq-sdk";
import { montarTextoConviteProtocolo } from "@/lib/convites";
import { CONVITE_SCORE_MINIMO, incluiTermosEpigeneticos } from "@/lib/ressonancia-pesos";
import type { TerritorioPrimario } from "@/types/diagnostico";

interface ConviteParams {
  username: string;
}

interface AlertaRessonanciaParams {
  score: number;
  territorio_primario: TerritorioPrimario | string;
  textosAnalise?: string[];
}

interface TelegramMessage {
  chat: { id: number };
  text?: string;
}

export interface TelegramUpdate {
  message?: TelegramMessage;
}

function getBot(): TelegramBot | null {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  if (!token) return null;
  return new TelegramBot(token, { polling: false });
}

/** Convite protocolo imutável — Etapa 5.2; disparo somente score >= 60 */
export async function enviarConviteTelegram({ username }: ConviteParams): Promise<boolean> {
  const bot = getBot();
  if (!bot || process.env.ENABLE_TELEGRAM_CONVITES !== "true") return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
  const linkMembros = `${siteUrl}/formacao`;
  const mensagem = montarTextoConviteProtocolo(linkMembros);

  try {
    const cleanUsername = username.replace(/^@/, "");
    const chat = await bot.getChat(`@${cleanUsername}`);
    await bot.sendMessage(chat.id, mensagem);
    return true;
  } catch (error) {
    console.error("[telegram] Falha ao enviar convite:", error);
    return false;
  }
}

/**
 * Alerta admin — Protocolo Etapa 6 — conformidade LGPD/GDPR.
 * Envia apenas: score (numérico), território de interesse (categoria), timestamp.
 * NÃO envia: nome, e-mail, username, IP ou qualquer dado pessoal identificável.
 * Disparo condicional: apenas se score >= CONVITE_SCORE_MINIMO (60) e
 * ENABLE_ADMIN_ALERTS=true.
 */
export async function alertarAltaRessonancia({
  score,
  territorio_primario,
  textosAnalise = [],
}: AlertaRessonanciaParams): Promise<void> {
  const bot = getBot();
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID ?? process.env.TELEGRAM_CHAT_ID;
  if (!bot || !chatId || process.env.ENABLE_ADMIN_ALERTS !== "true") return;
  if (score < CONVITE_SCORE_MINIMO) return;

  const alertaViveka = incluiTermosEpigeneticos(...textosAnalise)
    ? `

🔔 *ALERTA VIVEKA ATIVADO*

Esta ressonância inclui termos de alto peso epigenético.
Verifique: o conteúdo que atraiu esta pessoa aplica a Salvaguarda 0.1?`
    : "";

  const msg = `
🔬 *Alta ressonância detectada*

Score: ${score}/100
Categoria de interesse: ${territorio_primario}
Timestamp: ${new Date().toISOString()}${alertaViveka}
  `.trim();

  try {
    await bot.sendMessage(chatId, msg, { parse_mode: "Markdown" });
  } catch (error) {
    console.error("[telegram] Falha ao alertar admin:", error);
  }
}

export async function handleWebhook(body: TelegramUpdate): Promise<void> {
  const bot = getBot();
  const { message } = body;
  if (!bot || !message?.text) return;

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey) {
    await bot.sendMessage(
      message.chat.id,
      "O assistente RCT está temporariamente indisponível. Visite o blog em /blog ou O Caminho em /caminho."
    );
    return;
  }

  const groq = new Groq({ apiKey: groqKey });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";

  try {
    const resposta = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Você é o assistente da RCT — Ressonância Científica Tecnológica.
Responda com precisão científica e tom sóbrio. Nunca use linguagem mística vaga.
Priorize neurociência comportamental com referências publicadas. Tom respeitoso.
Seja conciso: máximo 3 parágrafos. Convide para explorar o blog (/blog) ou O Caminho (/caminho).
Site: ${siteUrl}`,
        },
        { role: "user", content: message.text },
      ],
      max_tokens: 600,
    });

    await bot.sendMessage(
      message.chat.id,
      resposta.choices[0]?.message?.content ?? "Não foi possível processar sua mensagem.",
      { parse_mode: "Markdown" }
    );
  } catch (error) {
    console.error("[telegram] Erro no webhook:", error);
    await bot.sendMessage(message.chat.id, "Ocorreu um erro ao processar sua mensagem.");
  }
}
