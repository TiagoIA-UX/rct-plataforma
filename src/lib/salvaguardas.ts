/** Protocolo Mestre Divino v2.0 — Seção 0: Salvaguardas Fundamentais */

/**
 * Cláusula anti-superioridade — exibida em artigos que mencionem herança, linhagem
 * ou termos de biologia comportamental. Protege contra interpretações racistas.
 * Nota: a herança transgeracional em humanos é hipótese em investigação científica,
 * não fato estabelecido — este aviso reflete essa precisão.
 */
export const CLAUSULA_EPIGENETICA = `⚠️ Nota científica: estudos sobre herança transgeracional em humanos são preliminares e ainda não replicados em escala — trata-se de hipótese em investigação, não de fato científico estabelecido. Além disso, nenhuma origem, etnia, raça ou linhagem confere superioridade. O caminho da transformação se ativa pela prática, não pelo nascimento.`;

/**
 * Texto de transparência do questionário — LGPD/GDPR.
 * Descreve o que realmente acontece: scoring sobre respostas
 * do próprio usuário, não rastreamento passivo de leitura.
 */
export const TEXTO_TRANSPARENCIA_RESSONANCIA =
  "O questionário calcula uma pontuação de compatibilidade apenas a partir das respostas que você preencher — nenhum dado de navegação ou padrão de leitura é coletado. Se você receber um convite, será com base no que declarou aqui, com seu consentimento. Nenhum dado pessoal identificável é armazenado ou compartilhado.";

export const AVISO_LEITURA_COMPLEMENTAR =
  "Esta é uma leitura extra, não um substituto da sua fé — uma leitura possível e fundamentada, não a única verdade.";

/**
 * Frase de encerramento dos artigos — convite à prática.
 * Contexto cristão: o ensinamento aponta para O Caminho, não substitui.
 */
export const FRASE_AUTONOMIA_PLATAFORMA =
  "Este ensinamento aponta para O Caminho. A prática é sua.";

export const DECLARACAO_CONTRIBUIDOR =
  "Contribuo com intenção construtiva, sem impor minha verdade sobre os outros. Aceito que minha contribuição seja revisada e eventualmente não publicada, sem ressentimento.";

/** Categorias que exigem revisão humana antes de publicação — Salvaguarda 0.7 */
export const CATEGORIAS_REVISAO_HUMANA = new Set([
  "prompts-do-mestre",
  "epigenetica-sagrada",
]);

/**
 * Salvaguarda 0.8 — Protocolo de Aceitação Geral (Eixo Neuroteologia).
 * Todo conteúdo mostra o Caminho do aperfeiçoamento pela meditação e atenção plena
 * COM COMPROVAÇÃO CIENTÍFICA, sempre referenciado biblicamente e ancorado na tradição
 * contemplativa cristã (oração contemplativa, lectio divina, oração do coração,
 * respiração unida à oração). Yoga e tradições orientais entram apenas como comparação
 * rotulada — nunca como caminho primário, e Jesus nunca é descrito como yogue/Samadhi.
 * Objetivo: máxima aceitação do público cristão sem sincretismo (cf. CDF, 1989).
 */
export const PRINCIPIO_NEUROTEOLOGIA =
  "A RCT mostra o Caminho do aperfeiçoamento pela meditação e atenção plena com comprovação científica, referenciado biblicamente e ancorado na tradição contemplativa cristã. Outras tradições entram apenas como comparação rotulada — nunca como caminho primário.";

const PADROES_JESUS_YOGUE = [
  /jesus[^.\n]{0,60}\b(yogue|yogui|iogue)\b/i,
  /jesus[^.\n]{0,60}\bsamadhi\b/i,
  /\b(yogue|yogui|iogue)\b[^.\n]{0,40}\bjesus\b/i,
  /jesus[^.\n]{0,40}\b(dharana|dhyana)\b/i,
];

/** Detecta descrição direta de Jesus como yogue/Samadhi (proibida pela Salvaguarda 0.8). */
export function descreveJesusComoYogue(texto: string): boolean {
  return PADROES_JESUS_YOGUE.some((re) => re.test(texto));
}

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
