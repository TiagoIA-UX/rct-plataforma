/**
 * Categorias do blog — protocolo original + Bíblia neurocientífica (série nova).
 * No filtro público aparecem só categorias com artigos publicados + a série em construção.
 */

/** Ordem de exibição no filtro do blog */
export const ORDEM_CATEGORIAS = [
  "jesus-grande-yogue",
  "misticismo-decodificado",
  "prompts-do-mestre",
  "epigenetica-sagrada",
  "virus-do-dna",
  "ahimsa-aplicada",
  "linhagem-do-conhecimento",
  "biblia-neurocientifica",
] as const;

export const CATEGORIA_LABELS: Record<string, string> = {
  "jesus-grande-yogue": "Jesus: O Mestre",
  "prompts-do-mestre": "Orientações do Mestre",
  "epigenetica-sagrada": "Herança e Transformação",
  "virus-do-dna": "Hábitos que mudam o corpo",
  "misticismo-decodificado": "Símbolos explicados",
  "ahimsa-aplicada": "Amor universal",
  "linhagem-do-conhecimento": "Sabedoria de geração em geração",
  "biblia-neurocientifica": "Bíblia neurocientífica",
};

/** Todas as categorias válidas (admin, pipeline, seeds) */
export const CATEGORIAS_BLOG = Object.keys(CATEGORIA_LABELS);

/** Série nova — em desenvolvimento, sem artigos ainda */
export const CATEGORIA_EM_CONSTRUCAO = "biblia-neurocientifica";

/**
 * Slugs inventados na v0.5.0 → categoria canônica do protocolo.
 * Garante que artigos migrados errado ainda apareçam no filtro certo.
 */
export const CATEGORIA_LEGACY_MAP: Record<string, string> = {
  "jesus-o-mestre": "jesus-grande-yogue",
  "biblia-e-etimologia": "misticismo-decodificado",
  "fe-e-razao": "misticismo-decodificado",
  "vida-interior": "misticismo-decodificado",
  "santos-por-acoes": "misticismo-decodificado",
  "amor-universal": "ahimsa-aplicada",
  mandamentos: "misticismo-decodificado",
  epigenetica: "epigenetica-sagrada",
  neurociencia: "epigenetica-sagrada",
  ahimsa: "ahimsa-aplicada",
  "milagres-decodificados": "jesus-grande-yogue",
};

/** Categoria canônica de cada artigo publicado (slug → categoria) */
export const ARTIGO_CATEGORIA_CANONICA: Record<string, string> = {
  "10-mandamentos-oriente-medio-ciencia-epigenetica": "misticismo-decodificado",
  "jesus-aos-12-anos-no-temple": "jesus-grande-yogue",
  "tentado-em-tudo-sem-pecado-autocontrole": "misticismo-decodificado",
  "fe-e-razao-reconciliando-religiao-e-ciencia": "misticismo-decodificado",
  "paulo-espinho-na-carne-ciencia-e-biblia": "jesus-grande-yogue",
  "sao-santo-titulos-apostolos-joao-17": "misticismo-decodificado",
};

export function labelCategoria(slug: string): string {
  const normalizado = normalizarCategoria(slug);
  return CATEGORIA_LABELS[normalizado] ?? slug;
}

export function normalizarCategoria(slug: string): string {
  return CATEGORIA_LEGACY_MAP[slug] ?? slug;
}

/** Slugs equivalentes para busca no banco (canônico + legados temporários) */
export function slugsEquivalentes(categoria: string): string[] {
  const canon = normalizarCategoria(categoria);
  const legados = Object.entries(CATEGORIA_LEGACY_MAP)
    .filter(([, alvo]) => alvo === canon)
    .map(([origem]) => origem);
  return [...new Set([categoria, canon, ...legados])];
}

export function categoriaArtigo(slugArtigo: string, categoriaAtual: string): string {
  return ARTIGO_CATEGORIA_CANONICA[slugArtigo] ?? normalizarCategoria(categoriaAtual);
}

/** Filtro público: categorias com posts + Bíblia neurocientífica */
export function ordenarCategoriasFiltro(slugs: string[]): string[] {
  const set = new Set(slugs);
  set.add(CATEGORIA_EM_CONSTRUCAO);
  return ORDEM_CATEGORIAS.filter((s) => set.has(s));
}
