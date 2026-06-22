#!/usr/bin/env node
/**
 * Biblioteca Editorial NEUMA — pipeline completo (5 fases).
 *
 * NÃO fazer commit/push/deploy antes da conclusão e aprovação do relatório.
 *
 * Uso:
 *   node scripts/biblioteca-neuma.mjs --fase audit          # Fase 1 — relatório
 *   node scripts/biblioteca-neuma.mjs --fase agentes        # Auditoria dos prompts
 *   node scripts/biblioteca-neuma.mjs --fase full           # Fases 1-4 completas
 *   node scripts/biblioteca-neuma.mjs --fase rewrite        # Só reescrita (Fase 2)
 *   node scripts/biblioteca-neuma.mjs --slug paulo-espinho-na-carne-ciencia-e-biblia
 *   node scripts/biblioteca-neuma.mjs --min-score 8 --max-retries 2
 */

import { readFileSync, existsSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";
import Groq from "groq-sdk";
import { PrismaClient } from "@prisma/client";
import {
  auditarArtigo,
  validarEstruturaNeuma,
  mediaScore,
  scoreAprovado,
  FRASE_GUIA,
  FRASE_ESPERANCA,
} from "./lib/auditoria-neuma-lib.mjs";

const ROOT = resolve(".");
const AGENTS_DIR = join(ROOT, "src/lib/prompts/agents");
const REPORTS_DIR = join(ROOT, "docs/editorial");
const PAUSA_MS = 35000;
const MAX_RETRIES = 4;
const LEGADO_RX = /\b(yogue|yogui|iogue|samadhi|dharana|dhyana|grande[- ]yogue)\b/i;

function modelRedator() {
  return process.env.GROQ_MODEL ?? "llama-3.3-70b-versatile";
}
function modelAux() {
  return process.env.GROQ_MODEL_AUX ?? "llama-3.1-8b-instant";
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadEnv() {
  const path = resolve(".env.local");
  if (!existsSync(path)) {
    console.error("Configure .env.local com DATABASE_URL e GROQ_API_KEY");
    process.exit(1);
  }
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) process.env[t.slice(0, i)] = t.slice(i + 1);
  }
}

function readAgent(name) {
  return readFileSync(join(AGENTS_DIR, name), "utf-8");
}

function readFile(rel) {
  return readFileSync(join(ROOT, rel), "utf-8");
}

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : null;
}

function formatarFonte(f) {
  if (typeof f === "string") return f;
  if (f && typeof f === "object") {
    const fonte = f.fonte ?? f.autor ?? "";
    const desc = f.descricao ?? f.titulo ?? "";
    return desc ? `${fonte} — ${desc}` : String(fonte);
  }
  return String(f);
}

function normalizarTitulosSecoes(html) {
  return html
    .replace(/<h2>\s*[A-F]\.\s*/gi, "<h2>")
    .replace(/<h2>\s*(\d+)\.\s*/gi, "<h2>");
}

function garantirEncerramentoNeuma(html) {
  let out = html;
  if (!out.includes(FRASE_GUIA) || !out.includes(FRASE_ESPERANCA)) {
    const bloco = `<p>${FRASE_GUIA} ${FRASE_ESPERANCA}</p>`;
    if (/Esperan[çc]a respons[áa]vel/i.test(out)) {
      out = out.replace(
        /(<h2>\s*Esperan[çc]a respons[áa]vel\s*<\/h2>)/i,
        `$1\n${bloco}`
      );
    } else {
      out += `\n<h2>Esperança responsável</h2>\n${bloco}`;
    }
  }
  return out;
}

function normalizarArtigoGerado(artigo) {
  if (Array.isArray(artigo.base_cientifica)) {
    artigo.base_cientifica = artigo.base_cientifica.map(formatarFonte);
  }
  let html = normalizarTitulosSecoes(artigo.conteudo_html ?? "");
  html = garantirEncerramentoNeuma(html);
  artigo.conteudo_html = html;
  return artigo;
}

