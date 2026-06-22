import { ImageResponse } from "next/og";
import { MARCA_NOME } from "@/lib/identidade";
import { buscarArtigoPorSlug, resolverImagemArtigo } from "@/lib/rct-blog.server";

export const alt = "Artigo — Instituto NEUMA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

/** Imagem OG gerada no domínio — preview consistente em LinkedIn/Facebook/X. */
export default async function OpenGraphImage({ params }: Props) {
  const { slug } = await params;
  const artigo = await buscarArtigoPorSlug(slug);

  const titulo = artigo?.titulo ?? MARCA_NOME;
  const subtitulo =
    artigo?.meta_descricao?.trim() ||
    artigo?.subtitulo?.trim() ||
    "Compreensão · Consciência · Transformação";

  const img = artigo
    ? resolverImagemArtigo(
        artigo.image_url,
        artigo.image_credit,
        artigo.categoria,
        0,
        artigo.titulo,
        artigo.slug
      )
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "linear-gradient(135deg, #0d1520 0%, #1a2744 55%, #205d67 100%)",
          position: "relative",
        }}
      >
        {img?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.url}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(13,21,32,0.95) 0%, rgba(13,21,32,0.4) 55%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            padding: "48px 56px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 22,
              color: "#c4b08a",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {MARCA_NOME}
          </div>
          <div
            style={{
              fontSize: 52,
              fontWeight: 700,
              color: "#f8f6f0",
              lineHeight: 1.15,
              maxWidth: 1000,
            }}
          >
            {titulo.length > 90 ? `${titulo.slice(0, 87)}…` : titulo}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "rgba(248,246,240,0.85)",
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            {subtitulo.length > 140 ? `${subtitulo.slice(0, 137)}…` : subtitulo}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
