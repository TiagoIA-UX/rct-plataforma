/**
 * Sistema de Decodificação Humana — Instituto NEUMA
 * A Bíblia como biblioteca de casos de transformação humana.
 * Máquina editorial autônoma — qualidade conceitual > home institucional.
 */

export const SERIE_EVANGELHOS = "Evangelhos da Transformação Humana";

export const MODULO_MATEUS_TITULO = "Mateus: Um Mapa da Transformação Humana";

export const MODULO_MATEUS_SLUG = "mateus-transformacao";

/** Categoria canônica do módulo Mateus */
export const CATEGORIA_MATEUS = MODULO_MATEUS_SLUG;

/** Série pai — futuros evangelhos */
export const CATEGORIA_EVANGELHOS = "evangelhos-transformacao";

export const FRASE_GUIA_OBRIGATORIA =
  "O cérebro muda. A consciência se expande. A vida pode ser transformada.";

export const FRASE_ESPERANCA_ENCERRAMENTO =
  "Você não está condenado a permanecer como está.";

/** Lentes de análise — toda passagem */
export const LENTES_DECODIFICACAO = [
  "neuroteológica",
  "neurocomportamental",
  "neuropsicológica",
  "neuroterapêutica",
  "neuroergonômica",
  "simbólica",
  "histórica",
  "existencial",
] as const;

/** Perguntas que o orquestrador deve responder antes de redigir */
export const PERGUNTAS_ORQUESTRADOR = [
  "Qual passagem de Mateus será analisada?",
  "Qual sofrimento humano aparece nela?",
  "Qual padrão mental está sendo exposto?",
  "Qual mecanismo neurocomportamental pode dialogar com esse padrão?",
  "Qual aplicação prática o leitor pode usar hoje?",
] as const;

/** Princípio fundamental — 5 perguntas de toda passagem */
export const PRINCIPIO_FUNDAMENTAL_PASSAGEM = [
  "O que aconteceu com estas pessoas?",
  "O que esse relato revela sobre sofrimento humano?",
  "Que mecanismos mentais, emocionais ou comportamentais podem estar envolvidos?",
  "Como diferentes tradições interpretaram esse fenômeno?",
  "O que o leitor pode aplicar hoje?",
] as const;

/** Estrutura canônica — 6 seções HTML (h2) */
export const SECOES_ARTIGO_CANONICO = [
  { id: "narrativa", titulo: "O que aconteceu?", ordem: 1 },
  { id: "humano", titulo: "O que isso revela sobre o ser humano?", ordem: 2 },
  { id: "neuro", titulo: "Leitura neurocomportamental", ordem: 3 },
  { id: "lentes", titulo: "Múltiplas lentes", ordem: 4 },
  { id: "pratica", titulo: "O que posso fazer hoje?", ordem: 5 },
  { id: "esperanca", titulo: "Esperança responsável", ordem: 6 },
] as const;

export const DIMENSOES_HUMANAS = [
  "dor",
  "conflito",
  "medo",
  "culpa",
  "pertencimento",
  "esperança",
] as const;

export const MECANISMOS_NEUROCOMPORTAMENTAIS = [
  "atenção",
  "percepção",
  "crenças",
  "trauma",
  "condicionamento",
  "neuroplasticidade",
  "regulação emocional",
  "significado",
] as const;

export type TipoArtigoModulo = "principal" | "sofrimento" | "florescimento";

/** Tipos editoriais NEUMA — artigos não são posts genéricos. */
export const TIPOS_EDITORIAIS_NEUMA = {
  sofrimento: {
    id: "sofrimento",
    label: "Sofrimento Humano",
    perguntaCentral: "O que aconteceu comigo?",
    exemplos: ["espinho na carne", "ansiedade", "culpa", "trauma", "exclusão"],
  },
  transformacao: {
    id: "transformacao",
    label: "Transformação",
    perguntaCentral: "Como a mudança acontece?",
    exemplos: ["parábolas", "conversões", "mudanças de vida", "perdão"],
  },
  florescimento: {
    id: "florescimento",
    label: "Florescimento Humano",
    perguntaCentral: "O que um ser humano pode se tornar?",
    exemplos: ["coragem", "propósito", "criatividade", "plenitude", "significado"],
  },
} as const;

export type TipoEditorialNeuma = keyof typeof TIPOS_EDITORIAIS_NEUMA;

/** Score mínimo de profundidade humana — abaixo disso, reprovar mesmo com estrutura ok. */
export const SCORE_MIN_PROFUNDIDADE_HUMANA = 8;

/** Pipeline em pausa até validação de profundidade nos 3 artigos reescritos. */
export const PAUSA_MIGRACAO_ACERVO = true;

export const TIPOS_ARTIGO_MODULO: TipoArtigoModulo[] = [
  "principal",
  "sofrimento",
  "florescimento",
];

/** Meta editorial por tipo */
export const META_PALAVRAS: Record<TipoArtigoModulo, { min: number; max: number }> = {
  principal: { min: 2500, max: 5000 },
  sofrimento: { min: 1200, max: 2500 },
  florescimento: { min: 1200, max: 2500 },
};

/** Equilíbrio diário: 50% compreensão do sofrimento / 50% desenvolvimento humano */
export const EQUILIBRIO_EDITORIAL = {
  sofrimento: 0.5,
  florescimento: 0.5,
} as const;

export const TAG_TIPO = {
  principal: "tipo:principal",
  sofrimento: "tipo:sofrimento",
  florescimento: "tipo:florescimento",
} as const;

export const TAG_MODULO_MATEUS = "modulo:mateus";

export function tagCapituloMateus(numero: number): string {
  return `mateus-capitulo-${String(numero).padStart(2, "0")}`;
}

export function slugArtigoMateus(
  capitulo: number,
  slugCapitulo: string,
  tipo: TipoArtigoModulo
): string {
  const sufixo = tipo === "principal" ? "principal" : tipo;
  return `mateus-${String(capitulo).padStart(2, "0")}-${slugCapitulo}-${sufixo}`;
}

/** Estimativa de palavras a partir do HTML */
export function contarPalavrasHtml(html: string): number {
  const texto = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!texto) return 0;
  return texto.split(" ").filter(Boolean).length;
}

export function validarExtensaoArtigo(
  html: string,
  tipo: TipoArtigoModulo
): { ok: boolean; palavras: number; motivo?: string } {
  const palavras = contarPalavrasHtml(html);
  const { min, max } = META_PALAVRAS[tipo];
  if (palavras < min) {
    return {
      ok: false,
      palavras,
      motivo: `Artigo ${tipo} abaixo do mínimo (${palavras}/${min} palavras).`,
    };
  }
  if (palavras > max * 1.15) {
    return {
      ok: false,
      palavras,
      motivo: `Artigo ${tipo} acima do máximo tolerável (${palavras}/${max} palavras).`,
    };
  }
  return { ok: true, palavras };
}
