import TelegramBot from "node-telegram-bot-api";
import Groq from "groq-sdk";
import type { TerritorioPrimario } from "@/types/diagnostico";

interface ConviteParams {
  username: string;
  nome: string;
  territorio: TerritorioPrimario;
  frase_reconhecimento: string;
}

interface DiagnosticoEscolhido {
  id: string;
  nome: string;
  territorio_primario: string;
  score: number;
  frase_reconhecimento: string;
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

export async function enviarConviteTelegram({
  username,
  frase_reconhecimento,
}: ConviteParams): Promise<boolean> {
  const bot = getBot();
  if (!bot || process.env.ENABLE_TELEGRAM_CONVITES !== "true") return false;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
  const mensagem = `
${frase_reconhecimento}

Seu diagnóstico de ressonância identificou alinhamento com a frequência da *RCT — Religião Científica Tecnológica*: a convergência entre Ahimsa de Patanjali, a epigenética moderna e o ensinamento técnico de Jesus como o maior engenheiro comportamental da história.

Você é convidado — não recrutado — a iniciar o treinamento Divya Manas e explorar a plataforma religiosa digital da RCT.

🔗 [Iniciar treinamento](${siteUrl}/treinamento)

_Este convite chegou porque você já vive o que aqui se cultiva._
  `.trim();

  try {
    const cleanUsername = username.replace(/^@/, "");
    const chat = await bot.getChat(`@${cleanUsername}`);
    await bot.sendMessage(chat.id, mensagem, { parse_mode: "Markdown" });
    return true;
  } catch (error) {
    console.error("[telegram] Falha ao enviar convite:", error);
    return false;
  }
}

interface TriagemAlerta {
  ahimsa_principiologico: boolean;
  coerencia_textual: number;
  apto_treinamento: boolean;
  fase_sugerida: string;
  notas_admin: string;
}

export async function alertarAdminTriagem(
  dados: DiagnosticoEscolhido & { triagem: TriagemAlerta }
): Promise<void> {
  const bot = getBot();
  const chatId = process.env.TELEGRAM_ADMIN_CHAT_ID;
  if (!bot || !chatId || process.env.ENABLE_ADMIN_ALERTS !== "true") return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "";
  const msg = `
🔬 *TRIAGEM INTERNA — APTO TREINAMENTO*

Nome: ${dados.nome}
Território: ${dados.territorio_primario}
Score público: ${dados.score}/100
Coerência textual: ${dados.triagem.coerencia_textual}%
Fase sugerida: ${dados.triagem.fase_sugerida}

Frase IA: _"${dados.frase_reconhecimento}"_
Notas: _${dados.triagem.notas_admin}_

📋 [Revisar no admin](${siteUrl}/admin?tab=triagem)
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
      "O assistente RCT está temporariamente indisponível. Visite o diagnóstico em /diagnostico."
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
          content: `Você é o assistente da RCT — Religião Científica Tecnológica.
Responda com precisão científica e tom sóbrio. Nunca use linguagem mística vaga.
Conecte sempre os ensinamentos de Jesus e Ahimsa de Patanjali à neurociência e epigenética.
Seja conciso: máximo 3 parágrafos. Sempre convide para o diagnóstico em /diagnostico.
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
