import { filtrarArtigosAlinhadosNeuma } from "@/lib/artigo-legado";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { CACHE_TAGS, CACHE_TTL } from "@/lib/cache";
import {
  buscarArtigoEstaticoPorSlug,
  categoriasArtigosEstaticos,
  dbConfigurado,
  listarArtigosEstaticos,
  slugsArtigosEstaticos,
} from "@/lib/artigos-fallback";

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

async function buscarPublicadosDb(categoria?: string) {
  const whereCategoria = categoria
    ? { categoria: { in: (await import("@/lib/categorias")).slugsEquivalentes(categoria) } }
    : {};

  return prisma.artigo.findMany({
    where: {
      publicado: true,
      ...whereCategoria,
    },
    orderBy: { created_at: "desc" },
  });
}

export async function listarArtigosPublicados(categoria?: string) {
  if (!dbConfigurado()) {
    return filtrarArtigosAlinhadosNeuma(listarArtigosEstaticos(categoria));
  }

  return unstable_cache(
    async () => {
      try {
        const rows = await buscarPublicadosDb(categoria);
        return filtrarArtigosAlinhadosNeuma(rows);
      } catch (err) {
        console.error("[artigos] DB falhou, usando fallback estático:", err);
        return filtrarArtigosAlinhadosNeuma(listarArtigosEstaticos(categoria));
      }
    },
    ["listar-artigos", categoria ?? "all"],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}

export async function listarCategoriasComArtigos(): Promise<string[]> {
  if (!dbConfigurado()) {
    return categoriasArtigosEstaticos();
  }

  return unstable_cache(
    async () => {
      try {
        const { normalizarCategoria, ordenarCategoriasFiltro } = await import("@/lib/categorias");
        const rows = await prisma.artigo.findMany({
          where: { publicado: true },
          select: { categoria: true },
        });
        const slugs = rows.map((r) => normalizarCategoria(r.categoria));
        return ordenarCategoriasFiltro(slugs);
      } catch (err) {
        console.error("[artigos] DB falhou (categorias), usando fallback:", err);
        return categoriasArtigosEstaticos();
      }
    },
    ["categorias-com-artigos"],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}

export async function listarArtigosRecentes(take = 6) {
  const todos = await listarArtigosPublicados();
  const alinhados = filtrarArtigosAlinhadosNeuma(todos);
  const fonte = alinhados.length > 0 ? alinhados : todos;
  return fonte.slice(0, take);
}

/** Artigos visíveis na home — exclui protocolo legado (yogue/samadhi). */
export async function listarArtigosHome(take = 6) {
  const todos = await listarArtigosPublicados();
  const alinhados = filtrarArtigosAlinhadosNeuma(todos);
  return alinhados.slice(0, take);
}

export async function buscarArtigoPorSlug(slug: string) {
  if (!dbConfigurado()) {
    return buscarArtigoEstaticoPorSlug(slug);
  }

  return unstable_cache(
    async () => {
      try {
        return await prisma.artigo.findUnique({ where: { slug } });
      } catch (err) {
        console.error("[artigos] DB falhou (slug), usando fallback:", err);
        return buscarArtigoEstaticoPorSlug(slug);
      }
    },
    ["artigo", slug],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos, CACHE_TAGS.artigo(slug)] }
  )();
}

export async function listarSlugsPublicados() {
  if (!dbConfigurado()) {
    return slugsArtigosEstaticos();
  }

  return unstable_cache(
    async () => {
      try {
        const rows = await prisma.artigo.findMany({
          where: { publicado: true },
          select: { slug: true },
        });
        return rows.map((r) => r.slug);
      } catch (err) {
        console.error("[artigos] DB falhou (slugs), usando fallback:", err);
        return slugsArtigosEstaticos();
      }
    },
    ["artigos-slugs"],
    { revalidate: CACHE_TTL.blog, tags: [CACHE_TAGS.artigos] }
  )();
}

export async function listarTodosArtigosAdmin(): Promise<ArtigoListItem[]> {
  if (!dbConfigurado()) {
    return listarArtigosEstaticos().map((a) => ({
      id: a.id,
      titulo: a.titulo,
      slug: a.slug,
      categoria: a.categoria,
      nivel: a.nivel,
      publicado: a.publicado,
      pendente_revisao: a.pendente_revisao,
      created_at: a.created_at,
      tempo_leitura: a.tempo_leitura,
      image_url: a.image_url,
    }));
  }

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
  if (!dbConfigurado()) {
    throw new Error("DATABASE_URL não configurado — admin indisponível sem banco.");
  }

  return prisma.artigo.update({
    where: { slug },
    data: { ...dados, updated_at: new Date() },
  });
}
