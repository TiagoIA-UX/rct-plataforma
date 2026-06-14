/**
 * Categorias do blog — alinhadas ao conteúdo publicado (2026).
 * Slugs legados são normalizados via CATEGORIA_LEGACY_MAP.
 */

export const CATEGORIA_LABELS: Record<string, string> = {
  "jesus-o-mestre": "Jesus: O Mestre",
  "biblia-e-etimologia": "Bíblia e etimologia",
  "fe-e-razao": "Fé e razão",
  "vida-interior": "Vida interior e ciência",
  "santos-por-acoes": "Santos por ações — não por títulos",
  "amor-universal": "Amor universal",
  "biblia-neurocientifica": "Bíblia neurocientífica",
};

export const CATEGORIAS_BLOG = Object.keys(CATEGORIA_LABELS);

/** Categoria em desenvolvimento — exibe página de convite à colaboração */
export const CATEGORIA_EM_CONSTRUCAO = "biblia-neurocientifica";

/** Migra slugs legados → categorias atuais */
export const CATEGORIA_LEGACY_MAP: Record<string, string> = {
  // Protocolo antigo (7 categorias)
  "jesus-grande-yogue": "jesus-o-mestre",
  "prompts-do-mestre": "fe-e-razao",
  "epigenetica-sagrada": "vida-interior",
  "virus-do-dna": "vida-interior",
  "misticismo-decodificado": "biblia-e-etimologia",
  "ahimsa-aplicada": "amor-universal",
  "linhagem-do-conhecimento": "fe-e-razao",
  "milagres-decodificados": "jesus-o-mestre",
  // Slugs soltos
  mandamentos: "biblia-e-etimologia",
  epigenetica: "vida-interior",
  neurociencia: "vida-interior",
  ahimsa: "amor-universal",
};

/** Migração por slug de artigo (quando a categoria legada não basta) */
export const ARTIGO_CATEGORIA_MAP: Record<string, string> = {
  "jesus-aos-12-anos-no-temple": "jesus-o-mestre",
  "paulo-espinho-na-carne-ciencia-e-biblia": "vida-interior",
  "fe-e-razao-reconciliando-religiao-e-ciencia": "fe-e-razao",
  "10-mandamentos-oriente-medio-ciencia-epigenetica": "biblia-e-etimologia",
  "tentado-em-tudo-sem-pecado-autocontrole": "vida-interior",
  "sao-santo-titulos-apostolos-joao-17": "santos-por-acoes",
};

export function labelCategoria(slug: string): string {
  const normalizado = normalizarCategoria(slug);
  return CATEGORIA_LABELS[normalizado] ?? slug;
}

export function normalizarCategoria(slug: string): string {
  return CATEGORIA_LEGACY_MAP[slug] ?? slug;
}

export function categoriaArtigo(slugArtigo: string, categoriaAtual: string): string {
  return ARTIGO_CATEGORIA_MAP[slugArtigo] ?? normalizarCategoria(categoriaAtual);
}
