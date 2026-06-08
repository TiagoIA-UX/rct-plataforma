import { CITACOES_PARALELAS } from "@/lib/citacoes-paralelas";

/** Rotação na home — pares Jesus × Patanjali */
export const citacoes = CITACOES_PARALELAS.map((par) => ({
  texto: par.jesus.texto,
  referencia: par.jesus.referencia,
  textoParalelo: par.patanjali.texto,
  referenciaParalela: par.patanjali.referencia,
  decodificacao: par.decodificacao,
}));
