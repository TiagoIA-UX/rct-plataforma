import { prisma } from "@/lib/prisma";
import { notificarInscritosNovoArtigo } from "@/lib/newsletter-mail";

function autorizado(req: Request): boolean {
  const admin = process.env.ADMIN_PASSWORD?.trim();
  const cron = process.env.CRON_SECRET?.trim();
  const auth = req.headers.get("authorization") ?? "";
  if (admin && auth === `Bearer ${admin}`) return true;
  if (cron && auth === `Bearer ${cron}`) return true;
  return false;
}

/**
 * POST /api/newsletter/notify
 * Body: { slug: string } — notifica inscritos sobre um artigo publicado.
 * Auth: Bearer ADMIN_PASSWORD ou CRON_SECRET
 */
export async function POST(req: Request) {
  if (!autorizado(req)) {
    return Response.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { slug } = (await req.json()) as { slug?: string };
    if (!slug?.trim()) {
      return Response.json({ error: "slug obrigatório" }, { status: 400 });
    }

    const artigo = await prisma.artigo.findUnique({ where: { slug: slug.trim() } });
    if (!artigo) {
      return Response.json({ error: "Artigo não encontrado" }, { status: 404 });
    }
    if (!artigo.publicado) {
      return Response.json({ error: "Artigo não está publicado" }, { status: 400 });
    }

    const resultado = await notificarInscritosNovoArtigo(artigo);
    return Response.json({ ok: true, artigo: artigo.slug, ...resultado });
  } catch (err) {
    console.error("[newsletter/notify]", err);
    return Response.json({ error: "Erro interno" }, { status: 500 });
  }
}
