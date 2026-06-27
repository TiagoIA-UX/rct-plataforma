/**
 * Imagens por palavra-chave do título — cada post usa a palavra temática do título.
 */

import { MARCA_NOME } from "@/lib/identidade";

export type ImagemArtigo = {
  url: string;
  alt: string;
  credit: string;
  palavra_chave: string;
};

/** Ordem: termos mais específicos primeiro */
const PALAVRAS_PRIORIDADE = [
  "mandamentos",
  "mandamento",
  "espinho",
  "templo",
  "éxodo",
  "exodo",
  "neuroplástico",
  "neuroplasticidade",
  "anjos",
  "milagre",
  "milagres",
  "oração",
  "oracao",
  "deserto",
  "cruz",
  "paulo",
  "herança",
  "heranca",
  "hábitos",
  "habitos",
  "não-violência",
  "nao-violencia",
  "ahimsa",
  "bíblia",
  "biblia",
  "jesus",
  "apóstolo",
  "apostolo",
  "neurociência",
  "neurociencia",
] as const;

/** Slug → palavra-chave fixa */
export const SLUG_PALAVRA_CHAVE: Record<string, string> = {
  "paulo-espinho-na-carne-ciencia-e-biblia": "paulo",
  "10-mandamentos-oriente-medio-ciencia-epigenetica": "mandamentos",
  "jesus-aos-12-anos-no-temple": "templo",
};

const CREDITO_IA = "Ilustração gerada por IA — Instituto NEUMA";
const JOY_DESERTO = "/images/joy-deserto.png";
const JOY_ESPERANCA = "/images/joy-esperanca.png";
const JOY_ESCRITURAS = "/images/joy-escrituras.png";
const JOY_MENTE = "/images/joy-mente.png";
const JOY_COMUNIDADE = "/images/joy-comunidade.png";
const JOY_FAMILIA = "/images/joy-familia.png";
const JOY_HABITOS = "/images/joy-habitos.png";
const JESUS_PASTOR = "/images/jesus-pastor.png";

