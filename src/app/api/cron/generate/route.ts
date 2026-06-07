import { isCronAuthorized } from "@/lib/config/env";
import { gerarArtigoDivino, publicarArtigoGerado } from "@/lib/blog-agent";

export async function GET(req: Request) {
  if (!isCronAuthorized(req.headers.get("authorization"))) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  if (!process.env.GROQ_API_KEY) {
    return Response.json({ error: "GROQ_API_KEY não configurada." }, { status: 503 });
  }

  try {
    const artigo = await gerarArtigoDivino();
    if (!artigo) {
      return Response.json({ error: "Resposta vazia da IA." }, { status: 500 });
    }

    const criado = await publicarArtigoGerado(artigo);
    return Response.json({ success: true, artigo: criado });
  } catch (error) {
    console.error("[api/cron/generate] Erro:", error);
    return Response.json({ error: "Erro ao gerar artigo." }, { status: 500 });
  }
}
