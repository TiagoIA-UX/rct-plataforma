/**
 * Pipeline multi-agente RCT — geração de artigos (padrão Paulo)
 *
 * Agente 01: Scout de polêmicas inter-religiosas
 * Agente 02: Versículos específicos
 * Agente 03: Redator (estrutura Paulo)
 * Orquestrador: Patanjali + ética planetária + Salvaguardas RCT
 */

import { readFileSync } from "fs";
import { join } from "path";
import Groq from "groq-sdk";
import {
  montarConteudoArtigoCompleto,
  validarArtigoAntesPublicar,
} from "@/lib/artigo-template";
import { proximaImagemCategoria } from "@/lib/imagens-artigo";
import type { BlogTopic } from "@/lib/rct-topics";
import type { BlocoBencaoMaldicao } from "@/lib/viveka";
import type { ArtigoGerado } from "@/lib/blog-agent";

const PROMPTS_DIR = join(process.cwd(), "src/lib/prompts");
const AGENTS_DIR = join(PROMPTS_DIR, "agents");

const MIN_PONTUACAO = 70;
const MAX_TENTATIVAS_REDACAO = 2;

// ─── Tipos dos agentes ───────────────────────────────────────────────────────

export type ScoutOutput = {
  tema: string;
  controversia_atual: string;
  por_que_foge_da_logica: string;
  tradicoes_envolvidas: string[];
  pontos_de_tensao: string[];
  termos_busca_sugeridos: string[];
  fontes_discussao: string[];
  categoria_sugerida: string;
  slug_sugerido: string;
  referencia_biblica_inicial: string;
  nota_scout: string;
};

export type VersiculoItem = {
  referencia: string;
  texto_resumido: string;
  papel: "sustenta" | "contexto" | "tensao" | "pratica" | string;
  nota_exegese: string;
  confianca: string;
};

export type VersiculosOutput = {
  referencia_principal: string;
  numeros_e_fatos: string[];
  versiculos: VersiculoItem[];
  paradoxo_biblico: string;
  perguntas_abertas: string[];
  nota_agente_02: string;
};

export type ChecklistPaulo = {
  versiculos_especificos: boolean;
  numeros_fatos: boolean;
  autor_ano_citados: boolean;
  estabelecida_vs_hipotese: boolean;
  secao_nao_sustenta: boolean;
  pratica_links_profissional: boolean;
  sem_superioridade_origem: boolean;
};

export type OrquestradorVeredito = {
  aprovado: boolean;
  pontuacao_ahimsa: number;
  pontuacao_satya: number;
  pontuacao_etica_planetaria: number;
  pontuacao_estrutura_paulo: number;
  violacoes: string[];
  alertas: string[];
  revisoes_obrigatorias: string[];
  revisao_humana_obrigatoria: boolean;
  parecer: string;
  checklist_paulo: ChecklistPaulo;
};

export type PipelineLog = {
  scout: ScoutOutput;
  versiculos: VersiculosOutput;
  veredito: OrquestradorVeredito;
  tentativas_redacao: number;
};

export type PipelineOptions = {
  temaOverride?: string;
  topic?: BlogTopic;
};

// ─── Leitura de prompts ──────────────────────────────────────────────────────

function readPrompt(relativePath: string): string {
  return readFileSync(join(PROMPTS_DIR, relativePath), "utf-8");
}

function readAgentPrompt(name: string): string {
  return readFileSync(join(AGENTS_DIR, name), "utf-8");
}

function estruturaPaulo(): string {
  return readAgentPrompt("estrutura-artigo-paulo.txt");
}

// ─── Groq ────────────────────────────────────────────────────────────────────

async function chamarAgente<T>(params: {
  agente: string;
  systemExtra: string;
  userPrompt: string;
}): Promise<T | null> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return null;

  const systemAgente = readPrompt("system-agente.txt");
  const groq = new Groq({ apiKey });

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "system",
        content: `${systemAgente}\n\n---\n${params.systemExtra}`,
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
    console.error(`[pipeline:${params.agente}] JSON inválido`);
    return null;
  }
}

