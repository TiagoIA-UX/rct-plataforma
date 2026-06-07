import Link from "next/link";
import { prisma } from "@/lib/prisma";

const CATEGORIA_LABELS: Record<string, string> = {
  epigenetica: "Epigenética",
  neurociencia: "Neurociência",
  ahimsa: "Ahimsa",
  "milagres-decodificados": "Milagres Decodificados",
  "virus-do-dna": "Vírus do DNA",
  "rede-dos-escolhidos": "Rede dos Escolhidos",
};

export async function BlogGrid() {
  let artigos: Awaited<ReturnType<typeof prisma.artigo.findMany>> = [];

  try {
    artigos = await prisma.artigo.findMany({
      where: { publicado: true },
      orderBy: { created_at: "desc" },
      take: 6,
    });
  } catch {
    artigos = [];
  }

  return (
    <section className="px-6 py-24 gradient-life">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)]">
          Decodificando o Código-Fonte
        </h2>
        <p className="mt-4 max-w-2xl text-[rgba(248,246,240,0.75)]">
          Artigos gerados com rigor científico — epigenética, neurociência e Ahimsa
          em linguagem verificável.
        </p>

        {artigos.length === 0 ? (
          <p className="mt-12 card-sacred rounded-sm p-8 text-[rgba(248,246,240,0.6)]">
            Os primeiros artigos estão sendo gerados. Retorne em breve.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artigos.map((artigo) => (
              <article key={artigo.id} className="card-sacred rounded-sm p-6">
                <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
                  {CATEGORIA_LABELS[artigo.categoria] ?? artigo.categoria}
                </span>
                <h3 className="mt-3 text-xl text-[var(--pure-white)]">{artigo.titulo}</h3>
                {artigo.subtitulo && (
                  <p className="mt-2 text-sm text-[rgba(248,246,240,0.65)]">{artigo.subtitulo}</p>
                )}
                <Link
                  href={`/blog/${artigo.slug}`}
                  className="mt-4 inline-block text-sm font-semibold"
                >
                  Ler artigo →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
