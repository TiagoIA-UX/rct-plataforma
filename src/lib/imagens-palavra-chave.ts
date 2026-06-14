/**
 * Imagens por palavra-chave do título — cada post usa a palavra temática do título.
 */

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

export const IMAGENS_POR_PALAVRA_CHAVE: Record<string, ImagemArtigo> = {
  mandamentos: {
    palavra_chave: "mandamentos",
    url: "https://images.unsplash.com/photo-1518173946687-a86c6e49f401?w=1200&q=80",
    alt: "Deserto ao entardecer — paisagem do Oriente Médio e das leis do Êxodo",
    credit: "Unsplash — Dave Hoefler",
  },
  mandamento: {
    palavra_chave: "mandamento",
    url: "https://images.unsplash.com/photo-1518173946687-a86c6e49f401?w=1200&q=80",
    alt: "Deserto ao entardecer — paisagem do Oriente Médio",
    credit: "Unsplash — Dave Hoefler",
  },
  espinho: {
    palavra_chave: "espinho",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af2179?w=1200&q=80",
    alt: "Galho com espinhos — metáfora do espinho na carne",
    credit: "Unsplash — Daiga Ellaby",
  },
  paulo: {
    palavra_chave: "paulo",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    alt: "Manuscrito e estudo — cartas do Apóstolo Paulo",
    credit: "Unsplash — Jonas Kakaroto",
  },
  apostolo: {
    palavra_chave: "apostolo",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    alt: "Texto antigo em estudo — missão apostólica",
    credit: "Unsplash — Jonas Kakaroto",
  },
  "apóstolo": {
    palavra_chave: "apóstolo",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80",
    alt: "Texto antigo em estudo — missão apostólica",
    credit: "Unsplash — Jonas Kakaroto",
  },
  templo: {
    palavra_chave: "templo",
    url: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?w=1200&q=80",
    alt: "Interior de templo com colunas — Jesus entre os doutores",
    credit: "Unsplash — Mateus Campos Felipe",
  },
  jesus: {
    palavra_chave: "jesus",
    url: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1200&q=80",
    alt: "Aurora sobre montanhas — luz e presença",
    credit: "Unsplash — Stefan Stefancik",
  },
  neuroplástico: {
    palavra_chave: "neuroplástico",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    alt: "Rede neural — cérebro em transformação",
    credit: "Unsplash — Alina Grubnyak",
  },
  neuroplasticidade: {
    palavra_chave: "neuroplasticidade",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    alt: "Rede neural — plasticidade cerebral",
    credit: "Unsplash — Alina Grubnyak",
  },
  éxodo: {
    palavra_chave: "éxodo",
    url: "https://images.unsplash.com/photo-1509316788709-9f5d8b0e8e1e?w=1200&q=80",
    alt: "Dunas no deserto — caminho do Êxodo",
    credit: "Unsplash — Walid Ahmad",
  },
  exodo: {
    palavra_chave: "exodo",
    url: "https://images.unsplash.com/photo-1509316788709-9f5d8b0e8e1e?w=1200&q=80",
    alt: "Dunas no deserto — caminho do Êxodo",
    credit: "Unsplash — Walid Ahmad",
  },
  anjos: {
    palavra_chave: "anjos",
    url: "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1200&q=80",
    alt: "Luz no horizonte — presença e cuidado",
    credit: "Unsplash — Stefan Stefancik",
  },
  milagre: {
    palavra_chave: "milagre",
    url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200&q=80",
    alt: "Céu estrelado — mistério e transformação",
    credit: "Unsplash — Jeremy Thomas",
  },
  milagres: {
    palavra_chave: "milagres",
    url: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=1200&q=80",
    alt: "Céu estrelado — sinais e maravilhas",
    credit: "Unsplash — Jeremy Thomas",
  },
  oração: {
    palavra_chave: "oração",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    alt: "Natureza em calma — oração e silêncio",
    credit: "Unsplash — Faye Cornish",
  },
  oracao: {
    palavra_chave: "oracao",
    url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1200&q=80",
    alt: "Natureza em calma — oração e silêncio",
    credit: "Unsplash — Faye Cornish",
  },
  deserto: {
    palavra_chave: "deserto",
    url: "https://images.unsplash.com/photo-1509316788709-9f5d8b0e8e1e?w=1200&q=80",
    alt: "Deserto — provação e clareza",
    credit: "Unsplash — Walid Ahmad",
  },
  cruz: {
    palavra_chave: "cruz",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Montanhas ao amanhecer — sacrifício e esperança",
    credit: "Unsplash — Kalen Emsley",
  },
  herança: {
    palavra_chave: "herança",
    url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    alt: "Espiral de DNA — herança e transformação",
    credit: "Unsplash — National Cancer Institute",
  },
  heranca: {
    palavra_chave: "heranca",
    url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80",
    alt: "Espiral de DNA — herança e transformação",
    credit: "Unsplash — National Cancer Institute",
  },
  hábitos: {
    palavra_chave: "hábitos",
    url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&q=80",
    alt: "Padrões digitais — hábitos e repetição",
    credit: "Unsplash — Markus Spiske",
  },
  habitos: {
    palavra_chave: "habitos",
    url: "https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=1200&q=80",
    alt: "Padrões digitais — hábitos e repetição",
    credit: "Unsplash — Markus Spiske",
  },
  "não-violência": {
    palavra_chave: "não-violência",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Montanhas serenas — paz e não-violência",
    credit: "Unsplash — Kalen Emsley",
  },
  "nao-violencia": {
    palavra_chave: "nao-violencia",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Montanhas serenas — paz e não-violência",
    credit: "Unsplash — Kalen Emsley",
  },
  ahimsa: {
    palavra_chave: "ahimsa",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    alt: "Paisagem calma — não-violência",
    credit: "Unsplash — Kalen Emsley",
  },
  bíblia: {
    palavra_chave: "bíblia",
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    alt: "Biblioteca e textos sagrados",
    credit: "Unsplash — Alfons Morales",
  },
  biblia: {
    palavra_chave: "biblia",
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&q=80",
    alt: "Biblioteca e textos sagrados",
    credit: "Unsplash — Alfons Morales",
  },
  neurociência: {
    palavra_chave: "neurociência",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    alt: "Rede neural — ciência do cérebro",
    credit: "Unsplash — Alina Grubnyak",
  },
  neurociencia: {
    palavra_chave: "neurociencia",
    url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
    alt: "Rede neural — ciência do cérebro",
    credit: "Unsplash — Alina Grubnyak",
  },
};

const IMAGEM_PADRAO: ImagemArtigo = {
  palavra_chave: "geral",
  url: "https://images.unsplash.com/photo-1507963901243-ebfaecd5f2f4?w=1200&q=80",
  alt: "Luz suave — Todos Sejam Um",
  credit: "Unsplash — Giammarco Boscaro",
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
  return { ...IMAGEM_PADRAO, alt: `Todos Sejam Um — ${titulo.slice(0, 80)}` };
}
