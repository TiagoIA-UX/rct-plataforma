import { listarDiagnosticos } from "@/lib/db/diagnostico";
import { prisma } from "@/lib/prisma";

function isAuthorized(req: Request): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${password}`;
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const tab = searchParams.get("tab") ?? "diagnosticos";

  try {
    if (tab === "contribuicoes") {
      const contribuicoes = await prisma.contribuicao.findMany({
        orderBy: { created_at: "desc" },
      });
      return Response.json({ contribuicoes });
    }

    if (tab === "triagem") {
      const diagnosticos = await listarDiagnosticos({ apto_treinamento: true });
      return Response.json({ diagnosticos });
    }

    if (tab === "provas") {
      const provas = await prisma.provaTreinamento.findMany({
        orderBy: { created_at: "desc" },
        include: { membro: true },
      });
      return Response.json({ provas });
    }

    if (tab === "metricas") {
      const [total, escolhidos, porTerritorio] = await Promise.all([
        prisma.diagnostico.count(),
        prisma.diagnostico.count({ where: { nivel: "escolhido" } }),
        prisma.diagnostico.groupBy({
          by: ["territorio_primario"],
          _avg: { score: true },
          _count: true,
        }),
      ]);

      return Response.json({
        metricas: {
          total_diagnosticos: total,
          total_escolhidos: escolhidos,
          taxa_escolhidos: total > 0 ? (escolhidos / total) * 100 : 0,
          por_territorio: porTerritorio,
        },
      });
    }

    const diagnosticos = await listarDiagnosticos({
      nivel: searchParams.get("nivel") ?? undefined,
      territorio: searchParams.get("territorio") ?? undefined,
    });

    return Response.json({ diagnosticos });
  } catch (error) {
    console.error("[api/admin] Erro:", error);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  if (!isAuthorized(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status, tipo, fase_proxima } = body as {
      id?: string;
      status?: string;
      tipo?: "contribuicao" | "prova";
      fase_proxima?: string;
    };

    if (!id || !status) {
      return Response.json({ error: "ID e status obrigatórios." }, { status: 400 });
    }

    if (tipo === "contribuicao") {
      const atualizada = await prisma.contribuicao.update({
        where: { id },
        data: { status },
      });
      return Response.json(atualizada);
    }

    if (tipo === "prova") {
      const prova = await prisma.provaTreinamento.update({
        where: { id },
        data: {
          status,
          aprovado_por_admin: status === "aprovado",
        },
      });
      if (status === "aprovado" && fase_proxima) {
        await prisma.membro.update({
          where: { email: prova.membro_email },
          data: { fase_atual: fase_proxima },
        });
      }
      return Response.json(prova);
    }

    return Response.json({ error: "Tipo não suportado." }, { status: 400 });
  } catch (error) {
    console.error("[api/admin] PATCH erro:", error);
    return Response.json({ error: "Erro interno." }, { status: 500 });
  }
}
