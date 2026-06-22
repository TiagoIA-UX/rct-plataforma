#!/usr/bin/env node
/**
 * Aplica títulos/categorias NEUMA no banco e exporta JSON estático.
 * Oculta artigos legados da home via filtro (artigo-legado.ts).
 *
 * Uso:
 *   node scripts/migrar-titulos-neuma.mjs
 *   node scripts/migrar-titulos-neuma.mjs --despublicar-legado
 */

import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { PrismaClient } from "@prisma/client";

const ROOT = resolve(".");

const SLUGS_LEGADO_DUPLICADOS = [
  "jesus-aos-12-anos",
  "jesus-aos-12-anos-no-templo-dharana-dhyana-e-o-samadhi",
  "jesus-12-anos-templo-dharana-dhyana-samadhi",
];

const MIGRACOES = {
  "jesus-aos-12-anos-no-temple": {
    titulo: "Jesus aos 12 anos no Templo: o que o relato revela sobre atenção e pertencimento",
    subtitulo: "Lucas 2:46-52 · desenvolvimento humano · escuta e presença",
    categoria: "jesus-transformacao",
  },
  "paulo-espinho-na-carne-ciencia-e-biblia": {
    titulo: "Paulo e o Espinho na Carne: como o sofrimento molda a mente humana",
    subtitulo: "Dor crônica, trauma e resiliência — 2 Coríntios 12 · leitura neurocomportamental",
    categoria: "jesus-transformacao",
  },
};

const LEGADO_RX =
  /\b(yogue|yogui|iogue|samadhi|dharana|dhyana|grande[- ]yogue)\b/i;

function loadEnv() {
  const path = resolve(".env.local");
  if (!existsSync(path)) {
    console.error("DATABASE_URL ausente — configure .env.local");
    process.exit(1);
  }
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i > 0) process.env[t.slice(0, i)] = t.slice(i + 1);
  }
}

async function main() {
  loadEnv();
  const despublicar = process.argv.includes("--despublicar-legado");
  const prisma = new PrismaClient();

  for (const [slug, dados] of Object.entries(MIGRACOES)) {
    const existe = await prisma.artigo.findUnique({ where: { slug } });
    if (!existe) {
      console.warn(`⚠ slug não encontrado: ${slug}`);
      continue;
    }
    await prisma.artigo.update({
      where: { slug },
      data: {
        ...dados,
        pendente_revisao: true,
        updated_at: new Date(),
      },
    });
    console.log(`✅ Título NEUMA: ${slug}`);
  }

  for (const slug of SLUGS_LEGADO_DUPLICADOS) {
    const existe = await prisma.artigo.findUnique({ where: { slug } });
    if (!existe) continue;
    await prisma.artigo.update({
      where: { slug },
      data: { publicado: false, pendente_revisao: true },
    });
    console.log(`🚫 Despublicado (duplicado legado): ${slug}`);
  }

  if (despublicar) {
    const legados = await prisma.artigo.findMany({ where: { publicado: true } });
    for (const a of legados) {
      const cab = `${a.titulo}\n${a.subtitulo ?? ""}`;
      if (LEGADO_RX.test(cab)) {
        await prisma.artigo.update({
          where: { slug: a.slug },
          data: { publicado: false, pendente_revisao: true },
        });
        console.log(`🚫 Despublicado (legado): ${a.slug}`);
      }
    }
  }

  const publicados = await prisma.artigo.findMany({
    where: { publicado: true },
    orderBy: { created_at: "desc" },
  });
  const out = resolve("src/data/artigos-publicados.json");
  writeFileSync(out, JSON.stringify(publicados, null, 2), "utf8");
  console.log(`\n✅ Export: ${publicados.length} artigo(s) → src/data/artigos-publicados.json`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
