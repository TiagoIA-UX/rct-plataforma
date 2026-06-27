/**
 * Métricas de profundidade editorial NEUMA — sem LLM.
 * Detecta achatamento: estrutura ok, densidade perdida.
 */

export function contarPalavrasHtml(html) {
  const texto = (html ?? "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!texto) return 0;
  return texto.split(" ").filter(Boolean).length;
}

export function extrairMetricas(html) {
  const h = html ?? "";
  return {
    chars: h.length,
    palavras: contarPalavrasHtml(h),
    blockquotes: (h.match(/blockquote/gi) ?? []).length,
    h2: (h.match(/<h2/gi) ?? []).length,
    h3: (h.match(/<h3/gi) ?? []).length,
    listas: (h.match(/<[ou]l/gi) ?? []).length,
    tabelas: (h.match(/<table/gi) ?? []).length,
    citacoes_ano: (h.match(/\([12]\d{3}\)/g) ?? []).length,
    rotulo_estabelecida: (h.match(/\[(?:ESTABELECIDA|COMPROVADO PELA CIÊNCIA)\]/g) ?? []).length,
    rotulo_hipotese: (h.match(/\[HIPÓTESE\]|\[INTERPRETAÇÃO\]/g) ?? []).length,
    autores_citados: (h.match(/\b(Kandel|Lazar|Van der Kolk|LeDoux|Gross|Tedeschi|Göbel|McCraty|Newberg)\b/gi) ?? [])
      .length,
    versiculos: (h.match(/\b[A-Za-z]+ \d+:\d+/g) ?? []).length,
    numeros_concretos: (h.match(/\b\d{2,4}\b/g) ?? []).length,
  };
}

export function deltaMetricas(original, reescrito) {
  const o = extrairMetricas(original);
  const r = extrairMetricas(reescrito);
  const pct = (a, b) => (a === 0 ? (b === 0 ? 0 : 100) : Math.round(((b - a) / a) * 100));
  return {
    original: o,
    reescrito: r,
    delta_palavras_pct: pct(o.palavras, r.palavras),
    delta_blockquotes: r.blockquotes - o.blockquotes,
    delta_h3: r.h3 - o.h3,
    delta_citacoes: r.citacoes_ano - o.citacoes_ano,
    delta_autores: r.autores_citados - o.autores_citados,
    delta_numeros: r.numeros_concretos - o.numeros_concretos,
  };
}

/** Score heurístico 0-10 — reprova achatamento severo sem Groq. */
export function scoreProfundidadeHeuristico(delta, tipoEditorial = "sofrimento", htmlReescrito = "") {
  const { original: o, reescrito: r, delta_palavras_pct } = delta;
  let score = 10;
  const motivos = [];

  if (delta_palavras_pct <= -50) {
    score -= 4;
    motivos.push(`Perda severa de volume (${delta_palavras_pct}% palavras)`);
  } else if (delta_palavras_pct <= -25) {
    score -= 2;
    motivos.push(`Perda moderada de volume (${delta_palavras_pct}% palavras)`);
  }

  if (r.blockquotes < o.blockquotes && o.blockquotes >= 2) {
    score -= 1;
    motivos.push("Citações bíblicas/narrativas removidas");
  }

  if (r.h3 < o.h3 && o.h3 >= 3) {
    score -= 1;
    motivos.push("Subseções analíticas (h3) removidas");
  }

  if (r.citacoes_ano + r.rotulo_estabelecida < o.citacoes_ano + o.rotulo_estabelecida) {
    score -= 1;
    motivos.push("Rigor epistemológico/científico reduzido");
  }

  if (r.autores_citados < o.autores_citados) {
    score -= 1;
    motivos.push("Autores/referências específicas perdidas");
  }

  if (r.numeros_concretos < o.numeros_concretos - 2 && o.numeros_concretos >= 5) {
    score -= 1;
    motivos.push("Dados concretos (números, prontuário) simplificados");
  }

  if (r.palavras < 400 && o.palavras >= 800) {
    score -= 2;
    motivos.push("Texto reescrito abaixo do mínimo de densidade para o original");
  }

  if (tipoEditorial === "florescimento" && !/propósito|coragem|plenitude|significado|criatividade/i.test(htmlReescrito)) {
    score -= 1;
    motivos.push("Tipo florescimento: vocabulário de plenitude ausente");
  }

  score = Math.max(0, Math.min(10, score));
  return {
    profundidade_humana: score,
    aprovado: score >= 8,
    motivos,
  };
}

export function extrairTitulosH2(html) {
  return [...(html ?? "").matchAll(/<h2[^>]*>(.*?)<\/h2>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim()
  );
}
