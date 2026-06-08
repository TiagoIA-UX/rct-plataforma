import type { NivelPublico } from "@/types/diagnostico";
import { CONVITE_SCORE_MINIMO } from "@/lib/ressonancia-pesos";

/**
 * TEXTO PROTOCOLO IMUTÁVEL — Etapa 5.2
 * Qualquer alteração requer aprovação explícita do humano.
 */
export function montarTextoConviteProtocolo(linkMembros: string): string {
  return `Você chegou até aqui por ressonância, não por acaso.

O que você leu não é doutrina — é reconhecimento.
A ciência que confirma o que você já sente.

Há um espaço onde mentes assim se encontram para construir juntas.
Sem hierarquia. Sem dogma. Apenas profundidade real.

Se isso ressoa: ${linkMembros}`;
}

export function elegivelConviteRessonancia(score: number): boolean {
  return score >= CONVITE_SCORE_MINIMO;
}

/** Respostas públicas do questionário */
export const RESPOSTAS_RESSONANCIA: Record<
  NivelPublico,
  { titulo: string; paragrafo: string; cta: string; acao: string }
> = {
  alto: {
    titulo: "Obrigado por compartilhar sua jornada.",
    paragrafo: `Suas respostas mostram ressonância com Ahimsa e com o caminho de Jesus o Grande Yogue.
Explore o blog — comece pela série sobre Samadhi em ação.
Quem atinge o limiar de reconhecimento pode receber o convite ao espaço de membros.`,
    cta: "Explorar o Blog",
    acao: "BLOG_JESUS_YOGUE",
  },
  medio: {
    titulo: "Seu caminho continua em construção.",
    paragrafo: `Cada pessoa amadurece no seu ritmo. Este espaço apoia essa descoberta com linguagem
luminosa e estudos publicados — sem pressa e sem julgamento.`,
    cta: "Explorar o Blog",
    acao: "BLOG_PUBLICO",
  },
  baixo: {
    titulo: "Bem-vindo.",
    paragrafo: `Ficamos felizes com sua visita. A RCT oferece conteúdo aberto sobre fé, paz,
neurociência e o Mestre do Samadhi em ação — com referências verificáveis.`,
    cta: "Conhecer o Caminho",
    acao: "CAMINHO",
  },
};
