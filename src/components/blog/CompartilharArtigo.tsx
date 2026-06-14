"use client";

import { useState } from "react";

interface Props {
  titulo: string;
  slug: string;
  socialInstagram?: string | null;
  socialFacebook?: string | null;
  socialLinkedin?: string | null;
  socialTwitter?: string | null;
}

export function CompartilharArtigo({
  titulo,
  slug,
  socialInstagram,
  socialFacebook,
  socialLinkedin,
  socialTwitter,
}: Props) {
  const [copiado, setCopiado] = useState<string | null>(null);

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_SITE_URL ?? "https://todos-sejam-um.vercel.app");

  const url = `${siteUrl}/blog/${slug}`;
  const textoBase = socialTwitter ?? `${titulo} — ${url}`;

  async function copiar(texto: string, chave: string) {
    await navigator.clipboard.writeText(texto);
    setCopiado(chave);
    setTimeout(() => setCopiado(null), 2000);
  }

  return (
    <section className="mt-16 border-t border-[rgba(200,169,81,0.15)] pt-10">
      <h3 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)] mb-6">
        Compartilhar este artigo
      </h3>

      <div className="flex flex-wrap gap-3">
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(textoBase)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs px-4 py-2"
        >
          X (Twitter)
        </a>

        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs px-4 py-2"
        >
          LinkedIn
        </a>

        <a
          href={`https://wa.me/?text=${encodeURIComponent(`${titulo} — ${url}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-xs px-4 py-2"
        >
          WhatsApp
        </a>

        <button
          type="button"
          onClick={() => copiar(url, "link")}
          className="btn-secondary text-xs px-4 py-2"
        >
          {copiado === "link" ? "Link copiado ✓" : "Copiar link"}
        </button>
      </div>

      {(socialInstagram || socialFacebook || socialLinkedin) && (
        <div className="mt-8 space-y-4">
          <p className="text-xs text-[rgba(248,246,240,0.4)] font-[family-name:var(--font-jetbrains)] uppercase tracking-widest">
            Textos prontos para redes sociais
          </p>

          {socialInstagram && (
            <div className="card-sacred p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--sacred-gold)] font-[family-name:var(--font-jetbrains)] uppercase tracking-widest">
                  Instagram
                </span>
                <button
                  type="button"
                  onClick={() => copiar(socialInstagram, "instagram")}
                  className="text-xs text-[rgba(248,246,240,0.4)] hover:text-[var(--sacred-gold)]"
                >
                  {copiado === "instagram" ? "Copiado ✓" : "Copiar"}
                </button>
              </div>
              <p className="text-sm text-[rgba(248,246,240,0.7)] whitespace-pre-line line-clamp-4">
                {socialInstagram}
              </p>
            </div>
          )}

          {socialFacebook && (
            <div className="card-sacred p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--sacred-gold)] font-[family-name:var(--font-jetbrains)] uppercase tracking-widest">
                  Facebook
                </span>
                <button
                  type="button"
                  onClick={() => copiar(socialFacebook, "facebook")}
                  className="text-xs text-[rgba(248,246,240,0.4)] hover:text-[var(--sacred-gold)]"
                >
                  {copiado === "facebook" ? "Copiado ✓" : "Copiar"}
                </button>
              </div>
              <p className="text-sm text-[rgba(248,246,240,0.7)] whitespace-pre-line line-clamp-4">
                {socialFacebook}
              </p>
            </div>
          )}

          {socialLinkedin && (
            <div className="card-sacred p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--sacred-gold)] font-[family-name:var(--font-jetbrains)] uppercase tracking-widest">
                  LinkedIn
                </span>
                <button
                  type="button"
                  onClick={() => copiar(socialLinkedin, "linkedin")}
                  className="text-xs text-[rgba(248,246,240,0.4)] hover:text-[var(--sacred-gold)]"
                >
                  {copiado === "linkedin" ? "Copiado ✓" : "Copiar"}
                </button>
              </div>
              <p className="text-sm text-[rgba(248,246,240,0.7)] whitespace-pre-line line-clamp-4">
                {socialLinkedin}
              </p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
