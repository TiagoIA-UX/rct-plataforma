import type { NivelPublico } from "@/types/diagnostico";

/** Respostas públicas de evangelização — todos são bem-vindos ao conteúdo */
export const RESPOSTAS_RESSONANCIA: Record<
  NivelPublico,
  { titulo: string; paragrafo: string; cta: string; acao: string }
> = {
  alto: {
    titulo: "Sua frequência ressoa com esta missão.",
    paragrafo: `Sua busca é genuína e sua consciência está em calibragem.
Este espaço foi construído para quem já recusou o misticismo vazio
e busca a ciência que confirma a espiritualidade pura.
Explore o blog — comece pelos milagres decodificados.
O treinamento avançado é para poucos, mas o caminho é para todos.`,
    cta: "Explorar os Milagres Decodificados",
    acao: "BLOG_MILAGRES + MANIFESTO",
  },
  medio: {
    titulo: "O processo está em curso.",
    paragrafo: `Toda argila passa pelo forno do oleiro antes de se tornar vaso.
O conteúdo público desta plataforma existe para este momento —
quando a busca pela verdade ainda está encontrando sua linguagem.
Explore os artigos. A frequência se clarifica com o tempo.`,
    cta: "Explorar o Blog",
    acao: "BLOG_PUBLICO",
  },
  baixo: {
    titulo: "Bem-vindo ao início do caminho.",
    paragrafo: `Cada ser tem seu tempo. Este espaço oferece evangelização científica —
a convergência entre Bíblia, Patanjali e neurociência verificável.
Sem dogma, sem fábula. Comece pelo que ressoar em você.`,
    cta: "Conhecer a RCT",
    acao: "BLOG_PUBLICO",
  },
};
