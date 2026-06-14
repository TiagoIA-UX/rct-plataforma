/**
 * Palavras controversas ou pouco compreendidas — link para etimologia (Wikipédia).
 * Uso: compreensão, não substituição da fé. Crédito: Wikipédia (CC BY-SA).
 */

export type EntradaEtimologia = {
  /** Slug usado no mapa */
  id: string;
  /** URL Wikipédia (pt) */
  url: string;
  /** Rótulo curto para title/aria */
  rotulo: string;
};

export const CREDITO_WIKIPEDIA =
  "Definições etimológicas resumidas com link para a Wikipédia (licença CC BY-SA). Leitura complementar — não substitui o texto bíblico nem a tradição da Igreja.";

/** Termos → Wikipédia (português) */
export const ETIMOLOGIA: Record<string, EntradaEtimologia> = {
  santo: {
    id: "santo",
    url: "https://pt.wikipedia.org/wiki/Santo",
    rotulo: "Santo — etimologia (grego ἅγιος)",
  },
  sao: {
    id: "sao",
    url: "https://pt.wikipedia.org/wiki/Santo",
    rotulo: "São — título de santidade",
  },
  apostolo: {
    id: "apostolo",
    url: "https://pt.wikipedia.org/wiki/Ap%C3%B3stolo",
    rotulo: "Apóstolo — enviado, mensageiro",
  },
  "são joão": {
    id: "sao-joao",
    url: "https://pt.wikipedia.org/wiki/Jo%C3%A3o,_o_Apostolo",
    rotulo: "São João — o Apóstolo",
  },
  meditacao: {
    id: "meditacao",
    url: "https://pt.wikipedia.org/wiki/Medita%C3%A7%C3%A3o",
    rotulo: "Meditação",
  },
  "oracao contemplativa": {
    id: "oracao-contemplativa",
    url: "https://pt.wikipedia.org/wiki/Ora%C3%A7%C3%A3o_contemplativa",
    rotulo: "Oração contemplativa",
  },
  yoga: {
    id: "yoga",
    url: "https://pt.wikipedia.org/wiki/Yoga",
    rotulo: "Yoga — para comparação entre tradições",
  },
  mandamento: {
    id: "mandamento",
    url: "https://pt.wikipedia.org/wiki/Mandamento",
    rotulo: "Mandamento",
  },
  sincretismo: {
    id: "sincretismo",
    url: "https://pt.wikipedia.org/wiki/Sincretismo",
    rotulo: "Sincretismo",
  },
  neuroplasticidade: {
    id: "neuroplasticidade",
    url: "https://pt.wikipedia.org/wiki/Neuroplasticidade",
    rotulo: "Neuroplasticidade",
  },
  hagios: {
    id: "hagios",
    url: "https://pt.wikipedia.org/wiki/Santo",
    rotulo: "ἅγιος (hagios) — separado, consagrado",
  },
  "sao-francisco": {
    id: "sao-francisco",
    url: "https://pt.wikipedia.org/wiki/Francisco_de_Assis",
    rotulo: "São Francisco de Assis — cuidado da criação",
  },
  greta: {
    id: "greta",
    url: "https://pt.wikipedia.org/wiki/Greta_Thunberg",
    rotulo: "Greta Thunberg — ação climática contemporânea",
  },
};

export function urlEtimologia(id: string): string | undefined {
  return ETIMOLOGIA[id]?.url;
}

/** Gera HTML de link destacado para uso em conteudo_html de artigos */
export function htmlPalavraEtimologia(texto: string, id: string): string {
  const ent = ETIMOLOGIA[id];
  if (!ent) return texto;
  const title = `${ent.rotulo} — Wikipédia`;
  return `<a href="${ent.url}" class="palavra-etimologia" target="_blank" rel="noopener noreferrer" title="${title}">${texto}</a>`;
}
