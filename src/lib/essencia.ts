import { IMAGENS } from "@/lib/imagens";
import { RCT_DESCRICAO_PADRAO } from "@/lib/identidade";
import { REFS } from "@/lib/referencias";

/** Textos públicos da essência RCT — ciência do comportamento a serviço da fé vivida. */

export const ESSENCIA_PLATAFORMA = {
  titulo: "Tradição cristã e ciência do comportamento",
  texto: `A RCT é um espaço aberto para quem caminha com o Evangelho e busca coerência entre
crença e experiência vivida. Os artigos conversam com estudos publicados sobre como o cérebro
muda com a prática, controle das emoções, formação de hábitos e vínculos sociais — temas
centrais da ciência do comportamento — sempre com referência explícita ao autor e ao periódico.
A formação reservada existe para quem se inscreve, é acolhido e permanece fiel por um tempo.`,
};

export type SecaoCaminho = {
  id: string;
  titulo: string;
  conteudo: string;
  ref: string | null;
  imagem?: string;
  creditoImagem?: string;
};

export const SECOES_CAMINHO: SecaoCaminho[] = [
  {
    id: "espaco",
    titulo: "Um espaço de paz",
    conteudo: `Muitas pessoas sentem que a fé e a experiência do corpo falam línguas diferentes.
Este site acolhe essa tensão com serenidade: convida à leitura pacífica dos textos sagrados
à luz do que a ciência do comportamento já registrou sobre emoção, memória e relação.`,
    ref: null,
    imagem: IMAGENS.formacao.src,
    creditoImagem: IMAGENS.formacao.credito,
  },
  {
    id: "fe-ciencia",
    titulo: "Memória, crença e mudança",
    conteudo: `O cérebro se reorganiza ao longo da vida (Kandel, 2006). Isso não substitui a graça —
mas ajuda a compreender como escolhas repetidas, oração e reflexão podem deixar marcas
duradouras no modo de viver.`,
    ref: `Estudo publicado: ${REFS.neuroplasticidade}`,
    imagem: IMAGENS.blog.src,
    creditoImagem: IMAGENS.blog.credito,
  },
  {
    id: "ahimsa",
    titulo: "Paz e não-violência",
    conteudo: `Cuidar da vida em pensamento, palavra e ação é princípio do Evangelho e de tradições
antigas de não-violência. A plataforma pratica isso no tom: respeito, transparência nas fontes
e convite em vez de imposição.`,
    ref: null,
    imagem: IMAGENS.comunidade.src,
    creditoImagem: IMAGENS.comunidade.credito,
  },
  {
    id: "evangelho",
    titulo: "O Evangelho e o comportamento",
    conteudo: `Os relatos de transformação no Novo Testamento envolvem presença segura, palavras
que acolhem e mudança de conduta. O controle das emoções — como a mente regula afeto e impulso
(Gross, 1998) — oferece linguagem científica para refletir sobre esses relatos sem reduzir
o mistério da fé.`,
    ref: `Estudo publicado: ${REFS.regulacao}`,
    imagem: IMAGENS.milagres.src,
    creditoImagem: IMAGENS.milagres.credito,
  },
  {
    id: "comunidade",
    titulo: "Comunidade e vínculo",
    conteudo: `A caridade em rede nasce do cuidado mútuo. Vários estudos reunidos em saúde pública
associam laços sociais estáveis a maior bem-estar e longevidade (Holt-Lunstad et al., 2010) —
um elo entre ciência das relações e a vida comunitária que o Evangelho sempre valorizou.`,
    ref: `Estudo publicado: ${REFS.vinculos}`,
    imagem: IMAGENS.contribuir.src,
    creditoImagem: IMAGENS.contribuir.credito,
  },
  {
    id: "convite",
    titulo: "Fique à vontade",
    conteudo: `Todo o blog e este caminho são abertos. O questionário é opcional e ajuda a
sugerir leituras. Quem desejar apoiar financeiramente encontra a doação via PIX na página
Contribuir. A formação reservada é oferecida depois de inscrição e acolhimento.`,
    ref: null,
  },
];

/** Re-export para compatibilidade em páginas que usam descrição curta */
export const ESSENCIA_DESCRICAO = RCT_DESCRICAO_PADRAO;
