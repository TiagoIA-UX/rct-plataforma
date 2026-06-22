/**
 * ============================================================
 * RCT-BLOG — Módulo Unificado (client-safe)
 * RCT — Ressonância Científica Tecnológica
 * Protocolo Mestre Divino v2.0
 * ============================================================
 *
 * Ponto de entrada para constantes, tipos e funções puras do blog.
 * Seguro para uso em Client Components e Server Components.
 *
 * Para funções server-only (geração IA, DB, cron):
 *   import { ... } from "@/lib/rct-blog.server"
 *
 * Import pattern recomendado (client-safe):
 *   import { CATEGORIA_LABELS, NIVEIS_ARTIGO, ... } from "@/lib/rct-blog"
 * ============================================================
 */

// ─── IDENTIDADE ───────────────────────────────────────────────────────────────

export { RCT_SIGLA, RCT_NOME_COMPLETO, RCT_NOME_EXIBICAO, RCT_DESCRICAO_PADRAO, RCT_TAGLINE } from "@/lib/identidade";
import { MARCA_NOME } from "@/lib/identidade";

// ─── CATEGORIAS ───────────────────────────────────────────────────────────────
// 7 categorias obrigatórias do Protocolo Mestre Divino v2.0, Seção 5.1

export {
  CATEGORIA_LABELS,
  CATEGORIAS_BLOG,
  CATEGORIA_LEGACY_MAP,
  labelCategoria,
  normalizarCategoria,
} from "@/lib/categorias";

// ─── CITAÇÕES PARALELAS (Jesus × Escritura) ───────────────────────────────────

export type { CitacaoParalela } from "@/lib/citacoes-paralelas";
export { CITACOES_PARALELAS } from "@/lib/citacoes-paralelas";

// ─── PROTOCOLO VIVEKA ─────────────────────────────────────────────────────────
// 5 perguntas de autocorreção — Seção 1 do Protocolo

export type { PerguntaViveka, BlocoBencaoMaldicao } from "@/lib/viveka";
export {
  PERGUNTAS_VIVEKA,
  SINAL_ATIVACAO_VIVEKA,
  RESULTADO_VIVEKA,
  EXEMPLO_BENCAO_MALDICTION_EPIGENETICA,
} from "@/lib/viveka";

// ─── SALVAGUARDAS (0.1–0.7) ───────────────────────────────────────────────────

export {
  CLAUSULA_EPIGENETICA,
  TEXTO_TRANSPARENCIA_RESSONANCIA,
  AVISO_LEITURA_COMPLEMENTAR,
  FRASE_AUTONOMIA_PLATAFORMA,
  DECLARACAO_CONTRIBUIDOR,
  CATEGORIAS_REVISAO_HUMANA,
  PRINCIPIO_MESTRE_NEUMA,
  PRINCIPIO_CENTRAL_PUBLICACAO,
  MISSAO_NEUMA,
  FRASE_GUIA_NEUMA,
  conteudoEpigeneticoSuspeito,
  exigeClausulaEpigenetica,
  validarSalvaguardaEpigenetica,
  PRINCIPIO_ESPERANCA_RESPONSAVEL,
  PRINCIPIO_ESPERANCA_RESUMO,
  FRASE_ESPERANCA_NEUMA,
  PERGUNTA_FUNDAMENTAL_NEUMA,
  PERGUNTA_PROFUNDA_NEUMA,
  ESTRUTURA_NEUMA_TRANSFORMACAO,
  PRINCIPIO_EQUILIBRIO_FLORESCIMENTO,
  TEMAS_FLORESCIMENTO,
  validarPrincipioMestre,
  afirmaParanormalComoFato,
  reduzMilagresAutomaticamentePsicossomatico,
  transmiteFatalismo,
  prometeMagiaOuGarantiaFalsa,
} from "@/lib/salvaguardas";

// ─── IMAGENS UNSPLASH POR CATEGORIA ──────────────────────────────────────────
// Banco curado de imagens livres, seleção automática por categoria

export { resolverImagemArtigo, proximaImagemCategoria, extrairPalavraChaveImagem, resolverImagemPorPalavraChave } from "@/lib/imagens-artigo";
export { SLUG_PALAVRA_CHAVE, IMAGENS_POR_PALAVRA_CHAVE } from "@/lib/imagens-palavra-chave";

// ─── BANNERS POR CATEGORIA ────────────────────────────────────────────────────

export type { BannerArtigoData } from "@/lib/banner-artigo";
export { getBannerArtigo } from "@/lib/banner-artigo";

// ─── CONSTANTES OPERACIONAIS ─────────────────────────────────────────────────

/**
 * Níveis de acesso dos artigos — Protocolo Seção 5.2
 */
export const NIVEIS_ARTIGO = {
  abertura: "Abertura — conteúdo público",
  aprofundamento: "Aprofundamento — conteúdo denso, ainda público",
  membros: "Membros — acesso restrito à comunidade",
} as const;

export type NivelArtigo = keyof typeof NIVEIS_ARTIGO;

/**
 * Status de publicação dos artigos
 */
export const STATUS_ARTIGO = {
  publicado: "Publicado",
  rascunho: "Rascunho",
  revisao: "Aguardando revisão humana",
} as const;

/**
 * Metadados do subsistema de blog
 */
export const RCT_BLOG_META = {
  nome: `Blog ${MARCA_NOME}`,
  descricao:
    "Artigos que unem ciência do comportamento e reflexão no dia a dia — sempre com referência publicada e honestidade sobre prós e contras.",
  protocolo: "Mestre Divino v2.0",
  categorias_total: 7,
  categorias_revisao_humana: ["prompts-do-mestre", "epigenetica-sagrada"],
  geracao_ia: "Groq / LLaMA 3.3",
  revalidate_segundos: 3600,
} as const;
