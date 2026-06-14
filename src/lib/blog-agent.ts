import { revalidatePath, revalidateTag } from "next/cache";
import { executarPipelineArtigo } from "@/lib/blog-pipeline";
import { CACHE_TAGS } from "@/lib/cache";
import { notificarInscritosNovoArtigo } from "@/lib/newsletter-mail";
import { prisma } from "@/lib/prisma";
import { pickNextBlogTopic } from "@/lib/rct-topics";

export interface ArtigoGerado {
  titulo: string;
  subtitulo?: string;
  slug: string;
  categoria: string;
  nivel?: string;
  tags: string[];
  meta_descricao?: string;
  tempo_leitura?: string;
  conteudo_html: string;
  base_cientifica?: string[];
  bencao?: string;
  maldicao?: string;
  salvaguarda?: string;
  pergunta_viveka?: string;
  social_instagram?: string;
  social_facebook?: string;
  social_linkedin?: string;
  social_twitter?: string;
  image_url?: string;
  image_credit?: string;
}

const MIN_CONTEUDO_CHARS = 2500;

/**
 * Garante que o artigo é completo e real — sem placeholders nem fallback operacional.
 * Retorna a lista de campos ausentes; vazia = pronto para publicação.
 */
export function camposIncompletosArtigo(artigo: ArtigoGerado): string[] {
  const faltando: string[] = [];
  if (!artigo.titulo?.trim()) faltando.push("titulo");
  if (!artigo.slug?.trim()) faltando.push("slug");
  if (!artigo.categoria?.trim()) faltando.push("categoria");
  if ((artigo.conteudo_html?.trim().length ?? 0) < MIN_CONTEUDO_CHARS)
    faltando.push(`conteudo_html (mínimo ${MIN_CONTEUDO_CHARS} caracteres)`);
  if (!artigo.bencao?.trim()) faltando.push("bencao");
  if (!artigo.maldicao?.trim()) faltando.push("maldicao");
  if (!artigo.salvaguarda?.trim()) faltando.push("salvaguarda");
  if (!artigo.pergunta_viveka?.trim()) faltando.push("pergunta_viveka");
  if (!(artigo.base_cientifica?.length)) faltando.push("base_cientifica");

  const placeholders = /revisad[oa] pela equipe humana|a ser explicitado|lorem ipsum|placeholder|TODO|xxxx/i;
  const blob = `${artigo.bencao}\n${artigo.maldicao}\n${artigo.salvaguarda}\n${artigo.pergunta_viveka}`;
  if (placeholders.test(blob)) faltando.push("conteúdo placeholder detectado");

  return faltando;
}

/**
 * Geração exclusiva pelo pipeline multi-agente (padrão Paulo).
 * SEM fallback legado e SEM placeholders: se o pipeline falhar ou o artigo
 * vier incompleto, retorna null e nada é gravado/publicado.
 */
export async function gerarArtigoDivino(
  overrideTema?: string
): Promise<ArtigoGerado | null> {
  if (!process.env.GROQ_API_KEY) {
    console.error("[blog-agent] GROQ_API_KEY ausente — geração abortada (sem fallback).");
    return null;
  }

  const topic = overrideTema ? undefined : await pickNextBlogTopic();
  const resultado = await executarPipelineArtigo({ temaOverride: overrideTema, topic });

  if (!resultado) {
    console.error("[blog-agent] Pipeline multi-agente falhou — nada será gerado (sem fallback).");
    return null;
  }

  const faltando = camposIncompletosArtigo(resultado.artigo);
  if (faltando.length) {
    console.error("[blog-agent] Artigo incompleto, descartado:", faltando.join(", "));
    return null;
  }

  console.log(
    `[blog-agent] Pipeline OK — tentativas: ${resultado.log.tentativas_redacao}, ` +
      `ética: ${resultado.log.veredito.pontuacao_etica_planetaria}/100`
  );
  return resultado.artigo;
}

function revalidarBlog(slug: string) {
  revalidateTag(CACHE_TAGS.artigos, "max");
  revalidateTag(CACHE_TAGS.artigo(slug), "max");
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

/**
 * Cria o artigo SEMPRE como rascunho (não publicado, pendente de aprovação).
 * A publicação só ocorre via aprovação humana no bot do Telegram.
 */
export async function criarRascunhoArtigo(artigo: ArtigoGerado) {
  const existente = await prisma.artigo.findUnique({ where: { slug: artigo.slug } });
  if (existente) return existente;

  return prisma.artigo.create({
    data: {
      titulo: artigo.titulo,
      subtitulo: artigo.subtitulo ?? null,
      slug: artigo.slug,
      categoria: artigo.categoria,
      nivel: artigo.nivel ?? "abertura",
      tags: artigo.tags ?? [],
      meta_descricao: artigo.meta_descricao ?? null,
      tempo_leitura: artigo.tempo_leitura ?? null,
      conteudo_html: artigo.conteudo_html,
      image_url: artigo.image_url ?? null,
      image_credit: artigo.image_credit ?? null,
      social_instagram: artigo.social_instagram ?? null,
      social_facebook: artigo.social_facebook ?? null,
      social_linkedin: artigo.social_linkedin ?? null,
      social_twitter: artigo.social_twitter ?? null,
      publicado: false,
      pendente_revisao: true,
    },
  });
}

/** Publica um rascunho aprovado pelo fundador (botão do Telegram). */
export async function publicarArtigoPorId(id: string) {
  const artigo = await prisma.artigo.findUnique({ where: { id } });
  if (!artigo) return null;
  if (artigo.publicado) return artigo;

  const atualizado = await prisma.artigo.update({
    where: { id },
    data: { publicado: true, pendente_revisao: false, updated_at: new Date() },
  });

  revalidarBlog(atualizado.slug);

  notificarInscritosNovoArtigo(atualizado).catch((err) =>
    console.error("[blog-agent] Newsletter novo artigo:", err)
  );

  return atualizado;
}

/** Rejeita (descarta) um rascunho não aprovado. */
export async function rejeitarArtigoPorId(id: string) {
  const artigo = await prisma.artigo.findUnique({ where: { id } });
  if (!artigo) return null;
  if (artigo.publicado) return artigo;
  await prisma.artigo.delete({ where: { id } });
  return artigo;
}
