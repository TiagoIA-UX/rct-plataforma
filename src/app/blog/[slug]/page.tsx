import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BannerArtigo } from "@/components/blog/BannerArtigo";
import { BlocoBencaoMaldicaoFallback } from "@/components/blog/BlocoBencaoMaldicao";
import { CitacaoParalela } from "@/components/blog/CitacaoParalela";
import { CompartilharArtigo } from "@/components/blog/CompartilharArtigo";
import { NewsletterBlog } from "@/components/blog/NewsletterBlog";
import {
  buscarArtigoPorSlug,
  listarSlugsPublicados,
  resolverImagemArtigo,
} from "@/lib/rct-blog.server";
import { metadataArtigo } from "@/lib/seo-artigo";

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

  const img = resolverImagemArtigo(
    artigo.image_url,
    artigo.image_credit,
    artigo.categoria,
    0,
    artigo.titulo,
    artigo.slug
  );

  return metadataArtigo({
    slug,
    titulo: artigo.titulo,
    subtitulo: artigo.subtitulo,
    meta_descricao: artigo.meta_descricao,
    created_at: artigo.created_at,
    imagem: img,
  });
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const artigo = await buscarArtigoPorSlug(slug);

  if (!artigo || !artigo.publicado) notFound();

  const img = resolverImagemArtigo(
    artigo.image_url,
    artigo.image_credit,
    artigo.categoria,
    0,
    artigo.titulo,
    artigo.slug
  );

  return (
    <article className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/blog"
          className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[rgba(248,246,240,0.5)] hover:text-[var(--sacred-gold)]"
        >
          ← Blog
        </Link>

        <BannerArtigo
          categoria={artigo.categoria}
          titulo={artigo.titulo}
          slug={artigo.slug}
          variant="hero"
          priority
          className="mt-6"
        />

        <h1 className="mt-8 font-[family-name:var(--font-cormorant)] text-4xl text-[var(--pure-white)] md:text-5xl">
          {artigo.titulo}
        </h1>
        {artigo.subtitulo && (
          <p className="mt-4 text-xl text-[var(--sacred-gold)]">{artigo.subtitulo}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-[rgba(248,246,240,0.4)] font-[family-name:var(--font-jetbrains)]">
          {artigo.tempo_leitura && <span>{artigo.tempo_leitura}</span>}
          {artigo.nivel && artigo.nivel !== "abertura" && (
            <span className="uppercase tracking-widest">
              Nível: {artigo.nivel}
            </span>
          )}
          <span>{new Date(artigo.created_at).toLocaleDateString("pt-BR")}</span>
        </div>

        {artigo.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {artigo.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-sm border border-[rgba(200,169,81,0.2)] px-2 py-0.5 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[rgba(200,169,81,0.6)]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="prose-rct mt-12"
          dangerouslySetInnerHTML={{ __html: artigo.conteudo_html }}
        />

        <BlocoBencaoMaldicaoFallback
          categoria={artigo.categoria}
          conteudoHtml={artigo.conteudo_html}
        />

        <CitacaoParalela slug={slug} />

        {/* Compartilhar */}
        <CompartilharArtigo
          titulo={artigo.titulo}
          slug={artigo.slug}
          subtitulo={artigo.subtitulo}
          metaDescricao={artigo.meta_descricao}
          imagemUrl={img.url}
          imagemAlt={img.alt}
          socialInstagram={artigo.social_instagram}
          socialFacebook={artigo.social_facebook}
          socialLinkedin={artigo.social_linkedin}
          socialTwitter={artigo.social_twitter}
        />

        {/* Newsletter */}
        <NewsletterBlog />
      </div>
    </article>
  );
}