function montarBlocoFinal(artigo) {
  const fontes = (artigo.base_cientifica ?? []).map((f) => `<li>${formatarFonte(f)}</li>`).join("");
  return `
<section class="rct-bencao-maldicao" data-rct-template="v2">
  <h2>O que ajuda e o que pode prejudicar — com honestidade total</h2>
  <div class="rct-bloco rct-bencao"><p><strong>🌱 Bênção</strong></p><p>${artigo.bencao ?? ""}</p></div>
  <div class="rct-bloco rct-maldicao"><p><strong>⚠️ Maldição</strong></p><p>${artigo.maldicao ?? ""}</p></div>
  <div class="rct-bloco rct-base"><p><strong>🔬 Base científica</strong></p><ul>${fontes}</ul></div>
  <div class="rct-bloco rct-salvaguarda"><p><strong>🛡️ Aviso importante</strong></p><p>${artigo.salvaguarda ?? ""}</p></div>
  <div class="rct-bloco rct-viveka"><p><strong>🪞 Pergunta para refletir</strong></p><p><em>${artigo.pergunta_viveka ?? ""}</em></p></div>
</section>`.trim();
}

function stripBlocoAntigo(html) {
  if (!html) return "";
  const idx = html.indexOf('data-rct-template="v2"');
  if (idx === -1) return html;
  const sectionStart = html.lastIndexOf("<section", idx);
  if (sectionStart === -1) return html;
  return html.slice(0, sectionStart).trim();
}

async function chamarAgente(groq, { agente, systemExtra, userPrompt, maxTokens = 6000, model }) {
  const resolvedModel = model ?? modelRedator();
  const system = readFile("src/lib/prompts/system-agente.txt");
  for (let tentativa = 1; tentativa <= MAX_RETRIES; tentativa++) {
    try {
      const completion = await groq.chat.completions.create({
        model: resolvedModel,
        messages: [
          { role: "system", content: `${system}\n\n---\n${systemExtra}` },
          { role: "user", content: userPrompt },
        ],
        max_tokens: maxTokens,
        response_format: { type: "json_object" },
      });
      const content = completion.choices[0]?.message?.content;
      if (!content) throw new Error(`Agente ${agente}: resposta vazia`);
      return JSON.parse(content);
    } catch (err) {
      const msg = String(err?.message ?? err);
      if ((msg.includes("429") || msg.includes("413") || msg.includes("rate_limit")) && tentativa < MAX_RETRIES) {
        await sleep(PAUSA_MS * tentativa * 2);
        continue;
      }
      throw err;
    }
  }
}

function auditarAgentes() {
  const arquivos = readdirSync(AGENTS_DIR).filter((f) => f.endsWith(".txt"));
  const legadoRx = LEGADO_RX;
  const resultados = [];

  for (const arquivo of arquivos) {
    const conteudo = readFileSync(join(AGENTS_DIR, arquivo), "utf-8");
    const matches = [...conteudo.matchAll(/\b(yogue|yogui|iogue|samadhi|dharana|dhyana|grande[- ]yogue)\b/gi)].map(
      (m) => m[0]
    );
    const unicos = [...new Set(matches.map((s) => s.toLowerCase()))];
    const proibicaoExplicita = /proibid|nunca|não\s+(descrev|usar|apresent)/i.test(conteudo);
    resultados.push({
      arquivo,
      termos_legados: unicos,
      status:
        unicos.length === 0
          ? "ok"
          : proibicaoExplicita
            ? "ok_proibicao_explicita"
            : "revisar",
      nota: proibicaoExplicita
        ? "Menciona termos legados apenas como proibição — aceitável"
        : unicos.length
          ? "Contém termos legados — verificar contexto"
          : "Alinhado NEUMA",
    });
  }

  return resultados;
}

