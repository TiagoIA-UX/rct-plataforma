/**
 * Pipeline editorial — Módulo Mateus (Sistema de Decodificação Humana)
 *
 * Agente 00: Brief de decodificação
 * Agente 02: Versículos
 * Agente 03: Redator (estrutura canônica 6 seções)
 * Orquestrador: avaliação crítica
 */

import { readFileSync } from "fs";
import { join } from "path";
import Groq from "groq-sdk";
import {
  montarConteudoArtigoCompleto,
  validarArtigoAntesPublicar,
} from "@/lib/artigo-template";
import { validarExtensaoArtigo } from "@/lib/decodificacao-humana";
import { proximaImagemCategoria } from "@/lib/imagens-artigo";
import type { JobEditorialMateus } from "@/lib/mateus-modulo";
import type { ArtigoGerado } from "@/lib/blog-agent";
import type { BlocoBencaoMaldicao } from "@/lib/viveka";
import type { OrquestradorVeredito, VersiculosOutput } from "@/lib/blog-pipeline";
import {
  agente02Versiculos,
  orquestradorAvaliar,
  type ScoutOutput,
} from "@/lib/blog-pipeline";

const PROMPTS_DIR = join(process.cwd(), "src/lib/prompts");
const AGENTS_DIR = join(PROMPTS_DIR, "agents");

const MIN_PONTUACAO = 70;
const MAX_TENTATIVAS = 2;

export type BriefMateusOutput = {
  passagem_mateus: string;
  referencia_principal: string;
  sofrimento_humano: string[];
  padrao_mental_exposto: string[];
  mecanismos_neurocomportamentais: string[];
  aplicacao_pratica: string[];
  dimensoes_humanas: string[];
  lentes_prioritarias: string[];
  foco_editorial: string;
  equilibrio: string;
  versiculos_chave: Array<{ referencia: string; texto_resumido: string; papel?: string }>;
  nota_orquestrador: string;
  tema: string;
  slug: string;
  categoria: string;
  tags: string[];
};

export type PipelineMateusLog = {
  job: JobEditorialMateus;
  brief: BriefMateusOutput;
  versiculos: VersiculosOutput;
  veredito: OrquestradorVeredito;
  tentativas_redacao: number;
};

function readAgent(name: string): string {
  return readFileSync(join(AGENTS_DIR, name), "utf-8");
}

function estruturaCanonica(tipo: string): string {
  return readAgent("estrutura-artigo-canonico.txt").replace("[TIPO_ARTIGO]", tipo);
}

async function chamarAgente<T>(params: {
  agente: string;
  systemExtra: string;
  userPrompt: string;
}): Promise<T | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const system = readFileSync(join(PROMPTS_DIR, "system-agente.txt"), "utf-8");
  const sistema = readFileSync(join(PROMPTS_DIR, "sistema-decodificacao-humana.txt"), "utf-8");
  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `${system}\n\n---\n${sistema}\n\n---\n${params.systemExtra}`,
      },
      { role: "user", content: params.userPrompt },
    ],
    max_tokens: 8000,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) return null;
  try {
    return JSON.parse(content) as T;
  } catch {
    console.error(`[mateus-pipeline:${params.agente}] JSON inválido`);
    return null;
  }
}

export function briefParaScout(brief: BriefMateusOutput, job: JobEditorialMateus): ScoutOutput {
  return {
    tema: brief.tema || job.tema,
    controversia_atual: brief.sofrimento_humano.join("; "),
    por_que_foge_da_logica: brief.nota_orquestrador,
    tradicoes_envolvidas: brief.lentes_prioritarias,
    pontos_de_tensao: brief.padrao_mental_exposto,
    termos_busca_sugeridos: brief.mecanismos_neurocomportamentais,
    fontes_discussao: [],
    categoria_sugerida: job.categoria,
    slug_sugerido: job.slug,
    referencia_biblica_inicial: brief.referencia_principal,
    nota_scout: `[Brief Mateus cap.${job.capitulo.numero}] ${brief.nota_orquestrador}`,
  };
}

export async function agente00BriefMateus(
  job: JobEditorialMateus
): Promise<BriefMateusOutput | null> {
  const prompt = readAgent("agente-00-brief-mateus.txt").replace(
    "[JOB_MATEUS_JSON]",
    JSON.stringify(job, null, 2)
  );

  const brief = await chamarAgente<BriefMateusOutput>({
    agente: "00-brief",
    systemExtra: "Agente 00 — Brief de Decodificação Mateus. Retorne apenas JSON.",
    userPrompt: prompt,
  });

  if (!brief) return null;
  brief.slug = job.slug;
  brief.categoria = job.categoria;
  brief.tags = job.tags;
  return brief;
}

