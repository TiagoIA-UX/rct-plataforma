/**
 * Tabela de pesos Ahimsa-centrada — Protocolo Mestre v2.0, Seção 6.1
 * Fonte: private/prompts/PROMPT_MESTRE_DIVINO_v2.md
 * O detector não julga. Reconhece.
 */

export const TERMOS_EPIGENETICOS_ALTO_PESO = ["epigenetica", "epigenética", "linhagem", "dna", "heranca"];
export const PESOS_TERMO: Record<string, number> = {
  ahimsa: 10,
  nao_violencia: 10,
  "não-violência": 10,
  "nao violencia": 10,
  vegetarianismo_etico: 9,
  vegetarianismo: 7,
  "o mestre": 9,
  "jesus mestre": 9,
  "oração contemplativa": 8,
  "corpo templo": 8,
  coerencia_cardiaca: 8,
  "coerência cardíaca": 8,
  neuroplasticidade: 7,
  evangelhos: 6,
  "fe e ciencia": 5,
  "oração": 4,
  espiritualidade: 3,
  saude: 2,
  saúde: 2,
};

export const CONVITE_SCORE_MINIMO = 60;

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s_-]/g, " ");
}

/** Score 0–100 a partir dos textos livres do questionário */
export function calcularScoreTermos(...textos: string[]): number {
  const blob = normalizar(textos.filter(Boolean).join(" "));
  let total = 0;
  let max = 0;

  for (const [termo, peso] of Object.entries(PESOS_TERMO)) {
    max += peso;
    const chave = normalizar(termo);
    if (blob.includes(chave.replace(/_/g, " ")) || blob.includes(chave)) {
      total += peso;
    }
  }

  if (max === 0) return 0;
  return Math.min(100, Math.round((total / max) * 100));
}

export function incluiTermosEpigeneticos(...textos: string[]): boolean {
  const blob = normalizar(textos.filter(Boolean).join(" "));
  return TERMOS_EPIGENETICOS_ALTO_PESO.some((t) => blob.includes(normalizar(t)));
}
