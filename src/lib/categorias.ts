/** 7 categorias obrigatórias — Protocolo Mestre Divino v1.0, Etapa 4.1 */

export const CATEGORIA_LABELS: Record<string, string> = {
  "jesus-grande-yogue": "Jesus: O Mestre",
  "prompts-do-mestre": "Orientações do Mestre",
  "epigenetica-sagrada": "Herança e Transformação",
  "virus-do-dna": "Hábitos que mudam o corpo",
  "misticismo-decodificado": "Símbolos explicados",
  "ahimsa-aplicada": "Não-violência no dia a dia",
  "linhagem-do-conhecimento": "Sabedoria de geração em geração",
};

export const CATEGORIAS_BLOG = Object.keys(CATEGORIA_LABELS);

/** Migra slugs legados para as 7 categorias do protocolo */
export const CATEGORIA_LEGACY_MAP: Record<string, string> = {
  mandamentos: "misticismo-decodificado",
  epigenetica: "epigenetica-sagrada",
  neurociencia: "epigenetica-sagrada",
  ahimsa: "ahimsa-aplicada",
  "milagres-decodificados": "jesus-grande-yogue",
  "virus-do-dna": "virus-do-dna",
  "rede-dos-escolhidos": "linhagem-do-conhecimento",
};

export function labelCategoria(slug: string): string {
  const normalizado = CATEGORIA_LEGACY_MAP[slug] ?? slug;
  return CATEGORIA_LABELS[normalizado] ?? slug;
}

export function normalizarCategoria(slug: string): string {
  return CATEGORIA_LEGACY_MAP[slug] ?? slug;
}
