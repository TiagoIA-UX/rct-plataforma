/** Pares Jesus × Escritura / testemunho de ação — sem termos não cristãos na interface */

export type CitacaoParalela = {
  jesus: { texto: string; referencia: string };
  paralelo: { titulo: string; texto: string; referencia: string };
  decodificacao: string;
};

export const CITACOES_PARALELAS: CitacaoParalela[] = [
  {
    jesus: {
      texto: "Para que todos sejam um.",
      referencia: "João 17:21",
    },
    paralelo: {
      titulo: "São Paulo",
      texto:
        "Quando os gentios, que não têm a lei, praticam naturalmente o que ela ordena, tornam-se lei para si mesmos.",
      referencia: "Romanos 2:14",
    },
    decodificacao:
      "O que importa não é o título nem as palavras — é a prática. Muitos vivem o bem sem carregar o nome da lei escrita.",
  },
  {
    jesus: {
      texto: "Filho, vai trabalhar hoje na vinha. Respondeu: não quero; mas depois arrependeu-se e foi.",
      referencia: "Mateus 21:28-29",
    },
    paralelo: {
      titulo: "O outro filho",
      texto: "Eu vou, senhor — e não foi.",
      referencia: "Mateus 21:30",
    },
    decodificacao:
      "A parábola dos dois filhos ensina: contar com palavras não basta; quem vai e faz é quem cumpre a vontade do Pai.",
  },
  {
    jesus: {
      texto: "Bem-aventurados os pacificadores, porque serão chamados filhos de Deus.",
      referencia: "Mateus 5:9",
    },
    paralelo: {
      titulo: "São Francisco de Assis",
      texto:
        "Louvado sejas, meu Senhor, por nossa irmã Mãe Terra, que nos sustenta e governa.",
      referencia: "Cântico das Criaturas",
    },
    decodificacao:
      "Amor ao próximo, à natureza e aos animais — em memória de quem dedicou a vida a estas causas, como São Francisco.",
  },
];
