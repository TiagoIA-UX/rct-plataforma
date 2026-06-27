/** PROMPT MESTRE — Instituto NEUMA (autorizado pelo fundador) */

/**
 * Cláusula anti-superioridade — exibida em artigos que mencionem herança, linhagem
 * ou termos de biologia comportamental. Protege contra interpretações racistas.
 */
export const CLAUSULA_EPIGENETICA = `⚠️ Nota científica: estudos sobre herança transgeracional em humanos são preliminares e ainda não replicados em escala — trata-se de hipótese em investigação, não de fato científico estabelecido. Além disso, nenhuma origem, etnia, raça ou linhagem confere superioridade. O caminho da transformação se ativa pela prática, não pelo nascimento.`;

export const AVISO_LEITURA_COMPLEMENTAR =
  "Esta é uma leitura investigativa — uma interpretação possível entre outras, não dogma religioso nem verdade fechada.";

export const FRASE_AUTONOMIA_PLATAFORMA =
  "Este ensinamento convida à prática. A transformação é sua — passo a passo, no seu ritmo.";

export const DECLARACAO_CONTRIBUIDOR =
  "Contribuo com intenção construtiva, sem impor minha verdade sobre os outros. Aceito que minha contribuição seja revisada e eventualmente não publicada, sem ressentimento.";

/** Princípio que toda publicação deve responder (PROMPT MESTRE) */
export const PRINCIPIO_CENTRAL_PUBLICACAO =
  "Como este conhecimento pode ajudar uma pessoa real a sofrer menos, desenvolver mais consciência e transformar sua vida?";

export const MISSAO_NEUMA = "Transformação humana é possível.";

export const FRASE_GUIA_NEUMA =
  "O cérebro muda. A consciência se expande. A vida pode ser transformada.";

export const FRASE_ESPERANCA_NEUMA = "Você não está condenado a permanecer como está.";

export const PERGUNTA_FUNDAMENTAL_NEUMA = "Eu ainda posso mudar?";

/** Pergunta de entrada — dor real antes da esperança */
export const PERGUNTA_PROFUNDA_NEUMA = "O que aconteceu comigo?";

/** Estrutura editorial obrigatória de todo artigo */
export const ESTRUTURA_NEUMA_TRANSFORMACAO = [
  {
    id: "contexto",
    pergunta: "O que aconteceu comigo?",
    descricao: "Contexto humano do sofrimento — sem diagnóstico fechado",
  },
  {
    id: "mecanismo",
    pergunta: "Como isso afeta mente, corpo e comportamento?",
    descricao: "Mecanismo — ciência e psicologia com rótulos [COMPROVADO PELA CIÊNCIA] ou [HIPÓTESE]",
  },
  {
    id: "traditions",
    pergunta: "Como diferentes tradições compreenderam isso?",
    descricao: "História, simbolismo, espiritualidade — múltiplas lentes, sem dogma",
  },
  {
    id: "pratica",
    pergunta: "O que posso fazer hoje?",
    descricao: "Aplicação prática — esperança responsável, aviso profissional",
  },
] as const;

/**
 * Princípio de equilíbrio editorial — o NEUMA não fala só de sofrimento.
 * A esperança exige contraste: propósito, coragem, crescimento, plenitude.
 */
export const PRINCIPIO_EQUILIBRIO_FLORESCIMENTO = `O Instituto NEUMA não deve ser associado apenas à dor. Além de explicar por que as pessoas adoecem, deve mostrar como florescem: propósito, criatividade, coragem, significado, autonomia, crescimento e estados de plenitude. Sofrimento compreendido + possibilidade de florescer — sempre em contraste.`;

export const TEMAS_FLORESCIMENTO = [
  "propósito",
  "criatividade",
  "coragem",
  "significado",
  "autonomia",
  "crescimento",
  "plenitude",
] as const;

/**
 * Princípio da Esperança Responsável — toda publicação comunica capacidade de
 * transformação sem promessas mágicas, falsas garantias ou fatalismo.
 */
export const PRINCIPIO_ESPERANCA_RESPONSAVEL = `O ser humano possui capacidade de transformação — sem promessas mágicas, sem falsas garantias, sem atalhos, e também sem fatalismo. Nenhum artigo deve transmitir que uma pessoa está permanentemente condenada por seu passado, trauma, condição emocional ou circunstâncias atuais. A ciência demonstra mudança. A experiência humana demonstra mudança. A missão do Instituto NEUMA é investigar e comunicar caminhos de transformação possíveis e aplicáveis.`;

