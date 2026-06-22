/**
 * Módulo Mateus — primeiro módulo do Sistema de Decodificação Humana.
 * 28 capítulos → 3 artigos cada (principal, sofrimento, florescimento).
 */

import {
  CATEGORIA_MATEUS,
  slugArtigoMateus,
  tagCapituloMateus,
  TAG_MODULO_MATEUS,
  TAG_TIPO,
  type TipoArtigoModulo,
} from "@/lib/decodificacao-humana";

export type CapituloMateus = {
  numero: number;
  titulo: string;
  slug: string;
  referencia_ancora: string;
  foco: string;
};

/** Índice canônico — Mateus 1–28 */
export const CAPITULOS_MATEUS: CapituloMateus[] = [
  { numero: 1, titulo: "Genealogia e nascimento", slug: "genealogia-nascimento", referencia_ancora: "Mateus 1:1-25", foco: "Identidade, linhagem e pertencimento" },
  { numero: 2, titulo: "Os magos e a fuga", slug: "magos-fuga", referencia_ancora: "Mateus 2:1-23", foco: "Medo, poder e proteção" },
  { numero: 3, titulo: "João Batista e o batismo", slug: "joao-batismo", referencia_ancora: "Mateus 3:1-17", foco: "Arrepentimento, preparação e início" },
  { numero: 4, titulo: "Tentação no deserto", slug: "tentacao-deserto", referencia_ancora: "Mateus 4:1-25", foco: "Impulso, condicionamento e escolha" },
  { numero: 5, titulo: "Sermão — Bem-aventuranças", slug: "bem-aventurancas", referencia_ancora: "Mateus 5:1-48", foco: "Humildade, luto, justiça interior" },
  { numero: 6, titulo: "Sermão — Oração e confiança", slug: "oracao-confianca", referencia_ancora: "Mateus 6:1-34", foco: "Ansiedade, comparação e presença" },
  { numero: 7, titulo: "Sermão — Juízo e fundamento", slug: "juizo-fundamento", referencia_ancora: "Mateus 7:1-29", foco: "Crítica, hipocrisia e coerência" },
  { numero: 8, titulo: "Milagres de cura e tempestade", slug: "curas-tempestade", referencia_ancora: "Mateus 8:1-34", foco: "Medo, exclusão e autoridade interior" },
  { numero: 9, titulo: "Perdão e chamado", slug: "perdao-chamado", referencia_ancora: "Mateus 9:1-38", foco: "Culpa, paralisia e propósito" },
  { numero: 10, titulo: "Missão dos doze", slug: "missao-doze", referencia_ancora: "Mateus 10:1-42", foco: "Vulnerabilidade, rejeição e coragem" },
  { numero: 11, titulo: "João e o jugo leve", slug: "jugo-leve", referencia_ancora: "Mateus 11:1-30", foco: "Exaustão, expectativa e descanso" },
  { numero: 12, titulo: "Conflito com fariseus", slug: "conflito-fariseus", referencia_ancora: "Mateus 12:1-50", foco: "Culpa crônica, opressão e pertencimento" },
  { numero: 13, titulo: "Parábolas do Reino", slug: "parabolas-reino", referencia_ancora: "Mateus 13:1-58", foco: "Compreensão, rejeição e crescimento" },
  { numero: 14, titulo: "João decapitado e a multiplicação", slug: "joao-multiplicacao", referencia_ancora: "Mateus 14:1-36", foco: "Luto, escassez e sustento" },
  { numero: 15, titulo: "Tradições e fé da cananeia", slug: "tradicao-cananeia", referencia_ancora: "Mateus 15:1-39", foco: "Ritual vazio, persistência e cura" },
  { numero: 16, titulo: "Pedra e cruz", slug: "pedra-cruz", referencia_ancora: "Mateus 16:1-28", foco: "Identidade, medo e renúncia" },
  { numero: 17, titulo: "Transfiguração", slug: "transfiguracao", referencia_ancora: "Mateus 17:1-27", foco: "Esperança, medo e humildade" },
  { numero: 18, titulo: "Grandeza e perdão", slug: "grandeza-perdao", referencia_ancora: "Mateus 18:1-35", foco: "Comparação, ofensa e reconciliação" },
  { numero: 19, titulo: "Divórcio e o jovem rico", slug: "jovem-rico", referencia_ancora: "Mateus 19:1-30", foco: "Apego, perda e renúncia" },
  { numero: 20, titulo: "Trabalhadores da vinha", slug: "vinha", referencia_ancora: "Mateus 20:1-34", foco: "Injustiça percebida, serviço e compaixão" },
  { numero: 21, titulo: "Entrada em Jerusalém", slug: "entrada-jerusalem", referencia_ancora: "Mateus 21:1-46", foco: "Expectativa coletiva e desilusão" },
  { numero: 22, titulo: "Parábolas e a grande questão", slug: "parabolas-grande-questao", referencia_ancora: "Mateus 22:1-46", foco: "Recusa, pertencimento e sentido" },
  { numero: 23, titulo: "Sete ais aos escribas", slug: "ais-escribas", referencia_ancora: "Mateus 23:1-39", foco: "Hipocrisia, opressão e luto" },
  { numero: 24, titulo: "Discurso escatológico", slug: "discurso-escatologico", referencia_ancora: "Mateus 24:1-51", foco: "Medo do futuro, vigilância e sentido" },
  { numero: 25, titulo: "Parábolas finais", slug: "parabolas-finais", referencia_ancora: "Mateus 25:1-46", foco: "Preparação, talento e cuidado" },
  { numero: 26, titulo: "Última ceia e Getsêmani", slug: "ultima-ceia-getsemani", referencia_ancora: "Mateus 26:1-75", foco: "Traição, angústia e fidelidade frágil" },
  { numero: 27, titulo: "Paixão e crucificação", slug: "paixao-crucificacao", referencia_ancora: "Mateus 27:1-66", foco: "Abandono, injustiça e morte" },
  { numero: 28, titulo: "Ressurreição e missão", slug: "ressurreicao-missao", referencia_ancora: "Mateus 28:1-20", foco: "Medo, encontro e recomeço" },
];

export type JobEditorialMateus = {
  capitulo: CapituloMateus;
  tipo: TipoArtigoModulo;
  slug: string;
  categoria: string;
  tags: string[];
  referencia: string;
  tema: string;
};

export function getCapituloMateus(numero: number): CapituloMateus | undefined {
  return CAPITULOS_MATEUS.find((c) => c.numero === numero);
}

export function montarJobMateus(capitulo: CapituloMateus, tipo: TipoArtigoModulo): JobEditorialMateus {
  const slug = slugArtigoMateus(capitulo.numero, capitulo.slug, tipo);
  const tipoLabel =
    tipo === "principal"
      ? "decodificação principal"
      : tipo === "sofrimento"
        ? "foco em sofrimento humano"
        : "foco em florescimento humano";

  return {
    capitulo,
    tipo,
    slug,
    categoria: CATEGORIA_MATEUS,
    tags: [TAG_MODULO_MATEUS, tagCapituloMateus(capitulo.numero), TAG_TIPO[tipo]],
    referencia: capitulo.referencia_ancora,
    tema: `Mateus ${capitulo.numero} — ${capitulo.titulo} (${tipoLabel})`,
  };
}

/** Ordem de produção por capítulo: principal → sofrimento → florescimento */
export const ORDEM_TIPOS_POR_CAPITULO: TipoArtigoModulo[] = [
  "principal",
  "sofrimento",
  "florescimento",
];
