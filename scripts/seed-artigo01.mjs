#!/usr/bin/env node
/**
 * Insere o Artigo 01 — 10 Mandamentos (conteúdo do .docx, linguagem leve + analogias de programação).
 * Uso: npm run seed:artigo01
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

function loadEnv() {
  const path = resolve(".env.local");
  if (!existsSync(path)) {
    console.error("Crie .env.local com DATABASE_URL");
    process.exit(1);
  }
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) process.env[t.slice(0, i)] = t.slice(i + 1);
  }
}

/** Enriquece o texto com analogias leves de programação entre parênteses */
function enriquecer(texto) {
  const map = [
    [/código de engenharia biológica/gi, "código-fonte biológico (programa que o corpo executa)"],
    [/instruções operacionais/gi, "instruções operacionais (comandos do dia a dia)"],
    [/manual de calibragem biológica e social/gi, "manual de calibragem (ajuste de parâmetros do sistema social)"],
    [/protocolo de dez fundamentos/gi, "protocolo (API de dez regras-base)"],
    [/protocolos de cooperação/gi, "protocolos de cooperação (regras de rede entre pessoas)"],
    [/A lei é biologia aplicada/gi, "A lei é biologia aplicada (runtime do comportamento humano)"],
    [/sistema de valores unificado/gi, "sistema de valores unificado (configuração única de prioridades)"],
    [/protocolo de manutenção do sistema operacional biológico/gi, "protocolo de manutenção (rotina de descanso do sistema operacional biológico)"],
    [/protocolo de decodificação do trauma transgeracional/gi, "protocolo de decodificação (engenharia reversa da herança familiar)"],
    [/protocolo de integridade do sistema de recompensa/gi, "protocolo de integridade (regra anti-corrupção do circuito de recompensa)"],
    [/sistema de informação coletivo/gi, "sistema de informação coletivo (banco de dados compartilhado da comunidade)"],
    [/estado de mínimo esforço cognitivo/gi, "estado de mínimo esforço cognitivo (modo low-power da mente)"],
    [/higiene neurológica/gi, "higiene neurológica (limpeza de loops mentais prejudiciais)"],
    [/equação mestre/gi, "equação mestre (função principal que resume as demais regras)"],
    [/compressão do código ao seu núcleo irredutível/gi, "compressão do código ao núcleo irredutível (refatoração até a regra essencial)"],
    [/Revelou o algoritmo que os gerou/gi, "Revelou o algoritmo que os gerou (lógica-mãe por trás das regras)"],
    [/bio-hack primitivo/gi, "bio-hack primitivo (otimização manual antes dos laboratórios)"],
    [/protocolo original de ativação/gi, "protocolo original de ativação (script de calma coletiva)"],
    [/Default Mode Network \(DMN\)/g, "rede de modo padrão do cérebro (idle loop — ruminação automática)"],
    [/programação neural/gi, "programação neural (gravação de hábitos no firmware mental)"],
    [/dosagem neural/gi, "dosagem neural (quantidade calibrada de repetições)"],
  ];
  let out = texto;
  for (const [re, rep] of map) out = out.replace(re, rep);
  return out;
}

function linhaEhTitulo(l) {
  const t = l.trim();
  if (!t) return false;
  if (/^\d+\.\s/.test(t)) return true;
  if (/^MANDAMENTO \d+/i.test(t)) return true;
  if (/^(ETIMOLOGIA|LEITURA RACIONAL|CIÊNCIA|NEUROCIÊNCIA|EPIGENÉTICA|SÍNTESE RCT|SÍNTESE PRÁTICA|CONVERGÊNCIA|MATEUS|PRÓXIMO)/i.test(t)) return true;
  if (t.length < 90 && !t.endsWith(".") && !t.endsWith(",") && !t.endsWith(";")) return true;
  return false;
}

