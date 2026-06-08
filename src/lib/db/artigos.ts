import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache";

export async function listarArtigosPublicados(categoria?: string) {
  return unstable_cache(
    async () =>
      prisma.artigo.findMany({
        where: {
          publicado: true,
          ...(categoria ? { categoria } : {}),
        },
        orderBy: { created_at: "desc" },
      }),
    ["listar-artigos", categoria ?? "all"],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}

export async function listarArtigosRecentes(take = 6) {
  return unstable_cache(
    async () =>
      prisma.artigo.findMany({
        where: { publicado: true },
        orderBy: { created_at: "desc" },
        take,
      }),
    ["artigos-recentes", String(take)],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}

export async function buscarArtigoPorSlug(slug: string) {
  return unstable_cache(
    async () => prisma.artigo.findUnique({ where: { slug } }),
    ["artigo", slug],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos, CACHE_TAGS.artigo(slug)] }
  )();
}

export async function listarSlugsPublicados() {
  return unstable_cache(
    async () => {
      const rows = await prisma.artigo.findMany({
        where: { publicado: true },
        select: { slug: true },
      });
      return rows.map((r) => r.slug);
    },
    ["artigos-slugs"],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}
