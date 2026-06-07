import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { analisarProvaTreinamento } from "@/lib/prova-analise";

const schema = z.object({
  email: z.string().email(),
  nome: z.string().min(2).optional(),
  fase: z.enum(["divya_manas", "fase_i", "fase_ii", "fase_iii"]),
  resposta: z.string().min(200, "Desenvolva sua resposta com pelo menos 200 caracteres."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return Response.json({ error: "Dados inválidos", details: parsed.error.flatten() }, { status: 400 });
    }

    const { email, nome, fase, resposta } = parsed.data;
    const analise = await analisarProvaTreinamento(fase, resposta, email);

    await prisma.membro.upsert({
      where: { email },
      create: { email, nome: nome ?? null, fase_atual: fase, status: "em_treinamento" },
      update: { fase_atual: fase, status: "em_treinamento" },
    });

    const status = analise.aprovado_automatico ? "em_analise" : "pendente";

    const prova = await prisma.provaTreinamento.create({
      data: {
        membro_email: email,
        fase,
        resposta,
        score_coerencia: analise.score_coerencia,
        score_mentira: analise.score_mentira,
        indicadores: analise.indicadores,
        status,
        notas_admin: analise.notas,
      },
    });

    return Response.json({
      prova_id: prova.id,
      status,
      score_coerencia: analise.score_coerencia,
      mensagem:
        status === "em_analise"
          ? "Sua prova será revisada pelo administrador antes da próxima fase."
          : "Continue desenvolvendo sua resposta. O oleiro ainda molda a argila.",
    });
  } catch (error) {
    console.error("[api/treinamento/prova] Erro:", error);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
