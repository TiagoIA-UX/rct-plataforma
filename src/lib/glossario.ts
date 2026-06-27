/**
 * Glossário NEUMA — links de dicionário para termos técnicos / pouco comuns.
 *
 * Por que existe: artigos cruzam neurociência, teologia e história, com termos
 * que muitos leitores não conhecem. Em vez de definir cada um no corpo do texto,
 * a primeira ocorrência de cada termo vira um link discreto para um dicionário
 * confiável, abrindo em nova aba.
 *
 * Dicionário padrão: Priberam (https://dicionario.priberam.org) — referência
 * gratuita, sem login, da língua portuguesa. Configurável via DICIONARIO_BASE.
 *
 * Regras (ver .cursor/rules/glossario-neuma.mdc):
 * - Link só na PRIMEIRA ocorrência de cada termo, por artigo.
 * - Nunca linkar dentro de <a>, títulos (<h1>-<h6>), <code>, <pre> ou atributos.
 * - Preferir verbetes de palavra única (o que o dicionário resolve bem).
 * - O link é complemento de leitura — não substitui rótulos epistêmicos.
 */

/** Base do dicionário. Priberam aceita /<palavra> diretamente. */
export const DICIONARIO_BASE = "https://dicionario.priberam.org/";
export const DICIONARIO_NOME = "Dicionário Priberam";

type TermoGlossario = {
  /** Termo como aparece no texto (sem acento é tratado pela normalização da busca). */
  termo: string;
  /** Verbete a consultar no dicionário (default: o próprio termo, 1ª palavra). */
  verbete?: string;
  /** Definição curta para o tooltip (title). */
  dica: string;
};

/**
 * Termos técnicos / pouco comuns no âmbito social.
 * Ordem por especificidade (mais longos primeiro) para casar antes dos curtos.
 */
export const TERMOS_GLOSSARIO: TermoGlossario[] = [
  { termo: "neuroplasticidade", dica: "capacidade do cérebro de se reorganizar formando novas conexões." },
  { termo: "neuroplástico", dica: "relativo à neuroplasticidade." },
  { termo: "neuroteologia", dica: "estudo das bases neurais da experiência religiosa e espiritual." },
  { termo: "epigenética", dica: "estudo de como o ambiente e os hábitos ativam ou silenciam genes, sem alterar o DNA." },
  { termo: "epigenético", dica: "relativo à epigenética." },
  { termo: "psicossomática", dica: "relação entre processos da mente e sintomas do corpo." },
  { termo: "psicossomático", dica: "relativo à psicossomática." },
  { termo: "homeostase", dica: "equilíbrio interno que o organismo mantém de forma automática." },
  { termo: "telômeros", verbete: "telómero", dica: "extremidades dos cromossomos ligadas ao envelhecimento celular." },
  { termo: "cortisol", dica: "hormônio liberado em situações de estresse." },
  { termo: "dopamina", dica: "neurotransmissor ligado à motivação e à recompensa." },
  { termo: "serotonina", dica: "neurotransmissor ligado ao humor e ao bem-estar." },
  { termo: "amígdala", dica: "região cerebral central no processamento do medo e das emoções." },
  { termo: "hipocampo", dica: "região cerebral essencial para a memória e o aprendizado." },
  { termo: "hipotálamo", dica: "região cerebral que regula hormônios e funções vitais." },
  { termo: "neurotransmissor", dica: "substância que transmite sinais entre os neurônios." },
  { termo: "neurônios", verbete: "neurónio", dica: "células do sistema nervoso que transmitem informação." },
  { termo: "resiliência", dica: "capacidade de se recuperar e se adaptar diante da adversidade." },
  { termo: "hipérbole", dica: "figura de linguagem que exagera intencionalmente para enfatizar." },
  { termo: "etimologia", dica: "estudo da origem e da história das palavras." },
  { termo: "decálogo", dica: "conjunto dos dez mandamentos; por extensão, dez princípios." },
  { termo: "mordomia", dica: "administração responsável de algo que pertence a outro." },
  { termo: "temperança", dica: "moderação e domínio sobre os próprios impulsos." },
  { termo: "contemplativa", dica: "voltada à atenção plena, à meditação e ao silêncio interior." },
  { termo: "contemplativo", dica: "relativo à contemplação e à meditação." },
  { termo: "inflamatórios", verbete: "inflamatório", dica: "relativo à inflamação, resposta de defesa do corpo." },
];

