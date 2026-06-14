import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache";

export type ArtigoListItem = {
  id: string;
  titulo: string;
  slug: string;
  categoria: string;
  nivel: string;
  publicado: boolean;
  pendente_revisao: boolean;
  created_at: Date;
  tempo_leitura: string | null;
  image_url: string | null;
};

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

export async function listarTodosArtigosAdmin(): Promise<ArtigoListItem[]> {
  return prisma.artigo.findMany({
    select: {
      id: true,
      titulo: true,
      slug: true,
      categoria: true,
      nivel: true,
      publicado: true,
      pendente_revisao: true,
      created_at: true,
      tempo_leitura: true,
      image_url: true,
    },
    orderBy: { created_at: "desc" },
  });
}

export async function atualizarArtigoAdmin(
  slug: string,
  dados: Partial<{
    titulo: string;
    subtitulo: string;
    conteudo_html: string;
    publicado: boolean;
    pendente_revisao: boolean;
    meta_descricao: string;
    image_url: string;
    image_credit: string;
    social_instagram: string;
    social_facebook: string;
    social_linkedin: string;
    social_twitter: string;
    tags: string[];
    nivel: string;
  }>
) {
  return prisma.artigo.update({
    where: { slug },
    data: { ...dados, updated_at: new Date() },
  });
}
