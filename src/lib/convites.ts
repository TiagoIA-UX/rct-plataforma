import type { NivelPublico } from "@/types/diagnostico";

/** Respostas públicas — linguagem acolhedora, sem julgamento */
export const RESPOSTAS_RESSONANCIA: Record<
  NivelPublico,
  { titulo: string; paragrafo: string; cta: string; acao: string }
> = {
  alto: {
    titulo: "Obrigado por compartilhar sua jornada.",
    paragrafo: `Suas respostas mostram uma busca sincera por sentido. Aqui você encontra textos
que unem tradição cristã e neurociência comportamental — neuroplasticidade, regulação emocional,
hábitos e vínculos sociais — com referência ao autor em cada ensinamento.
Explore o blog; comece pelos relatos dos evangelhos em linguagem acessível.
A formação reservada é oferecida depois de inscrição e acolhimento — não aparece no menu público.`,
    cta: "Explorar o Blog",
    acao: "BLOG_MILAGRES + CAMINHO",
  },
  medio: {
    titulo: "Seu caminho continua em construção.",
    paragrafo: `Cada pessoa amadurece no seu ritmo. Este espaço apoia essa descoberta com linguagem
clara e estudos publicados sobre memória e regulação emocional — sem pressa e sem julgamento.
Leia no seu tempo o que fizer sentido para você hoje.`,
    cta: "Explorar o Blog",
    acao: "BLOG_PUBLICO",
  },
  baixo: {
    titulo: "Bem-vindo.",
    paragrafo: `Ficamos felizes com sua visita. A RCT oferece conteúdo aberto sobre fé, paz e
neurociência comportamental — com fontes da tradição cristã e referências científicas
publicadas, em tom respeitoso.
Comece pelo tema que mais tocar você neste momento.`,
    cta: "Conhecer a Plataforma",
    acao: "BLOG_PUBLICO",
  },
};
