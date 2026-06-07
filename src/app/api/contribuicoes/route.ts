import { prisma } from "@/lib/prisma";
import { contribuicaoSchema } from "@/lib/validations/contribuicao";

export async function GET() {
  try {
    const contribuicoes = await prisma.contribuicao.findMany({
      where: { status: { in: ["incorporado", "em_analise"] } },
      orderBy: [{ votos_positivos: "desc" }, { created_at: "desc" }],
      take: 50,
    });
    return Response.json(contribuicoes);
  } catch (error) {
    console.error("[api/contribuicoes] GET erro:", error);
    return Response.json({ error: "Erro ao listar contribuições." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contribuicaoSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const contribuicao = await prisma.contribuicao.create({
      data: {
        autor_email: data.autor_email,
        autor_nome: data.autor_nome ?? null,
        tipo: data.tipo,
        titulo: data.titulo,
        conteudo: data.conteudo,
        referencia_cientifica: data.referencia_cientifica || null,
        modulo_relacionado: data.modulo_relacionado ?? null,
        status: "pendente",
      },
    });

    return Response.json(contribuicao, { status: 201 });
  } catch (error) {
    console.error("[api/contribuicoes] POST erro:", error);
    return Response.json({ error: "Erro ao submeter contribuição." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, autor_email } = body as { id?: string; autor_email?: string };

    if (!id || !autor_email) {
      return Response.json({ error: "ID e e-mail são obrigatórios." }, { status: 400 });
    }

    const existente = await prisma.votoContribuicao.findUnique({
      where: { contribuicao_id_autor_email: { contribuicao_id: id, autor_email } },
    });

    if (existente) {
      return Response.json({ error: "Voto já registrado." }, { status: 409 });
    }

    await prisma.$transaction([
      prisma.votoContribuicao.create({ data: { contribuicao_id: id, autor_email } }),
      prisma.contribuicao.update({
        where: { id },
        data: { votos_positivos: { increment: 1 } },
      }),
    ]);

    const atualizada = await prisma.contribuicao.findUnique({ where: { id } });
    return Response.json(atualizada);
  } catch (error) {
    console.error("[api/contribuicoes] PATCH erro:", error);
    return Response.json({ error: "Erro ao registrar voto." }, { status: 500 });
  }
}
