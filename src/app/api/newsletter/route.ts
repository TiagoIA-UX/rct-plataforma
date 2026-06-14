import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  email: z.string().email(),
  nome: z.string().optional(),
  consentimento: z.boolean().default(true),
});

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const dados = schema.parse(body);

    const existente = await prisma.newsletter.findUnique({
      where: { email: dados.email },
    });

    if (existente) {
      if (!existente.ativo) {
        await prisma.newsletter.update({
          where: { email: dados.email },
          data: { ativo: true, nome: dados.nome ?? existente.nome },
        });
        return Response.json({ ok: true, reativado: true });
      }
      return Response.json({ ok: true, ja_inscrito: true });
    }

    const inscrito = await prisma.newsletter.create({
      data: {
        email: dados.email,
        nome: dados.nome,
        consentimento: dados.consentimento,
      },
    });

    if (resend && process.env.RESEND_AUDIENCE_ID) {
      try {
        const { data } = await resend.contacts.create({
          email: dados.email,
          firstName: dados.nome ?? undefined,
          audienceId: process.env.RESEND_AUDIENCE_ID,
          unsubscribed: false,
        });
        if (data?.id) {
          await prisma.newsletter.update({
            where: { id: inscrito.id },
            data: { resend_id: data.id },
          });
        }
      } catch (err) {
        console.warn("[newsletter] Resend sync falhou — inscrito localmente.", err);
      }
    }

    if (resend && process.env.RESEND_FROM_EMAIL) {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: dados.email,
        subject: "Bem-vindo à RCT — Ressonância Científica Tecnológica",
        html: `
<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0d1520; color: #F8F6F0;">
  <h1 style="color: #C9A84C; font-size: 24px;">Você chegou aqui porque algo fez sentido para você.</h1>
  <p style="color: rgba(248,246,240,0.85); line-height: 1.8;">
    ${dados.nome ? `${dados.nome}, obrigado` : "Obrigado"} por se inscrever na newsletter da
    <strong style="color: #C9A84C;">RCT — Ressonância Científica Tecnológica</strong>.
  </p>
  <p style="color: rgba(248,246,240,0.75); line-height: 1.8;">
    Aqui você receberá artigos que unem ciência do comportamento e reflexão no dia a dia —
    sempre com referência publicada e honestidade sobre o que ajuda e o que pode prejudicar.
  </p>
  <p style="color: rgba(248,246,240,0.5); font-size: 13px; margin-top: 32px;">
    <em>«A verdade não precisa de floreio. Precisa ser clara — e de coragem para se corrigir.»</em>
  </p>
  <hr style="border-color: rgba(200,169,81,0.2); margin: 32px 0;" />
  <p style="color: rgba(248,246,240,0.3); font-size: 12px;">
    Para cancelar sua inscrição a qualquer momento,
    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/unsubscribe?email=${encodeURIComponent(dados.email)}" style="color: #C9A84C;">clique aqui</a>.
  </p>
</div>`,
      }).catch((err) => console.warn("[newsletter] Email de boas-vindas falhou:", err));
    }

    return Response.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return Response.json({ error: "Dados inválidos.", detalhes: err.errors }, { status: 400 });
    }
    console.error("[newsletter] Erro:", err);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  if (!email) return Response.json({ error: "Email obrigatório." }, { status: 400 });

  await prisma.newsletter.updateMany({
    where: { email },
    data: { ativo: false },
  });

  return Response.json({ ok: true });
}
