/**
 * Referências citadas na interface — estudos com publicação revisada por pares.
 * O site prioriza o que já possui base empírica replicada; outras linhas de pesquisa
 * podem ser incorporadas quando houver evidência suficiente para citação pública.
 */
export const REFS = {
  neuroplasticidade:
    "Kandel, E. (2006). In Search of Memory — neuroplasticidade sináptica (Prêmio Nobel de Medicina 2000).",
  prefrontal:
    "LeDoux, J. (1996). The Emotional Brain — regulação entre amígdala e córtex pré-frontal.",
  regulacao:
    "Gross, J.J. (1998). Review of General Psychology — estratégias de regulação emocional.",
  habitos:
    "Lally, P. et al. (2010). European Journal of Social Psychology — formação e consolidação de hábitos.",
  vinculos:
    "Holt-Lunstad, J. et al. (2010). PLoS Medicine — vínculos sociais e saúde (meta-análise).",
  sono:
    "Walker, M. (2017). Why We Sleep — repouso e recuperação cerebral.",
} as const;

export function citacao(ref: keyof typeof REFS): string {
  return `Estudo publicado: ${REFS[ref]}`;
}
