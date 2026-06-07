import type { AnaliseIA, DiagnosticoData } from "@/types/diagnostico";

export interface TriagemInterna {
  ahimsa_principiologico: boolean;
  consumo_carne_inferido: string | null;
  coerencia_textual: number;
  indicadores_vida: string[];
  apto_treinamento: boolean;
  fase_sugerida: "divya_manas" | "fase_i" | "aguardar";
  notas_admin: string;
}

const FALLBACK: TriagemInterna = {
  ahimsa_principiologico: false,
  consumo_carne_inferido: null,
  coerencia_textual: 50,
  indicadores_vida: [],
  apto_treinamento: false,
  fase_sugerida: "divya_manas",
  notas_admin: "Triagem pendente de análise completa.",
};

export function extrairTriagemInterna(
  analiseIA: AnaliseIA & { triagem_interna?: TriagemInterna }
): TriagemInterna {
  return analiseIA.triagem_interna ?? FALLBACK;
}

export function montarPromptTriagemInterna(data: DiagnosticoData): string {
  return `Analise INTERNAMENTE (nunca expor ao candidato) os textos abaixo.
Retorne APENAS JSON:
{
  "score_missao": 0-20,
  "indicadores_positivos": ["..."],
  "territorio_confirmado": "saude|educacao|ciencia_tecnologia|arte_comunicacao|lideranca|familia_comunidade",
  "frase_reconhecimento": "frase pública sem julgamento",
  "triagem_interna": {
    "ahimsa_principiologico": boolean,
    "consumo_carne_inferido": "nao_por_principio|reduzi|sim|null",
    "coerencia_textual": 0-100,
    "indicadores_vida": ["indicadores de postura pró-vida nas escolhas diárias"],
    "apto_treinamento": boolean,
    "fase_sugerida": "divya_manas|fase_i|aguardar",
    "notas_admin": "observações para o administrador"
  }
}

Critérios INTERNOS apto_treinamento (não públicos):
- Ahimsa como identidade (não violência, postura pró-vida)
- Coerência entre palavras e práticas descritas
- Ausência de contradições graves (detecção de incoerência/mentira)

Aplicação diária: "${data.aplicacao_diaria}"
Maior questão: "${data.maior_questao}"
Postura violência: ${data.postura_violencia}
Ahimsa prática: ${data.ahimsa_pratica}`;
}
