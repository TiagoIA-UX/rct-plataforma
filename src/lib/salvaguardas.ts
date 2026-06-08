/** Protocolo Mestre Divino v2.0 — Seção 0: Salvaguardas Fundamentais */

export const CLAUSULA_EPIGENETICA = `A herança epigenética indica potencial — nunca superioridade. O código se ativa pela prática de Ahimsa: não por origem, etnia, cultura ou linhagem familiar. Nenhuma raça, povo ou tradição detém monopólio sobre a sabedoria. Alguém de qualquer origem pode ativar o código.`;

export const TEXTO_TRANSPARENCIA_RESSONANCIA =
  "Esta plataforma observa padrões de leitura para identificar ressonância com seus princípios. Se você recebeu um convite, foi porque seu comportamento de leitura indicou alinhamento com Ahimsa e ciência aplicada. Nenhum dado pessoal identificável é armazenado ou compartilhado.";

export const AVISO_LEITURA_COMPLEMENTAR =
  "Esta é uma leitura complementar, nunca substitutiva — uma leitura possível e fundamentada, não a única verdade.";

export const FRASE_AUTONOMIA_PLATAFORMA =
  "O objetivo deste ensinamento é tornar-se desnecessário para você.";

export const DECLARACAO_CONTRIBUIDOR =
  "Contribuo com intenção construtiva, sem violência intelectual. Aceito que minha contribuição seja revisada e eventualmente não publicada, sem ressentimento.";

/** Categorias que exigem revisão humana antes de publicação — Salvaguarda 0.7 */
export const CATEGORIAS_REVISAO_HUMANA = new Set([
  "prompts-do-mestre",
  "epigenetica-sagrada",
]);

const PADROES_RISCO_EPIGENETICO = [
  /linhagem\s+(superior|pura|escolhida)/i,
  /ra[çc]a\s+superior/i,
  /sangue\s+puro/i,
  /povo\s+eleito\s+por\s+(origem|sangue|gen)/i,
  /superioridade\s+(racial|étnica|genética)/i,
];

export function conteudoEpigeneticoSuspeito(texto: string): boolean {
  return PADROES_RISCO_EPIGENETICO.some((re) => re.test(texto));
}

export function exigeClausulaEpigenetica(texto: string, categoria?: string): boolean {
  const blob = texto.toLowerCase();
  const mencionaEpigenetica =
    blob.includes("epigen") || blob.includes("linhagem") || categoria === "epigenetica-sagrada";
  return mencionaEpigenetica;
}

export function validarSalvaguardaEpigenetica(texto: string): {
  ok: boolean;
  motivo?: string;
} {
  if (conteudoEpigeneticoSuspeito(texto)) {
    return {
      ok: false,
      motivo: "Texto sugere superioridade por origem — bloqueado pela Salvaguarda 0.1.",
    };
  }
  if (exigeClausulaEpigenetica(texto) && !texto.includes("nunca superioridade")) {
    return {
      ok: false,
      motivo: "Conteúdo epigenético sem cláusula anti-superioridade obrigatória.",
    };
  }
  return { ok: true };
}