export const IMAGENS_POR_PALAVRA_CHAVE: Record<string, ImagemArtigo> = {
  mandamentos: {
    palavra_chave: "mandamentos",
    url: JOY_DESERTO,
    alt: "Amanhecer luminoso no deserto com um oásis — esperança e provisão",
    credit: CREDITO_IA,
  },
  mandamento: {
    palavra_chave: "mandamento",
    url: JOY_DESERTO,
    alt: "Amanhecer luminoso no deserto com um oásis — esperança e provisão",
    credit: CREDITO_IA,
  },
  espinho: {
    palavra_chave: "espinho",
    url: JOY_ESPERANCA,
    alt: "Amanhecer sobre as colinas — esperança e resiliência",
    credit: CREDITO_IA,
  },
  paulo: {
    palavra_chave: "paulo",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave — estudo e cartas",
    credit: CREDITO_IA,
  },
  apostolo: {
    palavra_chave: "apostolo",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave — missão e ensino",
    credit: CREDITO_IA,
  },
  "apóstolo": {
    palavra_chave: "apóstolo",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave — missão e ensino",
    credit: CREDITO_IA,
  },
  templo: {
    palavra_chave: "templo",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave — sabedoria e aprendizado",
    credit: CREDITO_IA,
  },
  jesus: {
    palavra_chave: "jesus",
    url: JESUS_PASTOR,
    alt: "Jesus sorrindo com um cordeiro nos braços, ao amanhecer",
    credit: CREDITO_IA,
  },
  neuroplástico: {
    palavra_chave: "neuroplástico",
    url: JOY_MENTE,
    alt: "Mente em florescimento — neuroplasticidade e crescimento",
    credit: CREDITO_IA,
  },
  neuroplasticidade: {
    palavra_chave: "neuroplasticidade",
    url: JOY_MENTE,
    alt: "Mente em florescimento — neuroplasticidade e crescimento",
    credit: CREDITO_IA,
  },
  éxodo: {
    palavra_chave: "éxodo",
    url: JOY_DESERTO,
    alt: "Amanhecer no deserto com oásis — caminho de esperança",
    credit: CREDITO_IA,
  },
  exodo: {
    palavra_chave: "exodo",
    url: JOY_DESERTO,
    alt: "Amanhecer no deserto com oásis — caminho de esperança",
    credit: CREDITO_IA,
  },
  anjos: {
    palavra_chave: "anjos",
    url: JOY_ESPERANCA,
    alt: "Luz dourada no horizonte — presença e cuidado",
    credit: CREDITO_IA,
  },
  milagre: {
    palavra_chave: "milagre",
    url: JOY_ESPERANCA,
    alt: "Amanhecer luminoso — maravilha e transformação",
    credit: CREDITO_IA,
  },
  milagres: {
    palavra_chave: "milagres",
    url: JOY_ESPERANCA,
    alt: "Amanhecer luminoso — sinais e maravilhas",
    credit: CREDITO_IA,
  },
  oração: {
    palavra_chave: "oração",
    url: JOY_ESPERANCA,
    alt: "Natureza em calma e luz — oração e silêncio",
    credit: CREDITO_IA,
  },
  oracao: {
    palavra_chave: "oracao",
    url: JOY_ESPERANCA,
    alt: "Natureza em calma e luz — oração e silêncio",
    credit: CREDITO_IA,
  },
  deserto: {
    palavra_chave: "deserto",
    url: JOY_DESERTO,
    alt: "Amanhecer no deserto com oásis — clareza e esperança",
    credit: CREDITO_IA,
  },
  cruz: {
    palavra_chave: "cruz",
    url: JOY_ESPERANCA,
    alt: "Amanhecer sobre as colinas — esperança",
    credit: CREDITO_IA,
  },
  herança: {
    palavra_chave: "herança",
    url: JOY_FAMILIA,
    alt: "Família entre gerações cuidando da vida — herança",
    credit: CREDITO_IA,
  },
  heranca: {
    palavra_chave: "heranca",
    url: JOY_FAMILIA,
    alt: "Família entre gerações cuidando da vida — herança",
    credit: CREDITO_IA,
  },
  hábitos: {
    palavra_chave: "hábitos",
    url: JOY_HABITOS,
    alt: "Rotina saudável ao sol da manhã — hábitos e bem-estar",
    credit: CREDITO_IA,
  },
  habitos: {
    palavra_chave: "habitos",
    url: JOY_HABITOS,
    alt: "Rotina saudável ao sol da manhã — hábitos e bem-estar",
    credit: CREDITO_IA,
  },
  "não-violência": {
    palavra_chave: "não-violência",
    url: JOY_COMUNIDADE,
    alt: "Pessoas unidas e sorrindo — paz e não-violência",
    credit: CREDITO_IA,
  },
  "nao-violencia": {
    palavra_chave: "nao-violencia",
    url: JOY_COMUNIDADE,
    alt: "Pessoas unidas e sorrindo — paz e não-violência",
    credit: CREDITO_IA,
  },
  ahimsa: {
    palavra_chave: "ahimsa",
    url: JOY_COMUNIDADE,
    alt: "Pessoas unidas e sorrindo — não-violência vivida",
    credit: CREDITO_IA,
  },
  bíblia: {
    palavra_chave: "bíblia",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave e flores — leitura e sabedoria",
    credit: CREDITO_IA,
  },
  biblia: {
    palavra_chave: "biblia",
    url: JOY_ESCRITURAS,
    alt: "Livro aberto à luz suave e flores — leitura e sabedoria",
    credit: CREDITO_IA,
  },
  neurociência: {
    palavra_chave: "neurociência",
    url: JOY_MENTE,
    alt: "Mente em florescimento — ciência do cérebro e bem-estar",
    credit: CREDITO_IA,
  },
  neurociencia: {
    palavra_chave: "neurociencia",
    url: JOY_MENTE,
    alt: "Mente em florescimento — ciência do cérebro e bem-estar",
    credit: CREDITO_IA,
  },
};

const IMAGEM_PADRAO: ImagemArtigo = {
  palavra_chave: "geral",
  url: JOY_ESPERANCA,
  alt: `Amanhecer luminoso sobre as colinas — ${MARCA_NOME}`,
  credit: CREDITO_IA,
};

function normalizarTexto(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function extrairPalavraChaveImagem(titulo: string, slug?: string): string {
  if (slug && SLUG_PALAVRA_CHAVE[slug]) {
    return SLUG_PALAVRA_CHAVE[slug];
  }

  const parteTematica = titulo.includes(":") ? titulo.split(":").pop()!.trim() : titulo;
  const texto = normalizarTexto(parteTematica);
  const textoCompleto = normalizarTexto(titulo);

  for (const palavra of PALAVRAS_PRIORIDADE) {
    const p = normalizarTexto(palavra);
    if (texto.includes(p) || textoCompleto.includes(p)) {
      return palavra;
    }
  }

  return "geral";
}

export function resolverImagemPorPalavraChave(
  titulo: string,
  opts?: { slug?: string; categoria?: string }
): ImagemArtigo {
  const chave = extrairPalavraChaveImagem(titulo, opts?.slug);
  const img = IMAGENS_POR_PALAVRA_CHAVE[chave] ?? IMAGENS_POR_PALAVRA_CHAVE[normalizarTexto(chave)];
  if (img) return { ...img, alt: `${img.alt}` };
  return { ...IMAGEM_PADRAO, alt: `${MARCA_NOME} — ${titulo.slice(0, 80)}` };
}
