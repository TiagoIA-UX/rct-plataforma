import { prisma } from "@/lib/prisma";

export type BlogTopic = {
  tema: string;
  referencia?: string;
  categoria: string;
  slug: string;
};

export const SERIE_JESUS_MESTRE: BlogTopic[] = [
  {
    slug: "jesus-12-anos-templo-oracao-concentracao-plena",
    tema:
      "Jesus aos 12 anos no Templo: oração com atenção plena e o que a neurociência explica sobre esse estado",
    referencia: "Lucas 2:46-47",
    categoria: "jesus-grande-yogue",
  },
];

export const SERIE_BIBLIA_NEUROCIENTIFICA: BlogTopic[] = [
  {
    slug: "romanos-2-14-gentios-praticam-lei-neurociencia-moral",
    tema:
      "Romanos 2:14 — gentios que praticam o bem sem lei escrita: neurociência moral e justificação pelas ações",
    referencia: "Romanos 2:14-16",
    categoria: "biblia-neurocientifica",
  },
  {
    slug: "mateus-21-28-parabola-dois-filhos-acoes-cerebro",
    tema:
      "Parábola dos dois filhos (Mateus 21:28-31): intenção versus ação — o que a ciência do comportamento observa",
    referencia: "Mateus 21:28-31",
    categoria: "biblia-neurocientifica",
  },
];

const POOL_EXTRA = [
  "João 17:21 e coerência cardíaca em oração comunitária",
  "O nervo vago: respiração, calma e presença cristã",
  "Cuidado da criação e bem-estar — Laudato si' e estudos em saúde ambiental",
];

const FILA_SERIES = [...SERIE_JESUS_MESTRE, ...SERIE_BIBLIA_NEUROCIENTIFICA];

/** @deprecated use SERIE_JESUS_MESTRE */
export const SERIE_JESUS_GRANDE_YOGUE = SERIE_JESUS_MESTRE;

export async function pickNextBlogTopic(): Promise<BlogTopic> {
  const existentes = await prisma.artigo.findMany({ select: { slug: true } });
  const slugs = new Set(existentes.map((a) => a.slug));

  for (const item of FILA_SERIES) {
    if (!slugs.has(item.slug)) return item;
  }

  const tema = POOL_EXTRA[Math.floor(Math.random() * POOL_EXTRA.length)];
  const slug = tema
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return {
    tema,
    categoria: "biblia-neurocientifica",
    slug: slugs.has(slug) ? `${slug}-${Date.now()}` : slug,
  };
}
