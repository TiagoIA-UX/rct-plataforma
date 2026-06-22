/**
 * Fila editorial Mateus — 3 artigos/capítulo, equilíbrio 50/50 sofrimento/florescimento.
 */

import { prisma } from "@/lib/prisma";
import {
  CAPITULOS_MATEUS,
  montarJobMateus,
  ORDEM_TIPOS_POR_CAPITULO,
  type JobEditorialMateus,
} from "@/lib/mateus-modulo";
import { TAG_TIPO, type TipoArtigoModulo } from "@/lib/decodificacao-humana";

export async function slugsMateusExistentes(): Promise<Set<string>> {
  const rows = await prisma.artigo.findMany({
    where: { categoria: "mateus-transformacao" },
    select: { slug: true },
  });
  return new Set(rows.map((r) => r.slug));
}

/** Próximo job: primeiro capítulo/tipo ainda não gerado */
export async function pickNextMateusJob(): Promise<JobEditorialMateus | null> {
  const existentes = await slugsMateusExistentes();

  for (const cap of CAPITULOS_MATEUS) {
    for (const tipo of ORDEM_TIPOS_POR_CAPITULO) {
      const job = montarJobMateus(cap, tipo);
      if (!existentes.has(job.slug)) return job;
    }
  }
  return null;
}

/** Sugere tipo do dia para equilíbrio 50/50 (derivados only) */
export async function sugerirTipoDerivadoDia(): Promise<"sofrimento" | "florescimento"> {
  const recentes = await prisma.artigo.findMany({
    where: {
      categoria: "mateus-transformacao",
      tags: { hasSome: [TAG_TIPO.sofrimento, TAG_TIPO.florescimento] },
    },
    orderBy: { created_at: "desc" },
    take: 20,
    select: { tags: true },
  });

  let sofrimento = 0;
  let florescimento = 0;
  for (const a of recentes) {
    if (a.tags.includes(TAG_TIPO.sofrimento)) sofrimento++;
    if (a.tags.includes(TAG_TIPO.florescimento)) florescimento++;
  }

  if (sofrimento <= florescimento) return "sofrimento";
  return "florescimento";
}

/** Três jobs do dia: 1 capítulo completo ou próximos 3 pendentes */
export async function pickJobsMateusDia(limite = 3): Promise<JobEditorialMateus[]> {
  const jobs: JobEditorialMateus[] = [];
  const existentes = await slugsMateusExistentes();

  for (const cap of CAPITULOS_MATEUS) {
    for (const tipo of ORDEM_TIPOS_POR_CAPITULO) {
      const job = montarJobMateus(cap, tipo);
      if (!existentes.has(job.slug)) {
        jobs.push(job);
        if (jobs.length >= limite) return jobs;
      }
    }
  }
  return jobs;
}

export function descricaoJob(job: JobEditorialMateus): string {
  return `${job.tema} | ref: ${job.referencia} | slug: ${job.slug}`;
}
