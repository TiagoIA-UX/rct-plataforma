import { prisma } from "@/lib/prisma";

export type BlogTopic = {
  tema: string;
  referencia?: string;
  categoria: string;
  slug: string;
};

/** Artigo 01 é inserido manualmente (seed). A partir do 02, o cron gera via IA. */
export const SERIE_MANDAMENTOS_AUTO: BlogTopic[] = [
  {
    slug: "anjos-neuroplasticidade-agentes-codigo-fonte",
    tema:
      "Os anjos que serviam a Jesus: neuroplasticidade como agente divino e neurônios como mensageiros do código-fonte",
    referencia: "Evangelhos — ministério de Jesus",
    categoria: "mandamentos",
  },
];

export const SERIE_MILAGRES_AUTO: BlogTopic[] = [
  {
    slug: "milagre-cego-nascenca",
    tema: "O cego de nascença: herança epigenética e engenharia reversa do trauma",
    referencia: "João 9:1-7",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-paralitico-betesda",
    tema: "O paralítico de Betesda: ancoragem neuroergonômica e o comando 'Levanta-te e anda'",
    referencia: "João 5:2-9",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-filha-jairo",
    tema: "A filha de Jairo: nervo vago e a frase 'A menina não está morta, mas dorme'",
    referencia: "Marcos 5:35-43",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-endemoninhado",
    tema: "O endemoninhado: dissociação, amígdala hiperativa e libertação neural",
    referencia: "Marcos 5:1-20",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-mulher-fluxo",
    tema: "A mulher com fluxo de sangue: sistema imune, cortisol e toque com intenção",
    referencia: "Marcos 5:25-34",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-paes-peixes",
    tema: "Os pães e os peixes: sincronização neural coletiva e abundância compartilhada",
    referencia: "João 6:5-13",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-lazaro",
    tema: "A ressurreição de Lázaro: autofagia celular e o comando 'Lázaro, vem para fora'",
    referencia: "João 11:38-44",
    categoria: "milagres-decodificados",
  },
  {
    slug: "milagre-tempestade",
    tema: "A tempestade acalmada: coerência cardíaca reorganizando o grupo",
    referencia: "Marcos 4:35-41",
    categoria: "milagres-decodificados",
  },
];

const POOL_EXTRA = [
  "Ahimsa de Patanjali: não-violência e coerência cardíaca",
  "O nervo vago: respiração, calma e presença",
  "Autofagia e descanso: biologia do sábado e regeneração celular",
];

const FILA_SERIES = [...SERIE_MANDAMENTOS_AUTO, ...SERIE_MILAGRES_AUTO];

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
    categoria: "epigenetica",
    slug: slugs.has(slug) ? `${slug}-${Date.now()}` : slug,
  };
}