export const PRINCIPIO_ESPERANCA_RESUMO =
  "Esperança responsável: transformação é possível — sem magia, sem garantias falsas, sem fatalismo.";

/** Enquadramento prioritário de Jesus — PROMPT MESTRE */
export const JESUS_ENQUADRAMENTO = [
  "agente de transformação humana",
  "educador de consciência",
  "reformador comportamental",
  "desafiante de sistemas opressivos",
  "exemplo de coerência entre pensamento, emoção e ação",
] as const;

/** Lentes obrigatórias para análise de milagres */
export const LENTES_MILAGRE = [
  "histórica",
  "simbólica",
  "psicológica",
  "psicossomática",
  "comportamental",
  "espiritual",
] as const;

/** Princípio editorial — substitui Salvaguarda 0.8 (Protocolo Mestre NEUMA) */
export const PRINCIPIO_NEUROTEOLOGIA =
  "O Instituto NEUMA investiga transformação humana na intersecção entre neurociência, comportamento, consciência, psicologia, significado existencial, espiritualidade e narrativa simbólica — sem provar milagres sobrenaturais e sem apresentar hipóteses como fatos.";

/** Alias canônico do protocolo atual */
export const PRINCIPIO_MESTRE_NEUMA = PRINCIPIO_NEUROTEOLOGIA;

/** Categorias que exigem revisão humana antes de publicação */
export const CATEGORIAS_REVISAO_HUMANA = new Set([
  "prompts-do-mestre",
  "epigenetica-sagrada",
  "mateus-transformacao",
  "biblia-neuroteologica",
  "biblia-neurocientifica",
]);

const PADROES_AFIRMACAO_PARANORMAL = [
  /comprovad[oa]\s+cientificamente[^.\n]{0,100}(milagre|poder\s+sobrenatural|paranormal|oniscien|omnipot)/i,
  /a\s+ci[eê]ncia\s+(comprova|confirmou|provou)[^.\n]{0,80}(milagre|poder\s+sobrenatural|oniscien|omnipot)/i,
  /jesus\s+(provou|demonstr[oa]|possu[ií]a|tinha)\s+(poderes?\s+)?(paranormal|sobrenatural|m[aá]gic)/i,
  /manipula[cç][aã]o\s+celular\s+sobrenatural/i,
  /onisci[eê]ncia\s+(comprovada|demonstrada|verificada|cientificamente)/i,
  /explica[cç][aã]o\s+cient[ií]fica\s+(comprovada|estabelecida)[^.\n]{0,60}(milagre|ressurrei[cç][aã]o\s+f[ií]sica)/i,
];

const PADROES_REDUCAO_PSICOSSOMATICA = [
  /todo[s]?\s+(os\s+)?milagres?\s+(s[aã]o|eram|é|era)\s+(apenas|somente|simplesmente|nada\s+mais\s+que)[^.\n]{0,50}(psicossom[aá]tic|mentais?|imagin[aá]ri)/i,
  /(cada|qualquer)\s+milagre\s+(é|era)\s+(apenas|somente)[^.\n]{0,40}(psicossom[aá]tic|doen[cç]a\s+mental)/i,
  /milagres?\s+(nada\s+mais\s+s[aã]o|s[aã]o\s+apenas)\s+(doen[cç]a\s+)?psicossom[aá]tic/i,
];

const PADROES_FATALISMO = [
  /você\s+(está|estará|fica|permanece)\s+condenad[oa]/i,
  /nunca\s+(poderá|vai\s+poder|conseguirá)\s+(mudar|transformar|curar|superar)/i,
  /permanentemente\s+condenad[oa]/i,
  /não\s+há\s+esperança\s+(de\s+)?(mudança|transformação|cura)/i,
  /(impossível|inviável)\s+(mudar|transformar)\s+(para\s+)?sempre/i,
  /condenad[oa]\s+(para\s+)?sempre/i,
];

const PADROES_PROMESSA_MAGICA = [
  /(cura|transformação|mudança)\s+(garantida|instantânea|imediata|milagrosa)/i,
  /garantimos?\s+(a\s+)?(cura|transformação|mudança)/i,
  /(cura|transformação)\s+em\s+\d+\s+(dias|horas)\s+(garantid)/i,
  /resultado\s+(garantido|certo)\s+(de\s+)?(cura|transformação)/i,
];

