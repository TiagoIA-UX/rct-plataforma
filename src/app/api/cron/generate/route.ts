import { gerarArtigoDivino, criarRascunhoArtigo } from "@/lib/rct-blog.server";
import { enviarPropostaArtigo } from "@/lib/telegram-posts-bot";
import { isCronAuthorized } from "@/lib/config/env";
import { isDiaSagrado } from "@/lib/cron-sacred-day";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  if (!isCronAuthorized(req.headers.get("authorization"))) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (isDiaSagrado()) {
    return Response.json({
      skipped: true,
      reason: "Dia sagrado (sábado) — sem geração automática.",
    });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: "GROQ_API_KEY não configurada." }, { status: 503 });
  }

  const { searchParams } = new URL(req.url);
  const temaOverride = searchParams.get("tema") ?? undefined;

  try {
    // Geração exclusiva pelo pipeline multi-agente — sem fallback nem placeholders.
    const artigo = await gerarArtigoDivino(temaOverride);
    if (!artigo) {
      return Response.json(
        { error: "Pipeline não produziu artigo completo — nada publicado." },
        { status: 500 }
      );
    }

    // SEMPRE rascunho: só publica após aprovação humana no bot do Telegram.
    const rascunho = await criarRascunhoArtigo(artigo);
    const notificado = await enviarPropostaArtigo(rascunho);

    return Response.json({
      success: true,
      status: "aguardando_aprovacao",
      notificado_telegram: notificado,
      artigo: { id: rascunho.id, slug: rascunho.slug, titulo: rascunho.titulo },
    });
  } catch (error) {
    console.error("[api/cron/generate] Erro:", error);
    return Response.json({ error: "Erro ao gerar artigo." }, { status: 500 });
  }
}
