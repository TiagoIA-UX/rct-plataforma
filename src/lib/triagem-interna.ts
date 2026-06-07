import type { AnaliseIA, DiagnosticoData } from "@/types/diagnostico";
import { loadPrivateMjs } from "@/lib/load-private";

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

type TriagemPromptsPrivate = {
  montarPromptTriagemInterna: (data: DiagnosticoData) => string;
};

export function extrairTriagemInterna(
  analiseIA: AnaliseIA & { triagem_interna?: TriagemInterna }
): TriagemInterna {
  return analiseIA.triagem_interna ?? FALLBACK;
}

export function montarPromptTriagemInterna(data: DiagnosticoData): string {
  const mod = loadPrivateMjs<TriagemPromptsPrivate>("triagem-prompts");
  if (!mod?.montarPromptTriagemInterna) {
    return `Analise os textos do candidato e retorne JSON com score_missao, territorio_confirmado, frase_reconhecimento e triagem_interna.\nAplicação: ${data.aplicacao_diaria}\nQuestão: ${data.maior_questao}`;
  }
  return mod.montarPromptTriagemInterna(data);
}
