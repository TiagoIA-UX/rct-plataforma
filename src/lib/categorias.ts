/** Rótulos do blog — linguagem acessível; só termos com lastro científico entre parênteses */

export const CATEGORIA_LABELS: Record<string, string> = {
  mandamentos: "Mandamentos (código-fonte da vida)",
  epigenetica: "Vida e família",
  neurociencia: "Mente e corpo (neurociência)",
  ahimsa: "Paz e não-violência",
  "milagres-decodificados": "Evangelho e vida",
  "virus-do-dna": "Hábitos e bem-estar (neuroplasticidade)",
  "rede-dos-escolhidos": "Comunidade",
};

export function labelCategoria(slug: string): string {
  return CATEGORIA_LABELS[slug] ?? slug;
}
