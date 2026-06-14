import { CITACOES_PARALELAS } from "@/lib/citacoes-paralelas";

/** Rotação na home — pares Jesus × Escritura / testemunho de ação */
export const citacoes = CITACOES_PARALELAS.map((par) => ({
  texto: par.jesus.texto,
  referencia: par.jesus.referencia,
  tituloParalelo: par.paralelo.titulo,
  textoParalelo: par.paralelo.texto,
  referenciaParalela: par.paralelo.referencia,
  decodificacao: par.decodificacao,
}));
