import { handleWebhook } from "@/lib/telegram-bot";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    await handleWebhook(body);
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[api/telegram/webhook] Erro:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
