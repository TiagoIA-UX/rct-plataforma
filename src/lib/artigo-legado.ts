/**
 * Detecção de artigos do protocolo RCT legado (yogue/samadhi/dharana)
 * vs. Instituto NEUMA — investigação da transformação humana.
 */

/** Termos proibidos como eixo principal (título/subtítulo). */
export const PADROES_PROTOCOLO_LEGADO = [
  /\b(yogue|yogui|iogue)\b/i,
  /\bsamadhi\b/i,
  /\bdharana\b/i,
  /\bdhyana\b/i,
  /\bgrande[- ]yogue\b/i,
  /jesus[^.\n]{0,80}\b(yogue|yogui|iogue|samadhi)\b/i,
  /\b(yogue|yogui|iogue|samadhi)\b[^.\n]{0,80}\bjesus\b/i,
] as const;

export type ArtigoParaLegado = {
  titulo: string;
  subtitulo?: string | null;
  slug?: string;
  categoria?: string;
  conteudo_html?: string | null;
};

/** Títulos canônicos NEUMA — slug → metadados (revisão editorial). */
export const MIGRACAO_TITULOS_NEUMA: Record<
  string,
  { titulo: string; subtitulo?: string; categoria?: string }
> = {
  "jesus-aos-12-anos-no-temple": {
    titulo: "Jesus aos 12 anos no Templo: o que o relato revela sobre atenção e pertencimento",
    subtitulo: "Lucas 2:46-52 · desenvolvimento humano · escuta e presença",
    categoria: "jesus-transformacao",
  },
  "paulo-espinho-na-carne-ciencia-e-biblia": {
    titulo: "Paulo e o Espinho na Carne: como o sofrimento molda a mente humana",
    subtitulo: "Dor crônica, trauma e resiliência — 2 Coríntios 12 · leitura neurocomportamental",
    categoria: "jesus-transformacao",
  },
};

export function textoCabecalhoArtigo(artigo: ArtigoParaLegado): string {
  return `${artigo.titulo}\n${artigo.subtitulo ?? ""}`.trim();
}

export function usaProtocoloLegado(texto: string): boolean {
  return PADROES_PROTOCOLO_LEGADO.some((re) => re.test(texto));
}

/** Artigo ainda no paradigma yogue/samadhi (título ou subtítulo). */
export function artigoProtocoloLegado(artigo: ArtigoParaLegado): boolean {
  if (usaProtocoloLegado(textoCabecalhoArtigo(artigo))) return true;
  if (artigo.conteudo_html && usaProtocoloLegado(artigo.conteudo_html.slice(0, 800))) {
    return usaProtocoloLegado(artigo.titulo);
  }
  return false;
}

/** Prioriza artigos alinhados ao NEUMA; oculta legado da vitrine pública. */
export function filtrarArtigosAlinhadosNeuma<T extends ArtigoParaLegado>(artigos: T[]): T[] {
  return artigos.filter((a) => !artigoProtocoloLegado(a));
}

/** Slugs duplicados do protocolo legado — despublicar após migração NEUMA. */
export const SLUGS_LEGADO_DUPLICADOS = [
  "jesus-aos-12-anos",
  "jesus-aos-12-anos-no-templo-dharana-dhyana-e-o-samadhi",
  "jesus-12-anos-templo-dharana-dhyana-samadhi",
] as const;

export const CATEGORIAS_REVISAO_NEUMA = [
  "jesus-transformacao",
  "mateus-transformacao",
  "evangelhos-transformacao",
  "jesus-grande-yogue",
] as const;
