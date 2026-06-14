import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import {
  enviarBoasVindas,
  sincronizarResendAudience,
  statusResendConfig,
} from "@/lib/newsletter-mail";

const schema = z.object({
  email: z.string().email(),
  nome: z.string().optional(),
  consentimento: z.boolean().default(true),
});

async function processarInscricao(email: string, nome?: string) {
  await sincronizarResendAudience(email, nome);
  const resultado = await enviarBoasVindas(email, nome);
  const cfg = statusResendConfig();

  return {
    email_enviado: resultado.ok,
    aviso_email: resultado.ok
      ? undefined
      : resultado.erro ||
        cfg.from_motivo ||
        "E-mail pendente — configure RESEND_FROM_EMAIL com domínio verificado no Resend.",
    resend_id: resultado.id,
  };
}

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
          data: { ativo: true, nome: dados.nome ?? existente.nome, consentimento: true },
        });
        const email = await processarInscricao(dados.email, dados.nome ?? existente.nome ?? undefined);
        return Response.json({ ok: true, reativado: true, ...email });
      }
      // Reenvia boas-vindas se solicitado de novo (botão funcional para quem não recebeu)
      const email = await processarInscricao(dados.email, dados.nome ?? existente.nome ?? undefined);
      return Response.json({ ok: true, ja_inscrito: true, ...email });
    }

    await prisma.newsletter.create({
      data: {
        email: dados.email,
        nome: dados.nome,
        consentimento: dados.consentimento,
      },
    });

    const email = await processarInscricao(dados.email, dados.nome);
    return Response.json({ ok: true, ...email });
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

/** GET — diagnóstico (sem PII) para validar configuração */
export async function GET() {
  const cfg = statusResendConfig();
  const total = await prisma.newsletter.count({ where: { ativo: true } });
  return Response.json({
    newsletter: { inscritos_ativos: total },
    resend: cfg,
  });
}