function gerarRelatorioMarkdown(relatorio) {
  const linhas = [
    `# Relatório Biblioteca Editorial NEUMA`,
    ``,
    `Gerado: ${relatorio.gerado_em}`,
    `Fase: ${relatorio.fase}`,
    ``,
    `## Resumo`,
    ``,
    `- Artigos auditados: **${relatorio.artigos.length}**`,
    `- Precisam reescrita: **${relatorio.artigos.filter((a) => a.auditoria?.precisa_reescrita).length}**`,
    `- Aprovados (score ≥ ${relatorio.min_score}): **${relatorio.aprovados.length}**`,
    `- Reprovados / pendentes: **${relatorio.reprovados.length}**`,
    ``,
  ];

  if (relatorio.agentes?.length) {
    linhas.push(`## Auditoria de Agentes`, ``);
    for (const ag of relatorio.agentes) {
      linhas.push(`- **${ag.arquivo}**: ${ag.status} — ${ag.nota}`);
    }
    linhas.push(``);
  }

  linhas.push(`## Artigos`, ``);
  for (const item of relatorio.artigos) {
    linhas.push(`### ${item.titulo}`, ``);
    linhas.push(`- Slug: \`${item.slug}\``);
    linhas.push(`- Categoria: ${item.categoria}`);
    if (item.auditoria) {
      linhas.push(`- Seções NEUMA: ${item.auditoria.secoes_ok ? "✅ 6/6" : "❌ incompleto"}`);
      if (item.auditoria.termos_legados?.length) {
        linhas.push(`- Termos legados: ${item.auditoria.termos_legados.join(", ")}`);
      }
      if (item.auditoria.achados?.length) {
        linhas.push(`- Achados:`);
        for (const a of item.auditoria.achados) {
          linhas.push(`  - [${a.severidade}] ${a.tipo}: ${a.detalhe}`);
        }
      }
    }
    if (item.critico) {
      linhas.push(`- Agente Crítico: ${item.critico.aprovado ? "✅" : "❌"} — ${item.critico.resumo ?? ""}`);
      if (item.critico.bloqueadores?.length) {
        linhas.push(`  - Bloqueadores: ${item.critico.bloqueadores.join("; ")}`);
      }
    }
    if (item.score) {
      const s = item.score;
      linhas.push(
        `- Score: clareza ${s.clareza} · aplicabilidade ${s.aplicabilidade} · rigor ${s.rigor} · esperança ${s.esperanca} · transformação ${s.transformacao_humana} · **média ${s.media}** ${s.aprovado ? "✅" : "❌"}`
      );
    }
    if (item.status_final) {
      linhas.push(`- **Status final: ${item.status_final}**`);
    }
    linhas.push(``);
  }

  linhas.push(`## Próximo passo`, ``);
  if (relatorio.reprovados.length) {
    linhas.push(`Artigos abaixo do score mínimo devem retornar para revisão antes de commit/deploy.`);
  } else if (relatorio.fase === "full") {
    linhas.push(`✅ Acervo aprovado para Fase 5 (commit + deploy) — sujeito à aprovação do fundador.`);
  } else {
    linhas.push(`Execute \`npm run biblioteca:neuma -- --fase full\` para reescrita, score e aprovação final.`);
  }

  return linhas.join("\n");
}

