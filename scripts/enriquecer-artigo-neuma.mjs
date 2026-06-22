#!/usr/bin/env node
/**
 * Modo ENRIQUECER v2 — preserva 100% do corpo; renomeia h2 + adiciona Esperança responsável.
 * Sem Groq.
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { execSync } from "node:child_process";
import { PrismaClient } from "@prisma/client";
import {
  deltaMetricas,
  scoreProfundidadeHeuristico,
  contarPalavrasHtml,
} from "./lib/metricas-profundidade-neuma.mjs";

const SNAPSHOT_COMMIT = process.env.NEuma_SNAPSHOT_COMMIT ?? "3363282";
const SNAPSHOT = resolve("docs/editorial/snapshot-original-v0.6.0.json");

function carregarOriginais() {
  try {
    const raw = execSync(`git show ${SNAPSHOT_COMMIT}:src/data/artigos-publicados.json`, {
      encoding: "utf8",
      maxBuffer: 20 * 1024 * 1024,
    });
    return JSON.parse(raw);
  } catch {
    if (!existsSync(SNAPSHOT)) throw new Error("Snapshot git e arquivo ausentes");
    return JSON.parse(readFileSync(SNAPSHOT, "utf8"));
  }
}
const FRASE_GUIA =
  "O cérebro muda. A consciência se expande. A vida pode ser transformada.";
const FRASE_ESPERANCA = "Você não está condenado a permanecer como está.";

const METADADOS = {
  "paulo-espinho-na-carne-ciencia-e-biblia": {
    tipo: "sofrimento",
    titulo: "Paulo e o Espinho na Carne: como o sofrimento molda a mente humana",
    subtitulo: "Dor crônica, trauma e resiliência — 2 Coríntios 12 · leitura neurocomportamental",
    categoria: "jesus-transformacao",
    renomear: [
      [/vida de perseguição[^<]*/i, "O que aconteceu?"],
      [/O espinho na carne[^<]*/i, "O que isso revela sobre a condição humana? — o espinho"],
      [/neurociência diz sobre um corpo[^<]*/i, "Leitura neurocomportamental"],
      [/Galatians 6:17[^<]*/i, "Múltiplas lentes interpretativas — marcas no corpo"],
      [/A resposta de Paulo[^<]*/i, "Múltiplas lentes interpretativas — resiliência"],
      [/O que Paulo não foi/i, "O que isso revela sobre a condição humana? — limites da leitura"],
      [/Prática: o que a ciência indica[^<]*/i, "O que posso fazer hoje?"],
    ],
  },
  "jesus-aos-12-anos-no-temple": {
    tipo: "transformacao",
    titulo: "Jesus aos 12 anos no Templo: o que o relato revela sobre atenção e pertencimento",
    subtitulo: "Lucas 2:46-52 · desenvolvimento humano · escuta e presença",
    categoria: "jesus-transformacao",
    renomear: [
      [/O que o texto registra/i, "O que aconteceu?"],
      [/O que a ciência do desenvolvimento diz[^<]*/i, "Leitura neurocomportamental"],
      [/O que este relato não sustenta/i, "Múltiplas lentes interpretativas — o que não sustenta"],
      [/Prática: o que a ciência sugere[^<]*/i, "O que posso fazer hoje?"],
    ],
    insertSecaoB: true,
  },
  "10-mandamentos-oriente-medio-ciencia-epigenetica": {
    tipo: "transformacao",
    titulo: "Os 10 Mandamentos do Oriente Médio: o que a etimologia e a ciência revelam",
    subtitulo: "Êxodo 20 · Dibrot · protocolo de convivência e neuroplasticidade",
    categoria: "misticismo-decodificado",
    renomear: [
      [/palavra antes da lei/i, "O que aconteceu?"],
      [/contexto: uma civilização/i, "O que isso revela sobre a condição humana?"],
      [/dez mandamentos: o que diz a etimologia/i, "Leitura neurocomportamental"],
      [/Jesus e a síntese/i, "Múltiplas lentes interpretativas — síntese"],
      [/O que esta leitura não afirma/i, "Múltiplas lentes interpretativas — limites"],
    ],
    insertSecaoE: `<h2>O que posso fazer hoje?</h2>
<p>Escolha um mandamento por semana e observe na própria conduta antes de exigi-lo dos outros. A síntese de Jesus em dois mandamentos (amor a Deus e ao próximo) pode orientar decisões concretas — sem legalismo nem superioridade moral.</p>`,
  },
  "tentado-em-tudo-sem-pecado-autocontrole": {
    tipo: "transformacao",
    titulo: "Tentado em Tudo, Sem Pecado: o que a Neurociência Diz sobre Autocontrole",
    subtitulo: "Hebreus 4:15 · impulsos, adolescência e regulação emocional",
    categoria: "misticismo-decodificado",
    renomear: [
      [/verso que muitos adolescentes/i, "O que aconteceu?"],
      [/neurociência diz sobre a tentação/i, "Leitura neurocomportamental"],
      [/Estratégias com respaldo/i, "O que posso fazer hoje?"],
      [/O que isso significa para quem/i, "O que isso revela sobre a condição humana?"],
    ],
    insertSecaoD: `<h2>Múltiplas lentes interpretativas</h2>
<p><strong>Tradição cristã:</strong> tentação não é pecado — ceder é (Hebreus 4:15). <strong>Psicologia:</strong> impulsos são normais; regulação é aprendida. <strong>Neurociência:</strong> córtex pré-frontal amadurece na adolescência. Leituras complementares — sem reduzir a fé a química cerebral.</p>`,
  },
  "sao-santo-titulos-apostolos-joao-17": {
    tipo: "transformacao",
    titulo: "Por que dizemos São João, São Pedro e Santo? — bíblia, etimologia e uso honesto",
    subtitulo: "João 17:21 · ἅγιος (hagios) · tradição apostólica",
    categoria: "misticismo-decodificado",
    renomear: [
      [/pergunta que gera polêmica/i, "O que aconteceu?"],
      [/O que a Bíblia já diz/i, "O que isso revela sobre a condição humana? — bíblia"],
      [/Etimologia: o que/i, "O que isso revela sobre a condição humana? — etimologia"],
      [/apóstolos: enviados/i, "Múltiplas lentes interpretativas — apóstolos"],
      [/O que a ciência não prova/i, "Leitura neurocomportamental"],
      [/Controvérsias comuns/i, "Múltiplas lentes interpretativas — controvérsias"],
      [/João 17:21/i, "Múltiplas lentes interpretativas — João 17"],
      [/Como usar «São»/i, "O que posso fazer hoje?"],
    ],
  },
};

