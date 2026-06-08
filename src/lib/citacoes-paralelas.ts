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
      texto: "O Yogue que conquistou a mente encontrou o Absoluto.",
      referencia: "Yoga Sutras 3.3",
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
      texto: "O conhecimento discriminativo libera o ser da ilusão.",
      referencia: "Yoga Sutras 2.26",
    },
    decodificacao:
      "A honestidade reduz o esforço cognitivo do conflito interno — estado de maior clareza neural.",
  },
  {
    jesus: {
      texto: "Bem-aventurados os pacificadores.",
      referencia: "Mateus 5:9",
    },
    patanjali: {
      texto: "Ahimsa — a não-violência — é o primeiro e maior dos princípios.",
      referencia: "Yoga Sutras 2.30",
    },
    decodificacao:
      "Ahimsa como critério de vida em rede — paz praticada, não apenas declarada.",
  },
];