async function reescreverArtigo(groq, db, feedbackCritico = null) {
  const revisao = readAgent("revisao-editorial-neuma.txt");

  const htmlResumo =
    (db.conteudo_html?.length ?? 0) > 2500
      ? `${db.conteudo_html.slice(0, 2500)}\n… [${db.conteudo_html.length} chars — reescrever do zero]`
      : db.conteudo_html ?? "";

  const feedbackBlock = feedbackCritico
    ? `\nCORREÇÕES OBRIGATÓRIAS:\n${JSON.stringify(feedbackCritico).slice(0, 1500)}`
    : "";

  const scout = {
    tema: db.titulo,
    slug: db.slug,
    categoria: db.categoria.includes("transformacao") ? db.categoria : "jesus-transformacao",
    angulo: "Transformação humana — sofrimento, consciência, florescimento",
  };

  await sleep(PAUSA_MS);

  const systemRedator = `${revisao.slice(0, 2000)}

## 6 SEÇÕES h2 OBRIGATÓRIAS
1. O que aconteceu?
2. O que isso revela sobre a condição humana?
3. Leitura neurocomportamental
4. Múltiplas lentes interpretativas
5. O que posso fazer hoje?
6. Esperança responsável

Frase-guia: "${FRASE_GUIA}"
Esperança: "${FRASE_ESPERANCA}"
Proibido: yogue, samadhi, dharana, dhyana
Hipóteses: [HIPÓTESE] ou [INTERPRETAÇÃO]; ciência: [ESTABELECIDA]
${feedbackBlock}`;

  const artigo = await chamarAgente(groq, {
    agente: "03-neuma",
    systemExtra: systemRedator,
    userPrompt: `Reescreva completamente este artigo NEUMA.

Slug fixo: "${db.slug}"
Título sugerido (pode ajustar): ${db.titulo}
Subtítulo atual: ${db.subtitulo ?? ""}

Resumo do conteúdo anterior (NÃO copiar estrutura — reconstruir):
${htmlResumo}

Retorne JSON:
{
  "titulo": "",
  "subtitulo": "",
  "slug": "${db.slug}",
  "categoria": "${scout.categoria}",
  "nivel": "abertura",
  "tags": [],
  "meta_descricao": "",
  "tempo_leitura": "",
  "conteudo_html": "<h2>O que aconteceu?</h2>...",
  "bencao": "",
  "maldicao": "",
  "base_cientifica": ["autor (ano) [ESTABELECIDA]", "..."],
  "salvaguarda": "",
  "pergunta_viveka": ""
}`,
    maxTokens: 7000,
    model: modelRedator(),
  });

  if (LEGADO_RX.test(`${artigo.titulo}\n${artigo.subtitulo ?? ""}\n${artigo.conteudo_html ?? ""}`)) {
    throw new Error("Artigo gerado contém linguagem legada");
  }

  normalizarArtigoGerado(artigo);
  artigo.slug = db.slug;
  artigo.categoria = scout.categoria;

  const corpo = stripBlocoAntigo(artigo.conteudo_html ?? "");
  artigo.conteudo_html = `${corpo}\n${montarBlocoFinal(artigo)}`;

  return { scout, artigo };
}

async function agenteCritico(groq, artigo) {
  await sleep(PAUSA_MS);
  return chamarAgente(groq, {
    agente: "critico",
    systemExtra: readAgent("agente-critico-neuma.txt").slice(0, 2500),
    userPrompt: `Título: ${artigo.titulo}\nSubtítulo: ${artigo.subtitulo ?? ""}\n\nHTML:\n${(artigo.conteudo_html ?? "").slice(0, 5000)}`,
    maxTokens: 2500,
    model: modelAux(),
  });
}

async function agenteScore(groq, artigo) {
  await sleep(PAUSA_MS);
  const score = await chamarAgente(groq, {
    agente: "score",
    systemExtra: readAgent("agente-score-neuma.txt").slice(0, 2000),
    userPrompt: `Pontue (mínimo 8 em cada dimensão):\nTítulo: ${artigo.titulo}\n\nHTML:\n${(artigo.conteudo_html ?? "").slice(0, 5000)}`,
    maxTokens: 2000,
    model: modelAux(),
  });
  score.media = mediaScore(score);
  score.aprovado = scoreAprovado(score, parseInt(process.env.NEuma_MIN_SCORE ?? "8", 10) || 8);
  return score;
}

