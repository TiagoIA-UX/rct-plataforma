import { labelCategoria, normalizarCategoria } from "@/lib/categorias";
import { resolverImagemPorPalavraChave, extrairPalavraChaveImagem } from "@/lib/imagens-palavra-chave";

const CATEGORIA_FRASE: Record<string, string> = {
  "jesus-o-mestre": "A oração de Jesus — Evangelhos com referências publicadas",
  "biblia-e-etimologia": "Escritura, etimologia e ciência com honestidade",
  "fe-e-razao": "Fé e razão no mesmo caminho",
  "vida-interior": "Mente, emoção e hábitos — estudos publicados",
  "santos-por-acoes": "Santos por ações — não por títulos vazios",
  "amor-universal": "Amor ao próximo, à natureza e aos animais",
  "biblia-neurocientifica": "Escritura e neurociência — série em desenvolvimento",
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
    frase: CATEGORIA_FRASE[slugCat] ?? "Tradição cristã e ciência do comportamento",
  };
}
