import { prisma } from "@/lib/prisma";
import { loadPrivateMjs } from "@/lib/load-private";

export interface ArtigoGerado {
  titulo: string;
  subtitulo?: string;
  slug: string;
  categoria: string;
  tags: string[];
  meta_descricao?: string;
  tempo_leitura?: string;
  conteudo_html: string;
}

type BlogAgentPrivate = {
  gerarArtigoDivino: (overrideTema?: string) => Promise<ArtigoGerado | null>;
};

export async function gerarArtigoDivino(overrideTema?: string): Promise<ArtigoGerado | null> {
  const mod = loadPrivateMjs<BlogAgentPrivate>("blog-agent");
  if (!mod?.gerarArtigoDivino) return null;
  return mod.gerarArtigoDivino(overrideTema);
}

export async function publicarArtigoGerado(artigo: ArtigoGerado) {
  const existente = await prisma.artigo.findUnique({ where: { slug: artigo.slug } });
  if (existente) return existente;

  return prisma.artigo.create({
    data: {
      titulo: artigo.titulo,
      subtitulo: artigo.subtitulo ?? null,
      slug: artigo.slug,
      categoria: artigo.categoria,
      tags: artigo.tags ?? [],
      meta_descricao: artigo.meta_descricao ?? null,
      tempo_leitura: artigo.tempo_leitura ?? null,
      conteudo_html: artigo.conteudo_html,
    },
  });
}