/** Detecta fatalismo dirigido ao leitor — viola Esperança Responsável. */
export function transmiteFatalismo(texto: string): boolean {
  return PADROES_FATALISMO.some((re) => re.test(texto));
}

/** Detecta promessas mágicas ou garantias falsas — viola Esperança Responsável. */
export function prometeMagiaOuGarantiaFalsa(texto: string): boolean {
  return PADROES_PROMESSA_MAGICA.some((re) => re.test(texto));
}

const PADROES_RISCO_EPIGENETICO = [
  /linhagem\s+(superior|pura|escolhida)/i,
  /ra[çc]a\s+superior/i,
  /sangue\s+puro/i,
  /povo\s+eleito\s+por\s+(origem|sangue|gen)/i,
  /superioridade\s+(racial|étnica|genética)/i,
];

/** Detecta afirmação de poderes paranormais ou ciência inexistente como fato. */
export function afirmaParanormalComoFato(texto: string): boolean {
  return PADROES_AFIRMACAO_PARANORMAL.some((re) => re.test(texto));
}

/** Detecta redução automática de todos os milagres a psicossomática. */
export function reduzMilagresAutomaticamentePsicossomatico(texto: string): boolean {
  return PADROES_REDUCAO_PSICOSSOMATICA.some((re) => re.test(texto));
}

/** Título/subtítulo — protocolo legado (yogue, samadhi, dharana…). */
export function usaProtocoloLegadoTitulo(texto: string): boolean {
  const padroes = [
    /\b(yogue|yogui|iogue)\b/i,
    /\bsamadhi\b/i,
    /\bdharana\b/i,
    /\bdhyana\b/i,
    /jesus[^.\n]{0,80}\b(yogue|yogui|iogue|samadhi)\b/i,
  ];
  return padroes.some((re) => re.test(texto));
}

/** @deprecated Use usaProtocoloLegadoTitulo */
export function descreveJesusComoYogue(texto: string): boolean {
  return usaProtocoloLegadoTitulo(texto);
}

export function conteudoEpigeneticoSuspeito(texto: string): boolean {
  return PADROES_RISCO_EPIGENETICO.some((re) => re.test(texto));
}

export function exigeClausulaEpigenetica(texto: string, categoria?: string): boolean {
  const blob = texto.toLowerCase();
  const mencionaEpigenetica =
    blob.includes("epigen") || blob.includes("linhagem") || categoria === "epigenetica-sagrada";
  return mencionaEpigenetica;
}

export function validarSalvaguardaEpigenetica(texto: string): {
  ok: boolean;
  motivo?: string;
} {
  if (conteudoEpigeneticoSuspeito(texto)) {
    return {
      ok: false,
      motivo: "Texto sugere superioridade por origem — bloqueado pela Salvaguarda 0.1.",
    };
  }
  if (exigeClausulaEpigenetica(texto) && !texto.includes("nunca superioridade")) {
    return {
      ok: false,
      motivo: "Conteúdo epigenético sem cláusula anti-superioridade obrigatória.",
    };
  }
  return { ok: true };
}

/** Validação editorial — PROMPT MESTRE NEUMA */
export function validarPrincipioMestre(texto: string): { ok: boolean; motivo?: string } {
  if (usaProtocoloLegadoTitulo(texto)) {
    return {
      ok: false,
      motivo:
        "Protocolo NEUMA: remover yogue/samadhi/dharana/dhyana como identidade de Jesus — investigar transformação humana.",
    };
  }
  if (afirmaParanormalComoFato(texto)) {
    return {
      ok: false,
      motivo:
        "PROMPT MESTRE: não afirmar poderes paranormais, onisciência ou ciência inexistente como fato.",
    };
  }
  if (reduzMilagresAutomaticamentePsicossomatico(texto)) {
    return {
      ok: false,
      motivo:
        "PROMPT MESTRE: não reduzir automaticamente todos os milagres a doença psicossomática.",
    };
  }
  if (transmiteFatalismo(texto)) {
    return {
      ok: false,
      motivo:
        "Princípio da Esperança Responsável: não transmitir que a pessoa está permanentemente condenada.",
    };
  }
  if (prometeMagiaOuGarantiaFalsa(texto)) {
    return {
      ok: false,
      motivo:
        "Princípio da Esperança Responsável: sem promessas mágicas, falsas garantias ou atalhos.",
    };
  }
  return { ok: true };
}
