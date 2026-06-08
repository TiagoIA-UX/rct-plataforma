import Link from "next/link";
import { BannerArtigo } from "@/components/blog/BannerArtigo";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { CATEGORIA_LABELS, CATEGORIAS_BLOG } from "@/lib/categorias";
import { listarArtigosPublicados } from "@/lib/db/artigos";
import { IMAGENS } from "@/lib/imagens";

/** ISR — ver CACHE_TTL.blog em src/lib/cache.ts */
export const revalidate = 3600;

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  let artigos: Awaited<ReturnType<typeof listarArtigosPublicados>> = [];
  try {
    artigos = await listarArtigosPublicados(categoria);
  } catch {
    artigos = [];
  }

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-4xl">
        <ImagemConteudo
          src={IMAGENS.blog.src}
          alt={IMAGENS.blog.alt}
          credito={IMAGENS.blog.credito}
          className="mb-10"
        />
        <h1 className="font-[family-name:var(--font-cormorant)] text-4xl text-[var(--sacred-gold)]">
          Blog
        </h1>
        <p className="mt-4 text-[rgba(248,246,240,0.75)]">
          Artigos que dialogam com a neurociência comportamental — memória, emoção, hábitos
          e vínculos sociais — sempre com tradição cristã e referência publicada.
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`btn-secondary text-xs px-3 py-1 ${!categoria ? "opacity-100" : "opacity-60"}`}
          >
            Todos
          </Link>
          {CATEGORIAS_BLOG.map((slug) => (
            <Link
              key={slug}
              href={`/blog?categoria=${slug}`}
              className={`btn-secondary text-xs px-3 py-1 ${categoria === slug ? "opacity-100" : "opacity-60"}`}
            >
              {CATEGORIA_LABELS[slug]}
            </Link>
          ))}
        </div>

        <div className="mt-12 space-y-6">
          {artigos.length === 0 ? (
            <p className="card-sacred p-8 text-[rgba(248,246,240,0.6)]">
              Os primeiros artigos estão sendo preparados. Retorne em breve.
            </p>
          ) : (
            artigos.map((a) => (
              <article key={a.id} className="card-sacred overflow-hidden rounded-sm">
                <Link href={`/blog/${a.slug}`} className="block">
                  <BannerArtigo
                    categoria={a.categoria}
                    titulo={a.titulo}
                    variant="compact"
                  />
                </Link>
                <div className="p-6">
                  <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
                    {CATEGORIA_LABELS[a.categoria] ?? a.categoria}
                  </span>
                  <h2 className="mt-2 text-2xl">
                    <Link href={`/blog/${a.slug}`}>{a.titulo}</Link>
                  </h2>
                  {a.subtitulo && <p className="mt-2 text-sm opacity-75">{a.subtitulo}</p>}
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