async function processarArtigo(groq, prisma, db, opts) {
  const { minScore, maxRetries, dryRun } = opts;
  const resultado = {
    slug: db.slug,
    titulo: db.titulo,
    categoria: db.categoria,
    auditoria: auditarArtigo(db),
  };

  console.log(`\n${"═".repeat(64)}`);
  console.log(`📄 ${db.titulo}`);
  console.log(`   Seções: ${resultado.auditoria.secoes.filter((s) => s.presente).length}/6`);
  if (resultado.auditoria.termos_legados.length) {
    console.log(`   ⚠ Legado: ${resultado.auditoria.termos_legados.join(", ")}`);
  }

  if (opts.fase === "audit") return resultado;

  let tentativa = 0;
  let feedbackCritico = null;
  let artigoFinal = null;

  while (tentativa < maxRetries) {
    tentativa++;
    console.log(`   ✏ Reescrita (tentativa ${tentativa}/${maxRetries})…`);

    try {
      const { artigo } = await reescreverArtigo(groq, db, feedbackCritico);
      artigoFinal = artigo;

      const estrutura = validarEstruturaNeuma(artigo.titulo, artigo.conteudo_html);
      if (!estrutura.ok) {
        console.log(`   ⚠ Estrutura: ${estrutura.erros.join("; ")}`);
        feedbackCritico = { bloqueadores: estrutura.erros };
        continue;
      }

      console.log(`   🔍 Agente Crítico…`);
      const critico = await agenteCritico(groq, artigo);
      resultado.critico = critico;

      const legadoProgramatico = LEGADO_RX.test(artigo.conteudo_html ?? "");
      const criticoBloqueia =
        !critico.aprovado &&
        critico.bloqueadores?.some((b) =>
          /legado|yogue|samadhi|dharana|fatalismo|promessa/i.test(b)
        );

      if (criticoBloqueia && legadoProgramatico) {
        console.log(`   ❌ Crítico + scan legado: bloqueado`);
        feedbackCritico = critico;
        continue;
      }
      if (criticoBloqueia && !legadoProgramatico) {
        console.log(`   ⚠ Crítico alertou (sem termo legado no texto) — segue para score`);
      }

      console.log(`   📊 Score NEUMA…`);
      const score = await agenteScore(groq, artigo);
      resultado.score = score;
      console.log(
        `   Score: ${score.media}/10 — ${score.aprovado ? "APROVADO" : "REPROVADO"}`
      );

      if (!score.aprovado) {
        feedbackCritico = {
          bloqueadores: score.pontos_fracos ?? [],
          perguntas_para_redator: score.prioridade_revisao ?? [],
        };
        continue;
      }

      if (dryRun) {
        resultado.status_final = "dry-run-aprovado";
        return resultado;
      }

      const backupPath = join(REPORTS_DIR, `backup-${db.slug}-${Date.now()}.json`);
      writeFileSync(
        backupPath,
        JSON.stringify({ anterior: { titulo: db.titulo, chars: db.conteudo_html?.length }, artigo }, null, 2),
        "utf-8"
      );

      await prisma.artigo.update({
        where: { slug: db.slug },
        data: {
          titulo: artigo.titulo,
          subtitulo: artigo.subtitulo ?? db.subtitulo,
          categoria: artigo.categoria,
          conteudo_html: artigo.conteudo_html,
          tags: artigo.tags ?? db.tags,
          meta_descricao: artigo.meta_descricao ?? db.meta_descricao,
          tempo_leitura: artigo.tempo_leitura ?? db.tempo_leitura,
          pendente_revisao: false,
          publicado: true,
          updated_at: new Date(),
        },
      });

      resultado.titulo = artigo.titulo;
      resultado.status_final = "aprovado";
      console.log(`   ✅ Gravado no banco`);
      return resultado;
    } catch (err) {
      console.error(`   ❌ Erro tentativa ${tentativa}:`, err.message);
      feedbackCritico = { bloqueadores: [err.message] };
    }
  }

  resultado.status_final = "reprovado";
  if (!dryRun && artigoFinal) {
    await prisma.artigo.update({
      where: { slug: db.slug },
      data: { pendente_revisao: true, updated_at: new Date() },
    });
  }
  return resultado;
}

async function exportarArtigos(prisma) {
  const publicados = await prisma.artigo.findMany({
    where: { publicado: true },
    orderBy: { created_at: "desc" },
  });
  writeFileSync(
    resolve("src/data/artigos-publicados.json"),
    JSON.stringify(publicados, null, 2),
    "utf-8"
  );
  console.log(`\n📦 Export: ${publicados.length} artigo(s) → src/data/artigos-publicados.json`);
}

