#!/usr/bin/env node
/**
 * PAUSA ESTRATÉGICA — Auditoria de Profundidade (sem Groq).
 * Compara versão original (snapshot v0.6.0) vs reescrita atual.
 *
 * Uso:
 *   node scripts/auditoria-profundidade-neuma.mjs
 *   node scripts/auditoria-profundidade-neuma.mjs --slug paulo-espinho-na-carne-ciencia-e-biblia
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import {
  deltaMetricas,
  scoreProfundidadeHeuristico,
  extrairTitulosH2,
  extrairMetricas,
} from "./lib/metricas-profundidade-neuma.mjs";

const ROOT = resolve(".");
const REPORTS = join(ROOT, "docs/editorial");
const SNAPSHOT = join(REPORTS, "snapshot-original-v0.6.0.json");

const REESCRITOS = [
  {
    slug: "paulo-espinho-na-carne-ciencia-e-biblia",
    tipo: "sofrimento",
    pergunta: "O que aconteceu comigo?",
  },
  {
    slug: "jesus-aos-12-anos-no-temple",
    tipo: "transformacao",
    pergunta: "Como a mudança acontece?",
  },
  {
    slug: "fe-e-razao-reconciliando-religiao-e-ciencia",
    tipo: "transformacao",
    pergunta: "Como a mudança acontece?",
  },
];

function loadEnv() {
  const path = resolve(".env.local");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) process.env[t.slice(0, i)] = t.slice(i + 1);
  }
}

function analiseQualitativa(slug, original, reescrito, delta, score) {
  const perdido = [];
  const ganho = [];
  const restaurar = [];

  if (slug.includes("paulo")) {
    if (/195|quarenta açoites|naufrágio|HPA|autoimmune|Göbel|Frontiers/i.test(original)) {
      if (!/195|quarenta açoites|HPA|Göbel|Frontiers/i.test(reescrito)) {
        perdido.push("Prontuário bíblico detalhado (195 açoites, naufrágios, lista 2 Cor 11)");
        perdido.push("Hipóteses clínicas (migraine, doença autoimune) com autores");
        perdido.push("Eixo HPA, inflamação crônica, trauma repetido — linguagem neurocientífica");
        restaurar.push("Restaurar lista de 2 Coríntios 11 com blockquote completo");
        restaurar.push("Restaurar seção de candidatos ao espinho (Göbel 1995, etc.)");
        restaurar.push("Manter 6 seções NEUMA mas expandir cada uma para ≥80% do volume original");
      }
    }
    ganho.push("Estrutura canônica 6 seções NEUMA");
    ganho.push("Esperança responsável explícita no encerramento");
  }

  if (slug.includes("jesus-aos-12")) {
    if (extrairMetricas(original).h3 >= 4 && extrairMetricas(reescrito).h3 === 0) {
      perdido.push("Subseções de desenvolvimento (córtex pré-frontal, neuroplasticidade por idade)");
      perdido.push("Blockquotes de Lucas 2:46-52 com contexto");
      restaurar.push("Reintegrar dados de desenvolvimento cognivo aos 12 anos [COMPROVADO PELA CIÊNCIA]");
    }
    ganho.push("Título sem linguagem legada (yogue/samadhi)");
    ganho.push("6 seções padronizadas");
  }

  if (slug.includes("fe-e-razao")) {
    if (delta.delta_palavras_pct > 0) {
      ganho.push("Volume expandido em relação ao original fraco");
      ganho.push("6 seções NEUMA e práticas concretas");
    }
    if (extrairMetricas(original).citacoes_ano === 0) {
      perdido.push("Original já era raso — pouco a perder");
    }
    restaurar.push("Adicionar mais lentes (filosofia, história das ciências) e citações com ano");
  }

  if (score.profundidade_humana < 8) {
    restaurar.push("Revisão humana obrigatória antes de republicar");
    restaurar.push("Pipeline deve usar modo enriquecer — nunca substituir do zero");
  }

  return { perdido, ganho, restaurar };
}

function gerarMarkdown(relatorio) {
  const linhas = [
    `# Auditoria de Profundidade — PAUSA ESTRATÉGICA NEUMA`,
    ``,
    `Gerado: ${relatorio.gerado_em}`,
    `**Sem tokens Groq.** Comparação: snapshot \`v0.6.0\` vs banco atual.`,
    ``,
    `## Veredito`,
    ``,
    `- Artigos com profundidade ≥8: **${relatorio.aprovados.length}**`,
    `- Artigos reprovados por superficialidade: **${relatorio.reprovados.length}**`,
    `- **Migração dos 3 restantes: PAUSADA**`,
    `- **Deploy: PAUSADO**`,
    ``,
    `## Métrica nova: Profundidade Humana (0-10)`,
    ``,
    `Critérios: complexidade emocional · riqueza interpretativa · reflexão · originalidade · voz autoral`,
    ``,
    `Um artigo pode passar na estrutura (6 seções) e **falhar** aqui.`,
    ``,
  ];

  for (const item of relatorio.artigos) {
    linhas.push(`---`, ``, `## ${item.titulo_reescrito}`, ``);
    linhas.push(`- Slug: \`${item.slug}\``);
    linhas.push(`- Tipo editorial: **${item.tipo}** — _${item.pergunta}_`);
    linhas.push(`- Título original: ${item.titulo_original}`);
    linhas.push(`- **Profundidade humana: ${item.score.profundidade_humana}/10** ${item.score.aprovado ? "✅" : "❌ REPROVADO"}`);
    linhas.push(``);
    linhas.push(`### Métricas quantitativas`, ``);
    linhas.push(`| Métrica | Original | Reescrito | Δ |`);
    linhas.push(`|---------|----------|-----------|---|`);
    const o = item.delta.original;
    const r = item.delta.reescrito;
    linhas.push(`| Palavras | ${o.palavras} | ${r.palavras} | ${item.delta.delta_palavras_pct}% |`);
    linhas.push(`| Blockquotes | ${o.blockquotes} | ${r.blockquotes} | ${item.delta.delta_blockquotes} |`);
    linhas.push(`| Subseções h3 | ${o.h3} | ${r.h3} | ${item.delta.delta_h3} |`);
    linhas.push(`| Citações (ano) | ${o.citacoes_ano} | ${r.citacoes_ano} | ${item.delta.delta_citacoes} |`);
    linhas.push(`| Autores nomeados | ${o.autores_citados} | ${r.autores_citados} | ${item.delta.delta_autores} |`);
    linhas.push(`| Números concretos | ${o.numeros_concretos} | ${r.numeros_concretos} | ${item.delta.delta_numeros} |`);
    linhas.push(``);

    if (item.score.motivos.length) {
      linhas.push(`### Alertas automáticos`, ``);
      for (const m of item.score.motivos) linhas.push(`- ${m}`);
      linhas.push(``);
    }

    linhas.push(`### O que foi perdido?`, ``);
    for (const x of item.qualitativo.perdido) linhas.push(`- ${x}`);
    if (!item.qualitativo.perdido.length) linhas.push(`- _(nada significativo)_`);
    linhas.push(``);

    linhas.push(`### O que foi ganho?`, ``);
    for (const x of item.qualitativo.ganho) linhas.push(`- ${x}`);
    linhas.push(``);

    linhas.push(`### O que deve ser restaurado?`, ``);
    for (const x of item.qualitativo.restaurar) linhas.push(`- ${x}`);
    linhas.push(``);
  }

  linhas.push(
    `## Próximo passo (acordado)`,
    ``,
    `1. Revisão humana dos 3 artigos reescritos`,
    `2. Modo **enriquecer** (preservar original + aplicar 6 seções) — não substituir do zero`,
    `3. Só retomar os 3 pendentes após Paulo/Jesus validados`,
    `4. Equilibrar acervo: mais artigos **Tipo 3 — Florescimento**`,
    ``
  );

  return linhas.join("\n");
}

async function main() {
  loadEnv();
  mkdirSync(REPORTS, { recursive: true });

  if (!existsSync(SNAPSHOT)) {
    console.error(`Snapshot ausente: ${SNAPSHOT}`);
    console.error("Rode: git show 3363282:src/data/artigos-publicados.json > docs/editorial/snapshot-original-v0.6.0.json");
    process.exit(1);
  }

  let originais;
  try {
    const raw = execSync("git show 3363282:src/data/artigos-publicados.json", {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });
    originais = JSON.parse(raw);
  } catch {
    originais = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
  }
  const slugArg = process.argv.includes("--slug")
    ? process.argv[process.argv.indexOf("--slug") + 1]
    : null;

  const fila = REESCRITOS.filter((a) => !slugArg || a.slug === slugArg);
  const prisma = new PrismaClient();

  const relatorio = {
    gerado_em: new Date().toISOString(),
    pausa_estrategica: true,
    groq: false,
    artigos: [],
    aprovados: [],
    reprovados: [],
  };

  for (const meta of fila) {
    const orig = originais.find((a) => a.slug === meta.slug);
    const atual = await prisma.artigo.findUnique({ where: { slug: meta.slug } });

    if (!orig || !atual) {
      console.warn(`⚠ ${meta.slug}: original ou atual ausente`);
      continue;
    }

    const delta = deltaMetricas(orig.conteudo_html, atual.conteudo_html);
    const score = scoreProfundidadeHeuristico(delta, meta.tipo, atual.conteudo_html);
    const qualitativo = analiseQualitativa(
      meta.slug,
      orig.conteudo_html,
      atual.conteudo_html,
      delta,
      score
    );

    const item = {
      slug: meta.slug,
      tipo: meta.tipo,
      pergunta: meta.pergunta,
      titulo_original: orig.titulo,
      titulo_reescrito: atual.titulo,
      delta,
      score,
      qualitativo,
    };

    relatorio.artigos.push(item);
    if (score.aprovado) relatorio.aprovados.push(meta.slug);
    else relatorio.reprovados.push(meta.slug);

    console.log(
      `\n${atual.titulo}\n  Profundidade: ${score.profundidade_humana}/10 ${score.aprovado ? "✅" : "❌"}\n  Palavras: ${delta.original.palavras} → ${delta.reescrito.palavras} (${delta.delta_palavras_pct}%)`
    );
  }

  await prisma.$disconnect();

  const ts = Date.now();
  const md = gerarMarkdown(relatorio);
  writeFileSync(join(REPORTS, `auditoria-profundidade-${ts}.md`), md, "utf8");
  writeFileSync(join(REPORTS, `auditoria-profundidade-${ts}.json`), JSON.stringify(relatorio, null, 2));

  console.log(`\n📄 Relatório: docs/editorial/auditoria-profundidade-${ts}.md`);
  console.log(`   Aprovados: ${relatorio.aprovados.length} · Reprovados: ${relatorio.reprovados.length}`);

  if (relatorio.reprovados.length) {
    console.log(`\n⛔ PAUSA mantida — corrigir superficialidade antes de expandir pipeline`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