// ─── Agentes ─────────────────────────────────────────────────────────────────

export async function agente01ScoutPolemicas(
  options?: PipelineOptions
): Promise<ScoutOutput | null> {
  const promptBase = readAgentPrompt("agente-01-scout-polemicas.txt");

  let userPrompt = promptBase;
  if (options?.temaOverride) {
    userPrompt += `\n\n## TEMA_OVERRIDE\n${options.temaOverride}`;
  } else if (options?.topic) {
    userPrompt += `\n\n## TEMA DA FILA\n${JSON.stringify(options.topic, null, 2)}`;
  }

  const result = await chamarAgente<ScoutOutput>({
    agente: "01-scout",
    systemExtra: "Você é o Agente 01 — Scout de Polêmicas. Retorne apenas JSON válido.",
    userPrompt,
  });

  if (!result?.tema) return null;

  if (options?.topic && !options.temaOverride) {
    result.categoria_sugerida = options.topic.categoria;
    result.slug_sugerido = options.topic.slug;
    if (options.topic.referencia) {
      result.referencia_biblica_inicial = options.topic.referencia;
    }
  }

  return result;
}

export async function agente02Versiculos(
  scout: ScoutOutput
): Promise<VersiculosOutput | null> {
  const promptBase = readAgentPrompt("agente-02-versiculos.txt");
  const userPrompt = promptBase.replace("[SCOUT_JSON]", JSON.stringify(scout, null, 2));

  return chamarAgente<VersiculosOutput>({
    agente: "02-versiculos",
    systemExtra:
      "Você é o Agente 02 — Exegese bíblica. Retorne apenas JSON válido. Não invente versículos.",
    userPrompt,
  });
}

export async function agente03RedatorPaulo(
  scout: ScoutOutput,
  versiculos: VersiculosOutput,
  revisoes: string[] = []
): Promise<ArtigoGerado | null> {
  const promptBase = readAgentPrompt("agente-03-redator-paulo.txt");
  const userPrompt = promptBase
    .replace("[SCOUT_JSON]", JSON.stringify(scout, null, 2))
    .replace("[VERSICULOS_JSON]", JSON.stringify(versiculos, null, 2))
    .replace(
      "[REVISOES_ORQUESTRADOR]",
      revisoes.length > 0 ? revisoes.map((r, i) => `${i + 1}. ${r}`).join("\n") : "Nenhuma."
    );

  const artigo = await chamarAgente<ArtigoGerado>({
    agente: "03-redator",
    systemExtra: `Você é o Agente 03 — Redator RCT.\n\n${estruturaPaulo()}\n\nRetorne apenas JSON válido.`,
    userPrompt,
  });

  if (!artigo?.conteudo_html) return null;

  artigo.categoria = artigo.categoria || scout.categoria_sugerida;
  artigo.slug = artigo.slug || scout.slug_sugerido;
  artigo.tags = artigo.tags ?? [];

  return artigo;
}

export async function orquestradorAvaliar(
  scout: ScoutOutput,
  versiculos: VersiculosOutput,
  artigo: ArtigoGerado
): Promise<OrquestradorVeredito | null> {
  const promptBase = readAgentPrompt("agente-orquestrador.txt");
  const userPrompt = promptBase
    .replace("[SCOUT_JSON]", JSON.stringify(scout, null, 2))
    .replace("[VERSICULOS_JSON]", JSON.stringify(versiculos, null, 2))
    .replace("[ARTIGO_JSON]", JSON.stringify(artigo, null, 2));

  const veredito = await chamarAgente<OrquestradorVeredito>({
    agente: "orquestrador",
    systemExtra: `Você é o Orquestrador RCT.\n\n${estruturaPaulo()}\n\nRetorne apenas JSON válido.`,
    userPrompt,
  });

  if (!veredito) return null;

  const pontos = [
    veredito.pontuacao_ahimsa,
    veredito.pontuacao_satya,
    veredito.pontuacao_etica_planetaria,
    veredito.pontuacao_estrutura_paulo,
  ];
  const abaixoMinimo = pontos.some((p) => typeof p === "number" && p < MIN_PONTUACAO);
  const temViolacao = (veredito.violacoes?.length ?? 0) > 0;

  if (abaixoMinimo || temViolacao) {
    veredito.aprovado = false;
  }

  return veredito;
}

