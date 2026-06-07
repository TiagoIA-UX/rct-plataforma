import type { FaseTreinamento } from "@/types/diagnostico";
import { loadPrivateMjs } from "@/lib/load-private";

export interface ResultadoProva {
  score_coerencia: number;
  score_mentira: number;
  indicadores: string[];
  aprovado_automatico: boolean;
  notas: string;
}

const FALLBACK: ResultadoProva = {
  score_coerencia: 50,
  score_mentira: 50,
  indicadores: ["análise manual necessária"],
  aprovado_automatico: false,
  notas: "Motor confidencial ausente — aguardar revisão do administrador.",
};

type ProvaPrivate = {
  analisarProvaTreinamento: (
    fase: FaseTreinamento,
    resposta: string,
    email: string
  ) => Promise<ResultadoProva>;
};

export async function analisarProvaTreinamento(
  fase: FaseTreinamento,
  resposta: string,
  email: string
): Promise<ResultadoProva> {
  const mod = loadPrivateMjs<ProvaPrivate>("prova-analise");
  if (!mod?.analisarProvaTreinamento) return FALLBACK;
  return mod.analisarProvaTreinamento(fase, resposta, email);
}
