import { labelCategoria, normalizarCategoria } from "@/lib/categorias";
import { resolverImagemPorPalavraChave, extrairPalavraChaveImagem } from "@/lib/imagens-palavra-chave";

const CATEGORIA_FRASE: Record<string, string> = {
  "jesus-transformacao": "Jesus: Educador de Consciência — relatos e modelos de transformação",
  "jesus-grande-yogue": "Jesus: Educador de Consciência — relatos e modelos de transformação",
  "prompts-do-mestre": "Prompts do Grande Mestre — precisão, clareza e prática",
  "epigenetica-sagrada": "Epigenética Sagrada — herança e transformação",
  "virus-do-dna": "Vírus do DNA — hábitos que moldam o corpo",
  "milagres-decodificados": "Milagres Decodificados — fenômenos explicados com rigor",
  "psicossomatica-sagrada": "Psicossomática Sagrada — corpo e alma em diálogo",
  "ahimsa-aplicada": "Ahimsa na Prática — não-violência vivida",
  "linhagem-do-conhecimento": "Linhagem do Conhecimento — sabedoria transmitida em rede",
  "biblia-neuroteologica": "Bíblia Neuroteológica — série em desenvolvimento",
  "misticismo-decodificado": "Milagres Decodificados — fenômenos explicados com rigor",
  "biblia-neurocientifica": "Bíblia Neuroteológica — série em desenvolvimento",
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

  const img = resolverImagemPorPalavraChave("unidade", { categoria: slugCat });
  return {
    src: img.url,
    alt: img.alt,
    credito: img.credit,
    label: labelCategoria(categoria),
    frase: CATEGORIA_FRASE[slugCat] ?? "Neurociência, psicossomática e epigenética a serviço da transformação",
  };
}