async function agente03RedatorMateus(
  brief: BriefMateusOutput,
  versiculos: VersiculosOutput,
  job: JobEditorialMateus,
  revisoes: string[] = []
): Promise<ArtigoGerado | null> {
  const prompt = readAgent("agente-03-redator-mateus.txt")
    .replace("[BRIEF_MATEUS_JSON]", JSON.stringify(brief, null, 2))
    .replace("[VERSICULOS_JSON]", JSON.stringify(versiculos, null, 2))
    .replace(
      "[REVISOES_ORQUESTRADOR]",
      revisoes.length ? revisoes.map((r, i) => `${i + 1}. ${r}`).join("\n") : "Nenhuma."
    );

  const artigo = await chamarAgente<ArtigoGerado>({
    agente: "03-redator-mateus",
    systemExtra: `Redator Módulo Mateus.\n${estruturaCanonica(job.tipo)}\nRetorne apenas JSON.`,
    userPrompt: prompt,
  });

  if (!artigo?.conteudo_html) return null;
  artigo.slug = job.slug;
  artigo.categoria = job.categoria;
  artigo.tags = job.tags;
  return artigo;
}

function prepararArtigoMateus(artigo: ArtigoGerado, job: JobEditorialMateus): ArtigoGerado | null {
  const ext = validarExtensaoArtigo(artigo.conteudo_html, job.tipo);
  if (!ext.ok) {
    console.error("[mateus-pipeline]", ext.motivo);
    return null;
  }

  const bloco: BlocoBencaoMaldicao = {
    bencao: artigo.bencao ?? "Benefício verificável a revisar.",
    maldicao: artigo.maldicao ?? "Risco se mal aplicado.",
    base_cientifica: artigo.base_cientifica ?? [],
    salvaguarda: artigo.salvaguarda ?? "Praticar com apoio profissional se necessário.",
    pergunta_viveka: artigo.pergunta_viveka ?? "O que aconteceu comigo — e o que posso fazer hoje?",
  };

  const conteudoCompleto = montarConteudoArtigoCompleto(
    artigo.conteudo_html,
    bloco,
    artigo.categoria
  );

  const validacao = validarArtigoAntesPublicar(artigo.titulo, conteudoCompleto, artigo.categoria);
  if (!validacao.ok) {
    console.error("[mateus-pipeline] Salvaguarda:", validacao.motivo);
    return null;
  }

  const img = proximaImagemCategoria(artigo.categoria, 0, artigo.titulo, artigo.slug);
  return {
    ...artigo,
    conteudo_html: conteudoCompleto,
    image_url: img.url,
    image_credit: img.credit,
  };
}

export async function executarPipelineMateus(
  job: JobEditorialMateus
): Promise<{ artigo: ArtigoGerado; log: PipelineMateusLog } | null> {
  console.log(`[mateus-pipeline] Cap.${job.capitulo.numero} — ${job.tipo}`);
  console.log(`[mateus-pipeline] Agente 00 — Brief de decodificação...`);

  const brief = await agente00BriefMateus(job);
  if (!brief) {
    console.error("[mateus-pipeline] Agente 00 falhou.");
    return null;
  }
  console.log(`[mateus-pipeline] Passagem: ${brief.referencia_principal}`);

  const scout = briefParaScout(brief, job);
  console.log("[mateus-pipeline] Agente 02 — Versículos...");
  const versiculos = await agente02Versiculos(scout);
  if (!versiculos) {
    console.error("[mateus-pipeline] Agente 02 falhou.");
    return null;
  }

  let artigo: ArtigoGerado | null = null;
  let veredito: OrquestradorVeredito | null = null;
  let revisoes: string[] = [];

  for (let t = 1; t <= MAX_TENTATIVAS; t++) {
    console.log(`[mateus-pipeline] Agente 03 — Redator (tentativa ${t})...`);
    artigo = await agente03RedatorMateus(brief, versiculos, job, revisoes);
    if (!artigo) return null;

    console.log("[mateus-pipeline] Orquestrador...");
    veredito = await orquestradorAvaliar(scout, versiculos, artigo);
    if (!veredito) return null;

    const pontos = [
      veredito.pontuacao_ahimsa,
      veredito.pontuacao_satya,
      veredito.pontuacao_etica_planetaria,
      veredito.pontuacao_estrutura_paulo,
    ];
    const reprovado =
      (veredito.violacoes?.length ?? 0) > 0 ||
      pontos.some((p) => typeof p === "number" && p < MIN_PONTUACAO);

    if (veredito.aprovado && !reprovado) break;

    revisoes = veredito.revisoes_obrigatorias ?? [];
    if (t === MAX_TENTATIVAS) {
      console.error("[mateus-pipeline] Reprovado:", veredito.violacoes);
      return null;
    }
  }

  if (!artigo || !veredito) return null;

  const preparado = prepararArtigoMateus(artigo, job);
  if (!preparado) return null;

  return {
    artigo: preparado,
    log: {
      job,
      brief,
      versiculos,
      veredito,
      tentativas_redacao: revisoes.length > 0 ? 2 : 1,
    },
  };
}
