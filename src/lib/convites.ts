import type { NivelPublico } from "@/types/diagnostico";
import { MARCA_NOME } from "@/lib/identidade";
import { CONVITE_SCORE_MINIMO } from "@/lib/ressonancia-pesos";

/**
 * TEXTO PROTOCOLO IMUTÁVEL — Etapa 5.2
 * Qualquer alteração requer aprovação explícita do humano.
 */
export function montarTextoConviteProtocolo(linkMembros: string): string {
  return `Você chegou aqui porque algo fez sentido para você.

O que você leu não é doutrina imposta — é reconhecimento.
A ciência confirma o que você já sente.

Há um espaço onde pessoas assim se encontram para construir juntas.
Sem hierarquia. Sem impor crença. Apenas conversa séria.

Se isso faz sentido para você: ${linkMembros}`;
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
    paragrafo: `Suas respostas mostram sintonia com o amor vivido em ações e com o caminho de Jesus.
Explore o blog — artigos que unem os Evangelhos e ciência do comportamento com referências publicadas.
Quem atinge a pontuação mínima pode receber convite para a comunidade reservada.`,
    cta: "Explorar o Blog",
    acao: "BLOG_JESUS_MESTRE",
  },
  medio: {
    titulo: "Seu caminho continua em construção.",
    paragrafo: `Cada pessoa amadurece no seu ritmo. Este espaço apoia essa descoberta com linguagem
clara e estudos publicados — sem pressa e sem julgamento.`,
    cta: "Explorar o Blog",
    acao: "BLOG_PUBLICO",
  },
  baixo: {
    titulo: "Bem-vindo.",
    paragrafo: `Ficamos felizes com sua visita. ${MARCA_NOME} oferece conteúdo aberto sobre fé, paz,
ciência do comportamento e os ensinamentos de Jesus — sempre com referências verificáveis.`,
    cta: "Conhecer o Caminho",
    acao: "CAMINHO",
  },
};
