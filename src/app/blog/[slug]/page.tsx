import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { buscarArtigoPorSlug, listarSlugsPublicados } from "@/lib/db/artigos";

/** ISR — ver CACHE_TTL.blog em src/lib/cache.ts */
export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    const slugs = await listarSlugsPublicados();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await buscarArtigoPorSlug(slug);
  if (!artigo) return { title: "Artigo não encontrado" };
  return {
    title: artigo.titulo,
    description: artigo.meta_descricao ?? artigo.subtitulo ?? undefined,
  };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await buscarArtigoPorSlug(slug);

  if (!artigo || !artigo.publicado) notFound();

  return (
    <article className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm">
          ← Voltar
        </Link>
        <p className="mt-6 font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
          {artigo.categoria}
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          {artigo.titulo}
        </h1>
        {artigo.subtitulo && (
          <p className="mt-4 text-xl text-[var(--sacred-gold)]">{artigo.subtitulo}</p>
        )}
        {artigo.tempo_leitura && (
          <p className="mt-4 text-sm text-[rgba(248,246,240,0.5)]">{artigo.tempo_leitura}</p>
        )}
        <div
          className="prose-rct mt-12"
          dangerouslySetInnerHTML={{ __html: artigo.conteudo_html }}
        />
      </div>
    </article>
  );
}
