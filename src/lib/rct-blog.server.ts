/**
 * ============================================================
 * RCT-BLOG SERVER — Módulo Server-Only
 * RCT — Ressonância Científica Tecnológica
 * Protocolo Mestre Divino v2.0
 * ============================================================
 *
 * Funções e tipos que dependem de acesso ao servidor:
 * - Geração de artigos via IA (Groq / LLaMA)
 * - Camada de dados (Prisma / Neon)
 * - Fila de temas e template HTML
 *
 * ⚠️  NÃO importar em Client Components ("use client").
 *
 * Import pattern:
 *   import { gerarArtigoDivino, listarArtigosPublicados } from "@/lib/rct-blog.server"
 * ============================================================
 */

// ─── RE-EXPORTA TUDO DO MÓDULO CLIENT-SAFE ───────────────────────────────────
// Conveniência: um único import cobre tudo

export * from "@/lib/rct-blog";

// ─── TEMPLATE BÊNÇÃO/MALDIÇÃO (HTML) ─────────────────────────────────────────
// Seção 2 do Protocolo — todo artigo exibe benefício e risco em equilíbrio

export {
  montarHtmlBencaoMaldicao,
  montarConteudoArtigoCompleto,
  validarArtigoAntesPublicar,
} from "@/lib/artigo-template";

// ─── FILA DE TEMAS PARA GERAÇÃO ──────────────────────────────────────────────

export type { BlogTopic } from "@/lib/rct-topics";
export {
  SERIE_JESUS_GRANDE_YOGUE,
  SERIE_MANDAMENTOS_AUTO,
  SERIE_MILAGRES_AUTO,
  pickNextBlogTopic,
} from "@/lib/rct-topics";

// ─── GERAÇÃO IA (pipeline multi-agente + fallback legado) ───────────────────

export type {
  ScoutOutput,
  VersiculosOutput,
  OrquestradorVeredito,
  PipelineLog,
} from "@/lib/blog-pipeline";
export {
  agente01ScoutPolemicas,
  agente02Versiculos,
  agente03RedatorPaulo,
  orquestradorAvaliar,
  executarPipelineArtigo,
} from "@/lib/blog-pipeline";

export type { ArtigoGerado } from "@/lib/blog-agent";
export {
  gerarArtigoDivino,
  criarRascunhoArtigo,
  publicarArtigoPorId,
  rejeitarArtigoPorId,
  camposIncompletosArtigo,
} from "@/lib/blog-agent";

// ─── CAMADA DE DADOS (Prisma) ─────────────────────────────────────────────────

export type { ArtigoListItem } from "@/lib/db/artigos";
export {
  listarArtigosPublicados,
  listarArtigosRecentes,
  buscarArtigoPorSlug,
  listarSlugsPublicados,
  listarTodosArtigosAdmin,
  atualizarArtigoAdmin,
} from "@/lib/db/artigos";