const SECAO_ESPERANCA = `<h2>Esperança responsável</h2>
<p>${FRASE_GUIA}</p>
<p><strong>${FRASE_ESPERANCA}</strong></p>
<p>Esta leitura convida à prática e à reflexão — não substitui cuidado profissional quando o sofrimento é intenso ou persistente.</p>`;

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

function separarBlocoFinal(html) {
  const idx = html.indexOf('data-rct-template="v2"');
  if (idx === -1) return { corpo: html.trim(), bloco: "" };
  const start = html.lastIndexOf("<section", idx);
  return {
    corpo: html.slice(0, start).trim(),
    bloco: html.slice(start).trim(),
  };
}

function renomearH2(corpo, regras) {
  let out = corpo;
  for (const [de, para] of regras) {
    out = out.replace(new RegExp(`(<h2[^>]*>)([\\s\\S]*?)(</h2>)`, "gi"), (match, open, title, close) => {
      const plain = title.replace(/<[^>]+>/g, "").trim();
      return de.test(plain) ? `${open}${para}${close}` : match;
    });
  }
  return out;
}

function enriquecer(slug, htmlOriginal, meta) {
  const { corpo, bloco } = separarBlocoFinal(htmlOriginal);
  let corpoRenomeado = renomearH2(corpo, meta.renomear);

  if (!/Esperança responsável/i.test(corpoRenomeado)) {
    corpoRenomeado = `${corpoRenomeado}\n\n${SECAO_ESPERANCA}`;
  }

  if (!corpoRenomeado.includes(FRASE_GUIA)) {
    corpoRenomeado = corpoRenomeado.replace(
      /(<h2>\s*Esperança responsável\s*<\/h2>)/i,
      `$1\n<p>${FRASE_GUIA}</p>`
    );
  }

  if (meta.insertSecaoB && !/O que isso revela sobre a condição humana/i.test(corpoRenomeado)) {
    const blocoB = `<h2>O que isso revela sobre a condição humana?</h2>
<p>O relato combina pertencimento familiar, autonomia emergente e busca de sentido — tensões típicas da adolescência. Maria e José o procuram; ele afirma pertencimento a «a casa de meu Pai» (Lucas 2:49), e mesmo assim retorna submisso (Lucas 2:51). Isso descreve um ser humano em formação: curioso, assertivo e ainda dependente — não um símbolo abstrato.</p>`;
    corpoRenomeado = corpoRenomeado.replace(
      /(<h2>\s*Leitura neurocomportamental\s*<\/h2>)/i,
      `${blocoB}\n\n$1`
    );
  }

  if (meta.insertSecaoE && !/O que posso fazer hoje/i.test(corpoRenomeado)) {
    corpoRenomeado = `${corpoRenomeado}\n\n${meta.insertSecaoE}`;
  }

  if (meta.insertSecaoD && !/Múltiplas lentes/i.test(corpoRenomeado)) {
    corpoRenomeado = corpoRenomeado.replace(
      /(<h2>\s*O que posso fazer hoje\?\s*<\/h2>)/i,
      `${meta.insertSecaoD}\n\n$1`
    );
  }

  return bloco ? `${corpoRenomeado}\n\n${bloco}` : corpoRenomeado;
}

