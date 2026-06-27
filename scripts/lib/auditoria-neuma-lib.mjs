/**
 * Auditoria programática NEUMA — Fase 1 e verificação estrutural (Fase 3).
 */

export const SECOES_CANONICAS = [
  { id: "A", re: /(?:^|[>]\s*(?:A\.\s*)?)O que aconteceu/i, label: "O que aconteceu?" },
  {
    id: "B",
    re: /O que isso revela sobre (?:a condi[cç][aã]o humana|o ser humano)/i,
    label: "O que isso revela sobre a condição humana?",
  },
  { id: "C", re: /Leitura neurocomportamental/i, label: "Leitura neurocomportamental" },
  { id: "D", re: /M[úu]ltiplas lentes/i, label: "Múltiplas lentes interpretativas" },
  { id: "E", re: /O que posso fazer hoje/i, label: "O que posso fazer hoje?" },
  { id: "F", re: /Esperan[çc]a respons[áa]vel/i, label: "Esperança responsável" },
];

export const TERMOS_LEGADOS = [
  /\b(yogue|yogui|iogue)\b/gi,
  /\bsamadhi\b/gi,
  /\bdharana\b/gi,
  /\bdhyana\b/gi,
  /\bgrande[- ]yogue\b/gi,
  /jesus[^.\n]{0,80}\b(yogue|yogui|iogue|samadhi)\b/gi,
];

export const PADROES_DOGMATICOS = [
  { re: /é\s+(a\s+)?verdade\s+absoluta/i, tipo: "dogmatismo" },
  { re: /sem\s+d[úu]vida\s+alguma/i, tipo: "dogmatismo" },
  { re: /provado\s+definitivamente/i, tipo: "afirmacao_sem_evidencia" },
  { re: /a\s+ci[eê]ncia\s+comprova\s+que\s+deus/i, tipo: "viés_cientificista" },
  { re: /(cura|transforma[cç][aã]o)\s+garantida/i, tipo: "promessa_cura" },
  { re: /você\s+(está|estará)\s+condenad[oa]/i, tipo: "fatalismo" },
  { re: /nunca\s+(poderá|vai\s+poder)\s+(mudar|transformar)/i, tipo: "fatalismo" },
];

export const FRASE_GUIA =
  "O cérebro muda. A consciência se expande. A vida pode ser transformada.";
export const FRASE_ESPERANCA = "Você não está condenado a permanecer como está.";

export function extrairMatches(texto, regex) {
  const flags = regex.flags.includes("g") ? regex.flags : `${regex.flags}g`;
  const re = new RegExp(regex.source, flags);
  const out = [];
  let m;
  while ((m = re.exec(texto)) !== null) {
    out.push(m[0]);
    if (!flags.includes("g")) break;
  }
  return [...new Set(out.map((s) => s.trim()))];
}

export function verificarSecoes(html) {
  return SECOES_CANONICAS.map((s) => ({
    id: s.id,
    label: s.label,
    presente: s.re.test(html),
  }));
}

export function auditarArtigo(artigo) {
  const html = artigo.conteudo_html ?? "";
  const cab = `${artigo.titulo}\n${artigo.subtitulo ?? ""}`;
  const blob = `${cab}\n${html}`;

  const termosLegados = TERMOS_LEGADOS.flatMap((re) => extrairMatches(blob, re));
  const secoes = verificarSecoes(html);
  const secoesFaltando = secoes.filter((s) => !s.presente).map((s) => s.label);
  const achados = [];

  if (termosLegados.length) {
    achados.push({
      severidade: "critica",
      tipo: "termo_legado",
      detalhe: termosLegados.join(", "),
    });
  }

  if (secoesFaltando.length) {
    achados.push({
      severidade: "alta",
      tipo: "estrutura_incompleta",
      detalhe: `Faltam ${secoesFaltando.length}/6 seções: ${secoesFaltando.join("; ")}`,
    });
  }

  if (!html.includes(FRASE_GUIA)) {
    achados.push({
      severidade: "media",
      tipo: "frase_guia_ausente",
      detalhe: "Frase-guia NEUMA ausente",
    });
  }

  if (!html.includes(FRASE_ESPERANCA)) {
    achados.push({
      severidade: "media",
      tipo: "esperanca_ausente",
      detalhe: "Esperança responsável ausente",
    });
  }

  for (const { re, tipo } of PADROES_DOGMATICOS) {
    if (re.test(blob)) {
      achados.push({ severidade: "alta", tipo, detalhe: re.source });
    }
  }

  const citacoesCientificas = (html.match(/\([12]\d{3}\)/g) ?? []).length;
  const rotulosEpistemicos = (html.match(/\[(COMPROVADO PELA CIÊNCIA|ESTABELECIDA|HIPÓTESE|INTERPRETAÇÃO)\]/g) ?? []).length;
  if (citacoesCientificas > 0 && rotulosEpistemicos === 0) {
    achados.push({
      severidade: "media",
      tipo: "rotulos_epistemicos_ausentes",
      detalhe: "Citações sem distinção [COMPROVADO PELA CIÊNCIA]/[HIPÓTESE]/[INTERPRETAÇÃO]",
    });
  }

  const precisaReescrita =
    termosLegados.length > 0 || secoesFaltando.length > 0 || achados.some((a) => a.severidade === "critica");

  return {
    slug: artigo.slug,
    titulo: artigo.titulo,
    categoria: artigo.categoria,
    secoes,
    secoes_ok: secoesFaltando.length === 0,
    termos_legados: termosLegados,
    achados,
    precisa_reescrita: precisaReescrita,
    chars: html.length,
  };
}

export function validarEstruturaNeuma(titulo, html) {
  const erros = [];
  const cab = titulo;
  if (TERMOS_LEGADOS.some((re) => re.test(cab))) {
    erros.push("Título contém termo legado");
  }
  const secoes = verificarSecoes(html);
  for (const s of secoes.filter((x) => !x.presente)) {
    erros.push(`Seção ausente: ${s.label}`);
  }
  if (!html.includes(FRASE_GUIA)) erros.push("Frase-guia ausente");
  if (!html.includes(FRASE_ESPERANCA)) erros.push("Esperança responsável ausente");
  if (TERMOS_LEGADOS.some((re) => re.test(html))) {
    erros.push("Corpo contém termo legado");
  }
  return { ok: erros.length === 0, erros };
}

export function mediaScore(scores) {
  const vals = Object.values(scores).filter((v) => typeof v === "number");
  if (!vals.length) return 0;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}

export function scoreAprovado(scores, minimo = 8) {
  const dims = [
    "clareza",
    "aplicabilidade",
    "rigor",
    "esperanca",
    "transformacao_humana",
    "profundidade_humana",
  ];
  return dims.every((d) => (scores[d] ?? 0) >= minimo);
}
