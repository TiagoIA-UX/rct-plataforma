/** Protocolo Viveka v2.0 — Seção 1: 5 perguntas de autocorreção */

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
    detecta: "Ego disfarçado de verdade — amígdala dominando o pré-frontal",
    ensinamento:
      "Quando precisamos que o outro erre para existirmos, o sistema nervoso está em modo de ameaça — não de descoberta. O córtex pré-frontal detecta possibilidade; a amígdala em alarme detecta apenas ameaça.",
  },
  {
    id: 2,
    pergunta: "Esta ideia me isola ou conecta?",
    detecta: "Risco de criação de bolha sectária",
    ensinamento:
      "Dopamina de pertencimento a grupo exclusivo ativa o mesmo circuito do vício — prazer imediato, custo de longo prazo. Grupos que se fecham progressivamente reforçam o ego coletivo, não a consciência individual.",
  },
  {
    id: 3,
    pergunta: "Estou disposto a publicar também o risco desta ideia?",
    detecta: "Teste de transparência radical — Ahimsa intelectual",
    ensinamento:
      "Ocultar o risco de uma ideia é violência sutil contra quem a recebe sem contexto completo. O córtex pré-frontal avalia risco; suprimir essa avaliação é regredir ao funcionamento límbico.",
  },
  {
    id: 4,
    pergunta: "Esta ideia ainda fará sentido daqui a 10 anos?",
    detecta: "Insight genuíno vs. excitação neural momentânea",
    ensinamento:
      "O córtex pré-frontal, não a amígdala, é o órgão da sabedoria. Perguntas de longo prazo ativam o pré-frontal e desativam a urgência dopaminérgica do momento.",
  },
  {
    id: 5,
    pergunta: "Consigo explicar o risco desta ideia com a mesma clareza que explico o benefício?",
    detecta: "Equilíbrio entre bênção e maldição — lei das polaridades",
    ensinamento:
      "Toda força contém sua sombra. Não enxergar a sombra não a elimina — apenas a torna invisível até causar dano. A integração da sombra é a definição junguiana de maturidade psicológica.",
  },
];

export const SINAL_ATIVACAO_VIVEKA =
  "Quando uma ideia parece tão certa que a crítica parece desnecessária — esse é o momento exato de ativar o Protocolo Viveka.";

export const RESULTADO_VIVEKA = {
  prosseguir: "5 respostas claras e honestas → PROSSEGUIR com publicação.",
  pausar: "1 ou mais respostas vagas ou defensivas → PAUSAR e revisar com parceiro externo.",
  parar: "Resistência em responder qualquer pergunta → PARAR — a resistência é o dado mais importante.",
};

export type BlocoBencaoMaldicao = {
  bencao: string;
  maldicao: string;
  base_cientifica: string[];
  salvaguarda: string;
  pergunta_viveka: string;
};

/** Exemplo protocolo — Epigenética e Linhagem (Seção 2) */
export const EXEMPLO_BENCAO_MALDICTION_EPIGENETICA: BlocoBencaoMaldicao = {
  bencao:
    "Traços de resiliência, criatividade e capacidade contemplativa podem ser herdados epigeneticamente e reativados pela prática. Você não começa do zero.",
  maldicao:
    "A ideia de linhagem superior pode ativar o mesmo circuito neural do preconceito racial — mesmo com intenção espiritual. O nazismo científico começou exatamente assim.",
  base_cientifica: [
    "Yehuda et al. — epigenética transgeracional (estabelecida)",
    "Franklin & Mansuy — herança comportamental (estabelecida)",
  ],
  salvaguarda:
    "O código se ativa pela prática — não pela origem. Qualquer ser humano pode acessar. A linhagem indica potencial herdado, nunca superioridade.",
  pergunta_viveka:
    "Você estaria disposto a ensinar esta ideia para alguém de qualquer origem, raça ou tradição, com a mesma convicção? Se sim — prossiga. Se hesitou — revise.",
};
