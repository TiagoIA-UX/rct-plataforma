/**
 * Categorias do blog — Instituto NEUMA (PROMPT MESTRE).
 * No filtro público aparecem só categorias com artigos publicados + a série em construção.
 */

/** Ordem de exibição no filtro do blog */
export const ORDEM_CATEGORIAS = [
  "jesus-transformacao",
  "milagres-decodificados",
  "prompts-do-mestre",
  "epigenetica-sagrada",
  "virus-do-dna",
  "psicossomatica-sagrada",
  "ahimsa-aplicada",
  "linhagem-do-conhecimento",
  "mateus-transformacao",
  "evangelhos-transformacao",
] as const;

export const CATEGORIA_LABELS: Record<string, string> = {
  "jesus-transformacao": "Jesus: Educador de Consciência",
  "prompts-do-mestre": "Prompts do Grande Mestre",
  "epigenetica-sagrada": "Epigenética Sagrada",
  "virus-do-dna": "Vírus do DNA",
  "milagres-decodificados": "Milagres Decodificados",
  "psicossomatica-sagrada": "Psicossomática Sagrada",
  "ahimsa-aplicada": "Ahimsa na Prática",
  "linhagem-do-conhecimento": "Linhagem do Conhecimento",
  "mateus-transformacao": "Mateus: Um Mapa da Transformação Humana",
  "evangelhos-transformacao": "Evangelhos da Transformação Humana",
  /** @deprecated use mateus-transformacao */
  "biblia-neuroteologica": "Mateus: Um Mapa da Transformação Humana",
};

/** Todas as categorias válidas (admin, pipeline, seeds) */
export const CATEGORIAS_BLOG = Object.keys(CATEGORIA_LABELS);

/** Série em desenvolvimento — módulo Mateus */
export const CATEGORIA_EM_CONSTRUCAO = "mateus-transformacao";

/** Slugs legados → categoria canônica */
export const CATEGORIA_LEGACY_MAP: Record<string, string> = {
  "jesus-grande-yogue": "jesus-transformacao",
  "jesus-o-mestre": "jesus-transformacao",
  "biblia-e-etimologia": "milagres-decodificados",
  "fe-e-razao": "milagres-decodificados",
  "vida-interior": "milagres-decodificados",
  "santos-por-acoes": "milagres-decodificados",
  "amor-universal": "ahimsa-aplicada",
  mandamentos: "milagres-decodificados",
  epigenetica: "epigenetica-sagrada",
  neurociencia: "epigenetica-sagrada",
  ahimsa: "ahimsa-aplicada",
  "misticismo-decodificado": "milagres-decodificados",
  "biblia-neurocientifica": "mateus-transformacao",
  "biblia-neuroteologica": "mateus-transformacao",
};

export const ARTIGO_CATEGORIA_CANONICA: Record<string, string> = {
  "10-mandamentos-oriente-medio-ciencia-epigenetica": "milagres-decodificados",
  "jesus-aos-12-anos-no-temple": "jesus-transformacao",
  "tentado-em-tudo-sem-pecado-autocontrole": "milagres-decodificados",
  "fe-e-razao-reconciliando-religiao-e-ciencia": "milagres-decodificados",
  "paulo-espinho-na-carne-ciencia-e-biblia": "jesus-transformacao",
  "sao-santo-titulos-apostolos-joao-17": "milagres-decodificados",
};

export function labelCategoria(slug: string): string {
  const normalizado = normalizarCategoria(slug);
  return CATEGORIA_LABELS[normalizado] ?? slug;
}

export function normalizarCategoria(slug: string): string {
  return CATEGORIA_LEGACY_MAP[slug] ?? slug;
}

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

export function ordenarCategoriasFiltro(slugs: string[]): string[] {
  const set = new Set(slugs);
  set.add(CATEGORIA_EM_CONSTRUCAO);
  return ORDEM_CATEGORIAS.filter((s) => set.has(s));
}