// ─── Preparação final ────────────────────────────────────────────────────────

function prepararArtigoPipeline(
  artigo: ArtigoGerado,
  revisaoHumana: boolean
): ArtigoGerado | null {
  const bloco: BlocoBencaoMaldicao = {
    bencao: artigo.bencao ?? "Benefício a ser revisado pela equipe humana.",
    maldicao: artigo.maldicao ?? "Risco a ser explicitado na revisão humana.",
    base_cientifica: artigo.base_cientifica ?? [],
    salvaguarda: artigo.salvaguarda ?? "Praticar com não-violência e fontes verificáveis.",
    pergunta_viveka:
      artigo.pergunta_viveka ??
      "Onde no seu corpo você carrega algo que precisou atravessar? Busque ajuda profissional se a dor persistir.",
  };

  const conteudoCompleto = montarConteudoArtigoCompleto(
    artigo.conteudo_html,
    bloco,
    artigo.categoria
  );

  const validacao = validarArtigoAntesPublicar(artigo.titulo, conteudoCompleto, artigo.categoria);
  if (!validacao.ok) {
    console.error("[pipeline] Bloqueado pela Salvaguarda 0.1:", validacao.motivo);
    return null;
  }

  const img = proximaImagemCategoria(artigo.categoria, 0, artigo.titulo, artigo.slug);
  artigo.image_url = img.url;
  artigo.image_credit = img.credit;

  void revisaoHumana;
  return { ...artigo, conteudo_html: conteudoCompleto };
}

// ─── Pipeline completo ───────────────────────────────────────────────────────

export async function executarPipelineArtigo(
  options?: PipelineOptions
): Promise<{ artigo: ArtigoGerado; log: PipelineLog } | null> {
  console.log("[pipeline] Agente 01 — Scout de polêmicas...");
  const scout = await agente01ScoutPolemicas(options);
  if (!scout) {
    console.error("[pipeline] Agente 01 falhou.");
    return null;
  }
  console.log(`[pipeline] Tema: ${scout.tema}`);

  console.log("[pipeline] Agente 02 — Versículos...");
  const versiculos = await agente02Versiculos(scout);
  if (!versiculos) {
    console.error("[pipeline] Agente 02 falhou.");
    return null;
  }
  console.log(`[pipeline] Âncora: ${versiculos.referencia_principal}`);

  let artigo: ArtigoGerado | null = null;
  let veredito: OrquestradorVeredito | null = null;
  let revisoes: string[] = [];

  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS_REDACAO; tentativa++) {
    console.log(`[pipeline] Agente 03 — Redator (tentativa ${tentativa})...`);
    artigo = await agente03RedatorPaulo(scout, versiculos, revisoes);
    if (!artigo) {
      console.error("[pipeline] Agente 03 falhou.");
      return null;
    }

    console.log("[pipeline] Orquestrador — avaliação crítica...");
    veredito = await orquestradorAvaliar(scout, versiculos, artigo);
    if (!veredito) {
      console.error("[pipeline] Orquestrador falhou.");
      return null;
    }

    console.log(`[pipeline] Parecer: ${veredito.parecer}`);
    if (veredito.aprovado) break;

    revisoes = veredito.revisoes_obrigatorias ?? [];
    if (tentativa === MAX_TENTATIVAS_REDACAO) {
      console.error("[pipeline] Reprovado após revisões:", veredito.violacoes);
      return null;
    }
    console.log("[pipeline] Revisões solicitadas — nova tentativa...");
  }

  if (!artigo || !veredito) return null;

  const preparado = prepararArtigoPipeline(artigo, veredito.revisao_humana_obrigatoria);
  if (!preparado) return null;

  return {
    artigo: preparado,
    log: {
      scout,
      versiculos,
      veredito,
      tentativas_redacao: revisoes.length > 0 ? 2 : 1,
    },
  };
}