const RE_TAG = /<[^>]+>/;
/** Tags dentro das quais NÃO linkamos (texto sensível ou já interativo). */
const TAGS_BLOQUEIO = new Set(["a", "h1", "h2", "h3", "h4", "h5", "h6", "code", "pre"]);

function escaparRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escaparHtmlAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlVerbete(t: TermoGlossario): string {
  const v = (t.verbete ?? t.termo).trim().split(/\s+/)[0];
  return DICIONARIO_BASE + encodeURIComponent(v);
}

function anchor(t: TermoGlossario, original: string): string {
  const href = urlVerbete(t);
  const title = escaparHtmlAttr(`${t.dica} (abre no ${DICIONARIO_NOME})`);
  return (
    `<a class="termo-glossario" href="${href}" target="_blank" rel="noopener noreferrer external"` +
    ` title="${title}" data-glossario="${escaparHtmlAttr(t.termo)}">${original}</a>`
  );
}

/**
 * Insere links de dicionário na PRIMEIRA ocorrência de cada termo do glossário,
 * processando apenas nós de texto fora de tags bloqueadas. Robusto a HTML com
 * tags aninhadas; nunca mexe em atributos nem dentro de <a>/<code>/títulos.
 */
export function linkarTermosTecnicos(html: string): string {
  if (!html) return html;

  // Termos ainda não usados neste artigo (1 link por termo).
  const pendentes = [...TERMOS_GLOSSARIO].sort((a, b) => b.termo.length - a.termo.length);
  const jaUsado = new Set<string>();

  // Tokeniza em tags e texto, mantendo a pilha de tags abertas.
  const pilha: string[] = [];
  let resultado = "";
  let resto = html;

  while (resto.length > 0) {
    const m = RE_TAG.exec(resto);
    if (!m) {
      resultado += processarTexto(resto, pilha, pendentes, jaUsado);
      break;
    }
    const idx = m.index;
    if (idx > 0) {
      resultado += processarTexto(resto.slice(0, idx), pilha, pendentes, jaUsado);
    }
    const tag = m[0];
    resultado += tag;
    atualizarPilha(tag, pilha);
    resto = resto.slice(idx + tag.length);
  }

  return resultado;
}

function atualizarPilha(tag: string, pilha: string[]): void {
  const fechamento = /^<\s*\/\s*([a-zA-Z0-9]+)/.exec(tag);
  if (fechamento) {
    const nome = fechamento[1].toLowerCase();
    for (let i = pilha.length - 1; i >= 0; i--) {
      if (pilha[i] === nome) {
        pilha.splice(i, 1);
        break;
      }
    }
    return;
  }
  const abertura = /^<\s*([a-zA-Z0-9]+)([^>]*)>/.exec(tag);
  if (abertura) {
    const nome = abertura[1].toLowerCase();
    const autoFecha = /\/\s*>$/.test(tag);
    if (!autoFecha) pilha.push(nome);
  }
}

function dentroDeBloqueio(pilha: string[]): boolean {
  return pilha.some((t) => TAGS_BLOQUEIO.has(t));
}

function processarTexto(
  texto: string,
  pilha: string[],
  pendentes: TermoGlossario[],
  jaUsado: Set<string>
): string {
  if (dentroDeBloqueio(pilha) || !texto.trim()) return texto;

  // Varredura única da esquerda para a direita SOBRE O TEXTO ORIGINAL.
  // Os anchors vão direto para a saída e nunca são re-escaneados — assim um
  // termo nunca casa dentro de um link já inserido (href/title/etc.).
  let saida = "";
  let cursor = 0;

  while (cursor < texto.length) {
    let melhor: { t: TermoGlossario; index: number; original: string } | null = null;

    for (const t of pendentes) {
      if (jaUsado.has(t.termo)) continue;
      const re = new RegExp(`(?<![\\p{L}-])(${escaparRegex(t.termo)})(?![\\p{L}-])`, "giu");
      re.lastIndex = cursor;
      const m = re.exec(texto);
      if (!m) continue;
      const melhorAtual =
        !melhor ||
        m.index < melhor.index ||
        (m.index === melhor.index && m[1].length > melhor.original.length);
      if (melhorAtual) melhor = { t, index: m.index, original: m[1] };
    }

    if (!melhor) {
      saida += texto.slice(cursor);
      break;
    }

    saida += texto.slice(cursor, melhor.index);
    saida += anchor(melhor.t, melhor.original);
    jaUsado.add(melhor.t.termo);
    cursor = melhor.index + melhor.original.length;
  }

  return saida;
}