function textoParaHtml(raw) {
  const enriched = enriquecer(raw);
  const linhas = enriched.split(/\n/).map((l) => l.trim()).filter(Boolean);

  const partes = [];
  let buffer = [];

  const flush = (tag = "p") => {
    if (!buffer.length) return;
    const texto = buffer.join(" ").replace(/&quot;/g, '"');
    if (tag === "h2") partes.push(`<h2>${texto}</h2>`);
    else if (tag === "h3") partes.push(`<h3>${texto}</h3>`);
    else partes.push(`<p>${texto}</p>`);
    buffer = [];
  };

  for (const linha of linhas) {
    if (/^(RCT —|CATEGORIA:|Artigo \d+|META |SLUG|TAGS|TEMPO |PALAVRA|RASCUNHO|#)/i.test(linha)) continue;
    if (/^PRÓXIMO ARTIGO/i.test(linha)) break;
    if (/^Nº\s*Mandamento/i.test(linha)) continue;

    if (/^MANDAMENTO \d+/i.test(linha)) {
      flush();
      partes.push(`<h3>${linha}</h3>`);
      continue;
    }
    if (/^(ETIMOLOGIA|LEITURA RACIONAL|CIÊNCIA|NEUROCIÊNCIA|EPIGENÉTICA|SÍNTESE RCT|SÍNTESE PRÁTICA|CONVERGÊNCIA)$/i.test(linha)) {
      flush();
      partes.push(`<p><strong>${linha}</strong></p>`);
      continue;
    }
    if (/^\d+\.\s/.test(linha)) {
      flush();
      partes.push(`<h2>${linha}</h2>`);
      continue;
    }
    if (linhaEhTitulo(linha) && linha.length < 120 && !linha.includes("—")) {
      flush();
      partes.push(`<h3>${linha}</h3>`);
      continue;
    }

    buffer.push(linha);
    if (buffer.join(" ").length > 900) flush();
  }
  flush();

  const tabela = `
<table>
<thead><tr><th>Nº</th><th>Regra</th><th>Mecanismo</th></tr></thead>
<tbody>
<tr><td>01</td><td>Não terás outros deuses</td><td>Prioridade-âncora — como mantra que treina foco único (sem multitarefa moral)</td></tr>
<tr><td>02</td><td>Não tomarás o nome em vão</td><td>Linguagem molda redes neurais (input com peso semântico)</td></tr>
<tr><td>03</td><td>Guardar o dia de descanso</td><td>Ritmo circadiano e autofagia (manutenção programada)</td></tr>
<tr><td>04</td><td>Honrar pai e mãe</td><td>Apego seguro reduz cortisol (herança de configuração emocional)</td></tr>
<tr><td>05</td><td>Não matar</td><td>Ahimsa — coerência cardíaca máxima (modo não-agressivo)</td></tr>
<tr><td>06</td><td>Não pecar contra a castidade</td><td>Integridade do vínculo (regra de exclusividade no circuito de apego)</td></tr>
<tr><td>07</td><td>Não roubar</td><td>Confiança social (integridade do repositório comum)</td></tr>
<tr><td>08</td><td>Não mentir</td><td>Honestidade = mínimo esforço cognitivo (sem processos paralelos de mentira)</td></tr>
<tr><td>09–10</td><td>Não cobiçar</td><td>Higiene neurológica (evitar loops de comparação social)</td></tr>
</tbody>
</table>`;

  const intro = `<p class="lead">Durante 3.500 anos, os Dez Mandamentos foram ensinados como regras morais distantes — aceitas pela fé ou rejeitadas pela razão. Hoje podemos lê-los como um <strong>código-fonte biológico</strong> (programa que o corpo executa): não para substituir a fé, mas para confirmá-la com mais precisão.</p>
<p>Este é o primeiro artigo da série <em>Mandamentos</em> da RCT. Onde as palavras antigas parecem obscuras, a etimologia ilumina; onde a etimologia abre a porta, a ciência entra com precisão.</p>`;

  const idx = partes.findIndex((p) => p.includes("3. Os Dez Mandamentos"));
  if (idx >= 0) {
    partes.splice(idx + 1, 0, tabela);
  } else {
    partes.unshift(tabela);
  }

  return intro + partes.join("\n");
}

loadEnv();

const rawPath = resolve("scripts/content/artigo01-raw.txt");
if (!existsSync(rawPath)) {
  console.error("Arquivo ausente:", rawPath);
  process.exit(1);
}

const raw = readFileSync(rawPath, "utf8");
const conteudo_html = textoParaHtml(raw);

const artigo = {
  titulo: "Os 10 Mandamentos do Oriente Médio: o código de sobrevivência que atravessou 3.500 anos",
  subtitulo: "Epigenética · Neurociência · Biofísica · Etimologia",
  slug: "10-mandamentos-oriente-medio-ciencia-epigenetica",
  categoria: "mandamentos",
  tags: [
    "epigenética",
    "neurociência",
    "mandamentos",
    "Jesus",
    "Ahimsa",
    "Oriente Médio",
    "biofísica",
  ],
  meta_descricao:
    "Como neurociência e epigenética leem os Dez Mandamentos como código de sobrevivência biológica — convergência entre lei antiga e ciência moderna.",
  tempo_leitura: "14 minutos",
  conteudo_html,
};

const prisma = new PrismaClient();

try {
  const existente = await prisma.artigo.findUnique({ where: { slug: artigo.slug } });
  if (existente) {
    await prisma.artigo.update({
      where: { slug: artigo.slug },
      data: artigo,
    });
    console.log("✓ Artigo 01 atualizado:", artigo.titulo);
  } else {
    await prisma.artigo.create({ data: artigo });
    console.log("✓ Artigo 01 publicado:", artigo.titulo);
  }
  console.log("  /blog/" + artigo.slug);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  const cronSecret = process.env.CRON_SECRET;
  if (siteUrl && cronSecret) {
    const res = await fetch(`${siteUrl}/api/cron/revalidate-blog`, {
      headers: { Authorization: `Bearer ${cronSecret}` },
    });
    if (res.ok) console.log("✓ Cache do blog invalidado na borda");
    else console.warn("⚠ Revalidação remota:", res.status);
  }
} catch (e) {
  console.error("Erro:", e.message);
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
