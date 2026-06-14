import Link from "next/link";
import {
  listarArtigosPublicados,
  listarCategoriasComArtigos,
  resolverImagemArtigo,
} from "@/lib/rct-blog.server";
import { CATEGORIA_EM_CONSTRUCAO, labelCategoria } from "@/lib/categorias";
import { CategoriaEmConstrucao } from "@/components/blog/CategoriaEmConstrucao";
import { NewsletterBlog } from "@/components/blog/NewsletterBlog";
import { ImagemConteudo } from "@/components/shared/ImagemConteudo";
import { IMAGENS } from "@/lib/imagens";
import { MARCA_DESCRICAO } from "@/lib/identidade";

/** ISR — ver CACHE_TTL.blog em src/lib/cache.ts */
export const revalidate = 3600;
/** Evita cache CDN de lista vazia quando o banco oscila */
export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { categoria } = await searchParams;

  const categoriaNorm = categoria ? categoria : undefined;
  const emConstrucao = categoriaNorm === CATEGORIA_EM_CONSTRUCAO;

  const artigos = emConstrucao
    ? []
    : await listarArtigosPublicados(categoriaNorm);

  const categoriasFiltro = await listarCategoriasComArtigos();

  const [destaque, ...demais] = artigos;

  return (
    <div className="px-6 pt-32 pb-24">
      <div className="mx-auto max-w-5xl">
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
          {MARCA_DESCRICAO} Sempre com distinção clara entre ciência
          estabelecida e hipótese em estudo.
        </p>

        {/* Filtro de categorias */}
        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/blog"
            className={`btn-secondary text-xs px-3 py-1 ${!categoria ? "opacity-100" : "opacity-60"}`}
          >
            Todos
          </Link>
          {categoriasFiltro.map((slug) => {
            const href =
              slug === CATEGORIA_EM_CONSTRUCAO
                ? "/blog/biblia-neurocientifica"
                : `/blog?categoria=${slug}`;
            const ativo = categoria === slug || (slug === CATEGORIA_EM_CONSTRUCAO && emConstrucao);
            return (
              <Link
                key={slug}
                href={href}
                className={`btn-secondary text-xs px-3 py-1 ${ativo ? "opacity-100" : "opacity-60"}`}
              >
                {labelCategoria(slug)}
              </Link>
            );
          })}
        </div>

        {emConstrucao ? (
          <CategoriaEmConstrucao />
        ) : artigos.length === 0 ? (
          <p className="card-sacred mt-12 p-8 text-[rgba(248,246,240,0.6)]">
            Os primeiros artigos estão sendo preparados. Retorne em breve.
          </p>
        ) : (
          <>
            {/* Artigo em destaque */}
            {destaque && (
              <article className="card-sacred mt-12 overflow-hidden rounded-sm">
                {(() => {
                  const img = resolverImagemArtigo(
                    destaque.image_url,
                    destaque.image_credit,
                    destaque.categoria,
                    0,
                    destaque.titulo,
                    destaque.slug
                  );
                  return (
                    <Link href={`/blog/${destaque.slug}`} className="block">
                      <div className="relative aspect-[21/9] w-full overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.alt}
                          className="h-full w-full object-cover"
                          loading="eager"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520] via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6">
                          <span className="rounded-sm border border-[rgba(200,169,81,0.35)] bg-[rgba(13,21,32,0.65)] px-3 py-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)] backdrop-blur-sm">
                            {labelCategoria(destaque.categoria)}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
                          Em destaque
                        </p>
                        <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl">
                          {destaque.titulo}
                        </h2>
                        {destaque.subtitulo && (
                          <p className="mt-3 text-[rgba(248,246,240,0.7)]">{destaque.subtitulo}</p>
                        )}
                        <p className="mt-4 text-sm text-[rgba(248,246,240,0.5)]">
                          {destaque.tempo_leitura ?? "Leitura com calma"}
                        </p>
                      </div>
                    </Link>
                  );
                })()}
              </article>
            )}

            {/* Grade de demais artigos */}
            {demais.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {demais.map((artigo, idx) => {
                  const img = resolverImagemArtigo(
                    artigo.image_url,
                    artigo.image_credit,
                    artigo.categoria,
                    idx + 1,
                    artigo.titulo,
                    artigo.slug
                  );
                  return (
                    <article
                      key={artigo.id}
                      className="card-sacred overflow-hidden rounded-sm"
                    >
                      <Link href={`/blog/${artigo.slug}`} className="block">
                        <div className="relative aspect-[16/9] w-full overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.url}
                            alt={img.alt}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0d1520] via-transparent to-transparent" />
                        </div>
                        <div className="p-5">
                          <span className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)]">
                            {labelCategoria(artigo.categoria)}
                          </span>
                          <h3 className="mt-2 font-[family-name:var(--font-cormorant)] text-xl leading-snug">
                            {artigo.titulo}
                          </h3>
                          {artigo.subtitulo && (
                            <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)] line-clamp-2">
                              {artigo.subtitulo}
                            </p>
                          )}
                          {artigo.tempo_leitura && (
                            <p className="mt-3 text-xs text-[rgba(248,246,240,0.4)]">
                              {artigo.tempo_leitura}
                            </p>
                          )}
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Newsletter */}
        <NewsletterBlog />
      </div>
    </div>
  );
}
