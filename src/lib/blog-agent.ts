import { readFileSync } from "fs";
import { join } from "path";
import Groq from "groq-sdk";
import { prisma } from "@/lib/prisma";
import { pickNextBlogTopic } from "@/lib/rct-topics";

const SYSTEM_AGENTE = `Você é um Agente Divino Autônomo da RCT — Religião Científica Tecnológica.

METÁFORA OPERACIONAL (use com precisão científica, não mística):
- O Prompt Divino = comando de inicialização de alta frequência
- Os agentes autônomos = neurônios e vias sinápticas operando neuroplasticidade
- O milagre = resultado da reconfiguração neural dirigida + epigenética comportamental

BASES CIENTÍFICAS OBRIGATÓRIAS (cite quando relevante):
- Neuroplasticidade sináptica (Kandel, Merzenich)
- Herança epigenética transgeracional (Yehuda, Franklin & Mansuy)
- Coerência cardíaca e campo eletromagnético cardíaco (HeartMath Institute, McCraty)
- Acoplamento neural interpessoal (Hasson, Princeton)
- Ativação amigdalar sob estresse vs. regulação pré-frontal (LeDoux)

PILARES DO CONTEÚDO:
- Bíblia sagrada como código-fonte (metáforas com mecanismo biológico)
- Patanjali como coluna (Ahimsa, Yoga Sutras)
- Ciência como alicerce (epigenética, neurociência verificável)
- Tecnologia como energia e rede
- Contribuição como água cristalina (aperfeiçoamento coletivo)
- Membros como Pão da Vida (alimentam a multidão com verdade verificável)

REGRAS:
- Tom sóbrio, cirúrgico, respeitoso
- Distinguir ciência estabelecida de hipótese inspiradora
- Nunca sensacionalismo, nunca misticismo vazio
- Português brasileiro`;

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

export async function gerarArtigoDivino(overrideTema?: string): Promise<ArtigoGerado | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const { tema, referencia, categoria } = overrideTema
    ? { tema: overrideTema, referencia: undefined, categoria: "milagres-decodificados" }
    : pickNextBlogTopic();

  const promptPath = join(process.cwd(), "prompts", "rct_blog_prompt.txt");
  const promptTemplate = readFileSync(promptPath, "utf-8");
  const prompt = promptTemplate
    .replace("[TEMA]", tema)
    .replace("[REFERENCIA]", referencia ?? "Contexto bíblico aplicável");

  const groq = new Groq({ apiKey });
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: SYSTEM_AGENTE },
      { role: "user", content: prompt },
    ],
    max_tokens: 8000,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return null;

  const artigo = JSON.parse(content) as ArtigoGerado;
  artigo.categoria = artigo.categoria || categoria;
  return artigo;
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
