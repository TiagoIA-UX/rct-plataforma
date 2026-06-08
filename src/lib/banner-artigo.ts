import { labelCategoria, normalizarCategoria } from "@/lib/categorias";
import { IMAGENS } from "@/lib/imagens";

/** Imagem e texto do banner por categoria — 7 categorias do protocolo */
const CATEGORIA_IMAGEM: Record<string, keyof typeof IMAGENS> = {
  "jesus-grande-yogue": "formacao",
  "prompts-do-mestre": "blog",
  "epigenetica-sagrada": "epigenetica",
  "virus-do-dna": "habitos",
  "misticismo-decodificado": "milagres",
  "ahimsa-aplicada": "ahimsa",
  "linhagem-do-conhecimento": "comunidade",
  mandamentos: "milagres",
  epigenetica: "epigenetica",
  neurociencia: "neurociencia",
  ahimsa: "ahimsa",
  "milagres-decodificados": "milagres",
  "rede-dos-escolhidos": "comunidade",
};

const CATEGORIA_FRASE: Record<string, string> = {
  "jesus-grande-yogue": "Samadhi em ação — Jesus e a yoga oculta dos Evangelhos",
  "prompts-do-mestre": "Instruções do Mestre — precisão, clareza e prática",
  "epigenetica-sagrada": "Herança que se transforma — epigenética e linhagem",
  "virus-do-dna": "Hábitos que moldam o cérebro — neuroplasticidade no dia a dia",
  "misticismo-decodificado": "Símbolo e mecanismo — leitura racional do sagrado",
  "ahimsa-aplicada": "Paz praticada — não-violência como estado verificável",
  "linhagem-do-conhecimento": "Caminhar juntos — sabedoria transmitida em rede",
};

export type BannerArtigoData = {
  src: string;
  alt: string;
  credito: string;
  label: string;
  frase: string;
};

export function getBannerArtigo(categoria: string, titulo?: string): BannerArtigoData {
  const slug = normalizarCategoria(categoria);
  const imgKey = CATEGORIA_IMAGEM[slug] ?? CATEGORIA_IMAGEM[categoria] ?? "blog";
  const img = IMAGENS[imgKey];
  return {
    src: img.src,
    alt: titulo ? `Banner: ${titulo}` : img.alt,
    credito: img.credito,
    label: labelCategoria(categoria),
    frase: CATEGORIA_FRASE[slug] ?? CATEGORIA_FRASE[categoria] ?? "Tradição cristã e neurociência comportamental",
  };
}