async function main() {
  loadEnv();
  const fase = argValue("--fase") ?? "full";
  const force = process.argv.includes("--force");
  const slugArg = argValue("--slug");
  const minScore = parseInt(argValue("--min-score") ?? "8", 10);
  const maxRetries = parseInt(argValue("--max-retries") ?? "2", 10);
  const dryRun = process.argv.includes("--dry-run");

  if ((fase === "full" || fase === "rewrite") && !force) {
    console.error(`
⛔ PAUSA ESTRATÉGICA — migração do acervo bloqueada.

Motivo: validar profundidade humana nos 3 artigos já reescritos antes de continuar.

Rode:  npm run auditoria:profundidade
Docs:  docs/editorial/STATUS-BIBLIOTECA-NEUMA.md

Para forçar (não recomendado):  npm run biblioteca:neuma -- --fase full --force
`);
    process.exit(1);
  }

  if (fase !== "audit" && fase !== "agentes" && !process.env.GROQ_API_KEY) {
    console.error("GROQ_API_KEY ausente");
    process.exit(1);
  }

  mkdirSync(REPORTS_DIR, { recursive: true });

  const prisma = new PrismaClient();
  const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

  const artigos = await prisma.artigo.findMany({
    where: slugArg ? { slug: slugArg, publicado: true } : { publicado: true },
    orderBy: { created_at: "asc" },
  });

  if (!artigos.length) {
    console.log("Nenhum artigo publicado encontrado.");
    await prisma.$disconnect();
    return;
  }

  console.log(`\n🏛 BIBLIOTECA EDITORIAL NEUMA — Fase: ${fase}`);
  console.log(`   Artigos: ${artigos.length} · Score mínimo: ${minScore}`);

  const relatorio = {
    gerado_em: new Date().toISOString(),
    fase,
    min_score: minScore,
    artigos: [],
    aprovados: [],
    reprovados: [],
    agentes: null,
  };

  if (fase === "agentes" || fase === "full" || fase === "audit") {
    relatorio.agentes = auditarAgentes();
    console.log(`\n🤖 Auditoria de agentes: ${relatorio.agentes.length} arquivo(s)`);
    for (const ag of relatorio.agentes.filter((a) => a.status === "revisar")) {
      console.log(`   ⚠ ${ag.arquivo}: ${ag.termos_legados.join(", ")}`);
    }
  }

  if (fase === "agentes") {
    const ts = Date.now();
    writeFileSync(join(REPORTS_DIR, `relatorio-agentes-${ts}.json`), JSON.stringify(relatorio, null, 2));
    writeFileSync(join(REPORTS_DIR, `relatorio-agentes-${ts}.md`), gerarRelatorioMarkdown(relatorio));
    await prisma.$disconnect();
    console.log(`\n✅ Relatório em docs/editorial/`);
    return;
  }

  const opts = { fase: fase === "rewrite" || fase === "full" ? "rewrite" : "audit", minScore, maxRetries, dryRun };

  for (const db of artigos) {
    if (fase === "audit") {
      const audit = auditarArtigo(db);
      relatorio.artigos.push({ slug: db.slug, titulo: db.titulo, categoria: db.categoria, auditoria: audit });
      console.log(`\n📄 ${db.titulo}`);
      console.log(`   Seções: ${audit.secoes.filter((s) => s.presente).length}/6 · Reescrita: ${audit.precisa_reescrita ? "SIM" : "não"}`);
      continue;
    }

    if (fase === "full" || fase === "rewrite") {
      const item = await processarArtigo(groq, prisma, db, opts);
      relatorio.artigos.push(item);
      if (item.status_final === "aprovado" || item.status_final === "dry-run-aprovado") {
        relatorio.aprovados.push(item.slug);
      } else {
        relatorio.reprovados.push(item.slug);
      }
    }
  }

  const ts = Date.now();
  const jsonPath = join(REPORTS_DIR, `relatorio-biblioteca-neuma-${ts}.json`);
  const mdPath = join(REPORTS_DIR, `relatorio-biblioteca-neuma-${ts}.md`);
  writeFileSync(jsonPath, JSON.stringify(relatorio, null, 2));
  writeFileSync(mdPath, gerarRelatorioMarkdown(relatorio));

  if ((fase === "full" || fase === "rewrite") && !dryRun && relatorio.aprovados.length) {
    await exportarArtigos(prisma);
  }

  await prisma.$disconnect();

  console.log(`\n${"═".repeat(64)}`);
  console.log(`✅ Relatório: docs/editorial/relatorio-biblioteca-neuma-${ts}.md`);
  console.log(`   Aprovados: ${relatorio.aprovados.length} · Reprovados: ${relatorio.reprovados.length}`);
  if (relatorio.reprovados.length) {
    console.log(`\n⛔ FASE 5 BLOQUEADA — corrigir reprovados antes de commit/deploy`);
  } else if (fase === "full" && !dryRun) {
    console.log(`\n✅ Acervo pronto para aprovação do fundador → commit → deploy`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
