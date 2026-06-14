import Link from "next/link";
import { BannerArtigo } from "@/components/blog/BannerArtigo";
import { CATEGORIA_LABELS } from "@/lib/categorias";
import { listarArtigosRecentes } from "@/lib/db/artigos";
import { RCT_DESCRICAO_PADRAO } from "@/lib/identidade";

export async function BlogGrid() {
  let artigos: Awaited<ReturnType<typeof listarArtigosRecentes>> = [];

  try {
    artigos = await listarArtigosRecentes(6);
  } catch {
    artigos = [];
  }

  return (
    <section className="px-6 py-24 gradient-life">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)]">
          Artigos para ler com calma
        </h2>
        <p className="mt-4 max-w-2xl text-[rgba(248,246,240,0.75)]">
          {RCT_DESCRICAO_PADRAO} Com autor e referência em cada ensinamento.
        </p>

        {artigos.length === 0 ? (
          <p className="mt-12 card-sacred rounded-sm p-8 text-[rgba(248,246,240,0.6)]">
            Os primeiros artigos estão sendo gerados. Retorne em breve.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {artigos.map((artigo) => (
              <article key={artigo.id} className="card-sacred overflow-hidden rounded-sm">
                <Link href={`/blog/${artigo.slug}`} className="block">
                  <BannerArtigo
                    categoria={artigo.categoria}
                    titulo={artigo.titulo}
                    slug={artigo.slug}
                    variant="compact"
                  />
                </Link>
                <div className="p-6">
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
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
