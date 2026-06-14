import { handlePostsWebhook } from "@/lib/telegram-posts-bot";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const segredo = process.env.TELEGRAM_POSTS_WEBHOOK_SECRET;
  if (segredo) {
    const header = req.headers.get("x-telegram-bot-api-secret-token");
    if (header !== segredo) {
      return Response.json({ ok: false, error: "Não autorizado" }, { status: 401 });
    }
  }

  try {
    const body = await req.json();
    await handlePostsWebhook(body);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[api/telegram/posts-webhook] Erro:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
