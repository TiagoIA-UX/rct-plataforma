import { prisma } from "@/lib/prisma";
import { getPaymentById } from "@/lib/mercadopago-rct";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const paymentId = body?.data?.id;

    if (!paymentId) {
      return Response.json({ ok: true });
    }

    const payment = await getPaymentById(String(paymentId));
    const status = payment.status;
    const email = payment.payer?.email;
    const metadata = payment.metadata as Record<string, string> | undefined;

    if (status === "approved" && email) {
      await prisma.membro.upsert({
        where: { email },
        create: {
          email,
          nome: metadata?.nome || email.split("@")[0],
          plano: metadata?.plano || "rede_mensal",
          status: "ativo",
          diagnostico_id: metadata?.diagnosticoId || null,
        },
        update: {
          plano: metadata?.plano || "rede_mensal",
          status: "ativo",
        },
      });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("[webhook/mercadopago] Erro:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}
