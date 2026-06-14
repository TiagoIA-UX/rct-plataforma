import { labelCategoria, normalizarCategoria } from "@/lib/categorias";
import { resolverImagemPorPalavraChave, extrairPalavraChaveImagem } from "@/lib/imagens-palavra-chave";

const CATEGORIA_FRASE: Record<string, string> = {
  "jesus-grande-yogue": "A oração de Jesus — Evangelhos com referências publicadas",
  "prompts-do-mestre": "Orientações do Mestre — precisão, clareza e prática",
  "epigenetica-sagrada": "Herança cultural e transformação pessoal",
  "virus-do-dna": "Hábitos que moldam o cérebro no dia a dia",
  "misticismo-decodificado": "Símbolos explicados com calma",
  "ahimsa-aplicada": "Não-violência vivida no dia a dia",
  "linhagem-do-conhecimento": "Sabedoria transmitida em rede",
};

export type BannerArtigoData = {
  src: string;
  alt: string;
  credito: string;
  label: string;
  frase: string;
  palavra_chave?: string;
};

export function getBannerArtigo(
  categoria: string,
  titulo?: string,
  slug?: string
): BannerArtigoData {
  const slugCat = normalizarCategoria(categoria);

  if (titulo?.trim()) {
    const img = resolverImagemPorPalavraChave(titulo, { slug, categoria: slugCat });
    const chave = extrairPalavraChaveImagem(titulo, slug);
    return {
      src: img.url,
      alt: img.alt,
      credito: img.credit,
      label: labelCategoria(categoria),
      frase: CATEGORIA_FRASE[slugCat] ?? CATEGORIA_FRASE[categoria] ?? `Tema: ${chave}`,
      palavra_chave: chave,
    };
  }

  const img = resolverImagemPorPalavraChave("RCT", { categoria: slugCat });
  return {
    src: img.url,
    alt: img.alt,
    credito: img.credit,
    label: labelCategoria(categoria),
    frase: CATEGORIA_FRASE[slugCat] ?? "Tradição cristã e ciência do comportamento",
  };
}
