import { readFileSync } from "fs";
import { join } from "path";
import Groq from "groq-sdk";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  montarConteudoArtigoCompleto,
  validarArtigoAntesPublicar,
} from "@/lib/artigo-template";
import { CACHE_TAGS } from "@/lib/cache";
import { CATEGORIAS_REVISAO_HUMANA } from "@/lib/salvaguardas";
import { prisma } from "@/lib/prisma";
import { pickNextBlogTopic } from "@/lib/rct-topics";
import { loadPrivateMjs } from "@/lib/load-private";
import type { BlocoBencaoMaldicao } from "@/lib/viveka";

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
}

const PROMPTS_DIR = join(process.cwd(), "src/lib/prompts");

type BlogAgentPrivate = {
  gerarArtigoDivino: (overrideTema?: string) => Promise<ArtigoGerado | null>;
};

function readPrompt(name: string): string {
  return readFileSync(join(PROMPTS_DIR, name), "utf-8");
}

function prepararArtigo(artigo: ArtigoGerado): ArtigoGerado | null {
  const bloco: BlocoBencaoMaldicao = {
    bencao: artigo.bencao ?? "Benefício a ser revisado pela equipe humana.",
    maldicao: artigo.maldicao ?? "Risco a ser explicitado na revisão humana.",
    base_cientifica: artigo.base_cientifica ?? [],
    salvaguarda: artigo.salvaguarda ?? "Praticar com Ahimsa e fontes verificáveis.",
    pergunta_viveka:
      artigo.pergunta_viveka ??
      "Você estaria disposto a ensinar esta ideia para alguém de qualquer origem, com a mesma convicção?",
  };

  const conteudoCompleto = montarConteudoArtigoCompleto(
    artigo.conteudo_html,
    bloco,
    artigo.categoria
  );

  const validacao = validarArtigoAntesPublicar(artigo.titulo, conteudoCompleto, artigo.categoria);
  if (!validacao.ok) {
    console.error("[blog-agent] Bloqueado pela Salvaguarda 0.1:", validacao.motivo);
    return null;
  }

  return { ...artigo, conteudo_html: conteudoCompleto };
}

async function gerarViaGroq(topic: {
  tema: string;
  referencia?: string;
  categoria: string;
  slug: string;
}): Promise<ArtigoGerado | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const systemAgente = readPrompt("system-agente.txt");
  const promptTemplate = readPrompt("rct-blog.txt");
  const prompt = promptTemplate
    .replace("[TEMA]", topic.tema)
    .replace("[REFERENCIA]", topic.referencia ?? "Contexto bíblico aplicável")
    .replace("[CATEGORIA]", topic.categoria);

  const groq = new Groq({ apiKey });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemAgente },
      { role: "user", content: prompt },
    ],
    max_tokens: 8000,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return null;

  const artigo = JSON.parse(content) as ArtigoGerado;
  artigo.categoria = artigo.categoria || topic.categoria;
  artigo.slug = artigo.slug || topic.slug;
  artigo.tags = artigo.tags ?? [];

  return prepararArtigo(artigo);
}

export async function gerarArtigoDivino(
  overrideTema?: string
): Promise<ArtigoGerado | null> {
  if (overrideTema) {
    return gerarViaGroq({
      tema: overrideTema,
      categoria: "misticismo-decodificado",
      slug: overrideTema
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 80),
    });
  }

  const topic = await pickNextBlogTopic();
  const viaDeploy = await gerarViaGroq(topic);
  if (viaDeploy) return viaDeploy;

  const mod = loadPrivateMjs<BlogAgentPrivate>("blog-agent");
  if (mod?.gerarArtigoDivino) return mod.gerarArtigoDivino();
  return null;
}

export async function publicarArtigoGerado(artigo: ArtigoGerado) {
  const existente = await prisma.artigo.findUnique({ where: { slug: artigo.slug } });
  if (existente) return existente;

  const requerRevisao = CATEGORIAS_REVISAO_HUMANA.has(artigo.categoria);

  const criado = await prisma.artigo.create({
    data: {
      titulo: artigo.titulo,
      subtitulo: artigo.subtitulo ?? null,
      slug: artigo.slug,
      categoria: artigo.categoria,
      tags: artigo.tags ?? [],
      meta_descricao: artigo.meta_descricao ?? null,
      tempo_leitura: artigo.tempo_leitura ?? null,
      conteudo_html: artigo.conteudo_html,
      publicado: !requerRevisao,
    },
  });

  if (!requerRevisao) {
    revalidateTag(CACHE_TAGS.artigos, "max");
    revalidateTag(CACHE_TAGS.artigo(artigo.slug), "max");
    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath(`/blog/${artigo.slug}`);
  }

  return criado;
}