async function main() {
  loadEnv();
  const slugArg = process.argv.includes("--slug")
    ? process.argv[process.argv.indexOf("--slug") + 1]
    : null;

  const originais = carregarOriginais();
  const slugs = slugArg ? [slugArg] : Object.keys(METADADOS);
  const prisma = new PrismaClient();

  for (const slug of slugs) {
    const meta = METADADOS[slug];
    const orig = originais.find((a) => a.slug === slug);
    if (!meta || !orig) continue;

    const html = enriquecer(slug, orig.conteudo_html, meta);
    const { corpo: corpoOrig } = separarBlocoFinal(orig.conteudo_html);
    const { corpo: corpoNovo } = separarBlocoFinal(html);

    const delta = deltaMetricas(corpoOrig, corpoNovo);
    const score = scoreProfundidadeHeuristico(delta, meta.tipo, html);

    await prisma.artigo.update({
      where: { slug },
      data: {
        titulo: meta.titulo,
        subtitulo: meta.subtitulo,
        categoria: meta.categoria,
        conteudo_html: html,
        pendente_revisao: false,
        updated_at: new Date(),
      },
    });

    console.log(`\n✅ ${slug}`);
    console.log(
      `   Corpo: ${contarPalavrasHtml(corpoOrig)} → ${contarPalavrasHtml(corpoNovo)} palavras (${delta.delta_palavras_pct}%)`
    );
    console.log(`   Profundidade: ${score.profundidade_humana}/10 ${score.aprovado ? "✅" : "❌"}`);
  }

  const publicados = await prisma.artigo.findMany({
    where: { publicado: true },
    orderBy: { created_at: "desc" },
  });
  writeFileSync(
    resolve("src/data/artigos-publicados.json"),
    JSON.stringify(publicados, null, 2),
    "utf8"
  );

  await prisma.$disconnect();
  console.log("\n📦 Export concluído — rode: npm run auditoria:profundidade");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
