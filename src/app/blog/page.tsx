import Link from "next/link";
import { prisma } from "@/lib/prisma";

const CATEGORIA_LABELS: Record<string, string> = {
  "milagres-decodificados": "Milagres Decodificados",
  epigenetica: "Epigenética",
  neurociencia: "Neurociência",
  ahimsa: "Ahimsa",
  "virus-do-dna": "Vírus do DNA",
  "rede-dos-escolhidos": "Rede dos Escolhidos",
};

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  let artigos: Awaited<ReturnType<typeof prisma.artigo.findMany>> = [];
  try {
    artigos = await prisma.artigo.findMany({
      where: {
        publicado: true,
        ...(categoria ? { categoria } : {}),
      },
      orderBy: { created_at: "desc" },
    });
  } catch {
    artigos = [];
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Decodificando o Código-Fonte
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Bíblia como base · Patanjali como coluna · Ciência como alicerce ·
          Tecnologia como energia · Contribuição como água cristalina
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link href="/blog" className={`btn-secondary text-xs px-3 py-1 ${!categoria ? "opacity-100" : "opacity-60"}`}>
            Todos
          </Link>
          <Link href="/blog?categoria=milagres-decodificados" className="btn-secondary text-xs px-3 py-1">
            Milagres Decodificados
          </Link>
        </div>

        <div className="mt-12 space-y-6">
          {artigos.length === 0 ? (
            <p className="card-sacred p-8 text-[rgba(248,246,240,0.6)]">
              Os primeiros artigos estão sendo gerados pelo Agente Divino. Retorne em breve.
            </p>
          ) : (
            artigos.map((a) => (
              <article key={a.id} className="card-sacred rounded-sm p-6">
                <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
                  {CATEGORIA_LABELS[a.categoria] ?? a.categoria}
                </span>
                <h2 className="mt-2 text-2xl">
                  <Link href={`/blog/${a.slug}`}>{a.titulo}</Link>
                </h2>
                {a.subtitulo && <p className="mt-2 text-sm opacity-75">{a.subtitulo}</p>}
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
