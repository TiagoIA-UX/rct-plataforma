/** Pares Jesus × Patanjali — Protocolo Mestre v1.0, Etapa 3.3 (3 pares) */

export type CitacaoParalela = {
  jesus: { texto: string; referencia: string };
  patanjali: { texto: string; referencia: string };
  decodificacao: string;
};

export const CITACOES_PARALELAS: CitacaoParalela[] = [
  {
    jesus: {
      texto: "O Reino de Deus está dentro de vós.",
      referencia: "Lucas 17:21",
    },
    patanjali: {
      texto: "Quem domina a mente encontra plenitude.",
      referencia: "Textos clássicos do yoga, sutra 3.3",
    },
    decodificacao:
      "Ambas as tradições apontam para dentro: a transformação passa pela atenção e pela prática vivida.",
  },
  {
    jesus: {
      texto: "Conhecereis a verdade, e a verdade vos libertará.",
      referencia: "João 8:32",
    },
    patanjali: {
      texto: "O discernimento libera o ser do engano.",
      referencia: "Textos clássicos do yoga, sutra 2.26",
    },
    decodificacao:
      "A honestidade reduz o desgaste mental de viver em conflito — abre espaço para mais clareza.",
  },
  {
    jesus: {
      texto: "Bem-aventurados os pacificadores.",
      referencia: "Mateus 5:9",
    },
    patanjali: {
      texto: "A não-violência é o primeiro e maior dos princípios.",
      referencia: "Textos clássicos do yoga, sutra 2.30",
    },
    decodificacao:
      "Não-violência como critério de vida em rede — paz praticada, não apenas declarada.",
  },
];
