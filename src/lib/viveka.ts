/** Protocolo de autoavaliação v2.0 — Seção 1: 5 perguntas de autocorreção */

export type PerguntaViveka = {
  id: number;
  pergunta: string;
  detecta: string;
  ensinamento: string;
};

export const PERGUNTAS_VIVEKA: PerguntaViveka[] = [
  {
    id: 1,
    pergunta: "Esta ideia exige que outros estejam errados para que eu esteja certo?",
    detecta: "Ego disfarçado de verdade — medo dominando a reflexão",
    ensinamento:
      "Quando precisamos que o outro erre para existirmos, o corpo está em modo de ameaça — não de descoberta. A parte racional do cérebro enxerga possibilidades; o medo automático enxerga só perigo.",
  },
  {
    id: 2,
    pergunta: "Esta ideia me isola ou conecta?",
    detecta: "Risco de grupo fechado demais",
    ensinamento:
      "O prazer de pertencer a um grupo exclusivo pode virar vício — prazer imediato, custo de longo prazo. Grupos que se fecham reforçam o ego do grupo, não a consciência de cada pessoa.",
  },
  {
    id: 3,
    pergunta: "Estou disposto a publicar também o risco desta ideia?",
    detecta: "Teste de honestidade total — não-violência nas ideias",
    ensinamento:
      "Esconder o risco de uma ideia prejudica quem a recebe sem contexto completo. Avaliar risco com calma é sinal de maturidade; ignorar o risco é reagir no impulso.",
  },
  {
    id: 4,
    pergunta: "Esta ideia ainda fará sentido daqui a 10 anos?",
    detecta: "Insight genuíno vs. entusiasmo passageiro",
    ensinamento:
      "A sabedoria nasce da reflexão de longo prazo, não do impulso do momento. Perguntas sobre o futuro acalmam a urgência e abrem espaço para pensar melhor.",
  },
  {
    id: 5,
    pergunta: "Consigo explicar o risco desta ideia com a mesma clareza que explico o benefício?",
    detecta: "Equilíbrio entre o que ajuda e o que pode prejudicar",
    ensinamento:
      "Toda força tem um lado difícil. Ignorar o lado difícil não o elimina — só o esconde até causar dano. Reconhecer nossos pontos fracos é sinal de maturidade emocional.",
  },
];

export const SINAL_ATIVACAO_VIVEKA =
  "Quando uma ideia parece tão certa que a crítica parece desnecessária — esse é o momento de parar e fazer as 5 perguntas abaixo.";

export const RESULTADO_VIVEKA = {
  prosseguir: "5 respostas claras e honestas → pode publicar.",
  pausar: "1 ou mais respostas vagas ou defensivas → revise com alguém de confiança antes de publicar.",
  parar: "Resistência em responder qualquer pergunta → não publique ainda — essa resistência é o sinal mais importante.",
};

export type BlocoBencaoMaldicao = {
  bencao: string;
  maldicao: string;
  base_cientifica: string[];
  salvaguarda: string;
  pergunta_viveka: string;
};

/** Exemplo protocolo — Herança cultural e transformação pessoal (Seção 2) */
export const EXEMPLO_BENCAO_MALDICTION_EPIGENETICA: BlocoBencaoMaldicao = {
  bencao:
    "O cérebro muda com a prática — você não está preso a padrões do passado. A tradição e a cultura que você herdou podem ser um ponto de partida, nunca um teto.",
  maldicao:
    "A ideia de linhagem superior pode ativar o mesmo circuito do preconceito racial — mesmo com intenção espiritual. O racismo disfarçado de ciência começou exatamente assim.",
  base_cientifica: [
    "Neuroplasticidade — Kandel, Merzenich (ciência estabelecida)",
    "Herança transgeracional em humanos — campo em investigação, resultados preliminares (hipótese, não fato estabelecido)",
  ],
  salvaguarda:
    "O caminho de transformação se ativa pela prática — não pela origem. Qualquer ser humano pode acessar. Nunca inferir superioridade por linhagem, raça ou cultura.",
  pergunta_viveka:
    "Você estaria disposto a ensinar esta ideia para alguém de qualquer origem, raça ou tradição, com a mesma convicção? Se sim — prossiga. Se hesitou — revise.",
};
