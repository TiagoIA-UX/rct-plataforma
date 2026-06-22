"use client";

import { useMemo, useState } from "react";
import { trackShareArticle } from "@/lib/analytics";
import { hasAnalyticsConsent } from "@/components/legal/CookieConsent";
import {
  aplicarUrlNoTextoSocial,
  redeParaUtm,
  resolverTextoRede,
  urlArtigo,
  urlArtigoComUtm,
  urlFacebookShare,
  urlLinkedInShare,
  urlWhatsAppShare,
  urlXShare,
} from "@/lib/compartilhar-redes";

interface Props {
  titulo: string;
  slug: string;
  subtitulo?: string | null;
  metaDescricao?: string | null;
  imagemUrl?: string;
  imagemAlt?: string;
  socialInstagram?: string | null;
  socialFacebook?: string | null;
  socialLinkedin?: string | null;
  socialTwitter?: string | null;
}

type RedeId = "linkedin" | "facebook" | "x" | "whatsapp" | "instagram" | "link";

const REDES: {
  id: RedeId;
  nome: string;
  abrir?: (url: string, texto: string) => string;
  copiarAntes?: boolean;
  soCopiar?: boolean;
}[] = [
  { id: "linkedin", nome: "LinkedIn", abrir: urlLinkedInShare, copiarAntes: true },
  { id: "facebook", nome: "Facebook", abrir: urlFacebookShare, copiarAntes: true },
  { id: "x", nome: "X (Twitter)", abrir: (_, texto) => urlXShare(texto) },
  { id: "whatsapp", nome: "WhatsApp", abrir: (_, texto) => urlWhatsAppShare(texto) },
  { id: "instagram", nome: "Instagram", soCopiar: true },
  { id: "link", nome: "Copiar link", soCopiar: true },
];

export function CompartilharArtigo({
  titulo,
  slug,
  subtitulo,
  metaDescricao,
  imagemUrl,
  imagemAlt,
  socialInstagram,
  socialFacebook,
  socialLinkedin,
  socialTwitter,
}: Props) {
  const [copiado, setCopiado] = useState<RedeId | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  const origin = typeof window !== "undefined" ? window.location.origin : undefined;
  const urlCanonica = urlArtigo(slug, origin);
  const descricao = metaDescricao?.trim() || subtitulo?.trim() || titulo;

  const urlPorRede = useMemo(() => {
    const map = {} as Record<RedeId, string>;
    for (const rede of REDES) {
      map[rede.id] = urlArtigoComUtm(slug, redeParaUtm(rede.id), origin);
    }
    return map;
  }, [slug, origin]);

  const textos: Record<Exclude<RedeId, "link">, string> = useMemo(
    () => ({
      linkedin: resolverTextoRede(
        socialLinkedin,
        "linkedin",
        titulo,
        descricao,
        urlPorRede.linkedin
      ),
      facebook: resolverTextoRede(
        socialFacebook,
        "facebook",
        titulo,
        descricao,
        urlPorRede.facebook
      ),
      x: socialTwitter?.trim()
        ? aplicarUrlNoTextoSocial(socialTwitter, urlPorRede.x)
        : `${titulo}\n\n${urlPorRede.x}`,
      whatsapp: resolverTextoRede(null, "whatsapp", titulo, descricao, urlPorRede.whatsapp),
      instagram: resolverTextoRede(
        socialInstagram,
        "instagram",
        titulo,
        descricao,
        urlPorRede.instagram
      ),
    }),
    [
      socialLinkedin,
      socialFacebook,
      socialTwitter,
      socialInstagram,
      titulo,
      descricao,
      urlPorRede,
    ]
  );

  function registrarCompartilhamento(rede: RedeId) {
    if (!hasAnalyticsConsent()) return;
    trackShareArticle(slug, rede === "x" ? "twitter" : rede);
  }

  async function copiar(texto: string, rede: RedeId) {
    await navigator.clipboard.writeText(texto);
    setCopiado(rede);
    setTimeout(() => setCopiado(null), 2500);
  }

  async function acionarRede(rede: (typeof REDES)[number]) {
    if (rede.id === "link") {
      await copiar(urlPorRede.link, "link");
      registrarCompartilhamento("link");
      setAviso("Link copiado (com rastreamento UTM para analytics).");
      return;
    }

    const texto = textos[rede.id as Exclude<RedeId, "link">];
    const urlTrack = urlPorRede[rede.id];

    if (rede.soCopiar) {
      await copiar(texto, rede.id);
      registrarCompartilhamento(rede.id);
      setAviso(`Texto para ${rede.nome} copiado — cole no app.`);
      return;
    }

    if (rede.copiarAntes) {
      await copiar(texto, rede.id);
      setAviso(
        `Post pronto copiado. No ${rede.nome}, cole o texto — o preview com imagem e título aparece automaticamente pelo link.`
      );
    }

    registrarCompartilhamento(rede.id);

    if (rede.abrir) {
      window.open(rede.abrir(urlTrack, texto), "_blank", "noopener,noreferrer");
    }
  }

  return (
    <section className="mt-16 border-t border-[rgba(200,169,81,0.15)] pt-10">
      <h3 className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
        Publicar nas redes
      </h3>
      <p className="mt-2 text-sm text-[rgba(248,246,240,0.55)]">
        Preview profissional (imagem, título e descrição). Links incluem UTM para medir origem no
        Google Analytics. LinkedIn e Facebook copiam o texto pronto para colar no post.
      </p>

      {imagemUrl && (
        <div className="mt-6 overflow-hidden rounded-sm border border-[rgba(200,169,81,0.2)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imagemUrl}
            alt={imagemAlt ?? titulo}
            className="h-40 w-full object-cover opacity-90"
          />
          <div className="bg-[rgba(26,39,68,0.6)] px-4 py-3">
            <p className="font-[family-name:var(--font-cormorant)] text-lg text-[var(--pure-white)] line-clamp-2">
              {titulo}
            </p>
            {subtitulo && (
              <p className="mt-1 text-xs text-[rgba(248,246,240,0.6)] line-clamp-2">{subtitulo}</p>
            )}
            <p className="mt-2 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[rgba(200,169,81,0.5)]">
              Preview ao compartilhar o link
            </p>
          </div>
        </div>
      )}

      {aviso && (
        <p className="mt-4 rounded-sm border border-[rgba(200,169,81,0.25)] bg-[rgba(26,39,68,0.4)] px-4 py-3 text-sm text-[rgba(248,246,240,0.8)]">
          {aviso}
        </p>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {REDES.map((rede) => {
          const texto =
            rede.id === "link" ? urlPorRede.link : textos[rede.id as Exclude<RedeId, "link">];
          const ativo = copiado === rede.id;

          return (
            <div key={rede.id} className="card-sacred flex flex-col p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
                  {rede.nome}
                </span>
                <button
                  type="button"
                  onClick={() => copiar(texto, rede.id)}
                  className="shrink-0 text-[10px] uppercase tracking-wider text-[rgba(248,246,240,0.45)] hover:text-[var(--sacred-gold)]"
                >
                  {ativo ? "Copiado ✓" : "Copiar texto"}
                </button>
              </div>

              {rede.id !== "link" && (
                <p className="mt-3 flex-1 text-sm text-[rgba(248,246,240,0.65)] whitespace-pre-line line-clamp-5">
                  {texto}
                </p>
              )}

              {rede.id === "link" && (
                <p className="mt-3 truncate font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.5)]">
                  {urlCanonica}
                </p>
              )}

              <button
                type="button"
                onClick={() => acionarRede(rede)}
                className="btn-primary mt-4 w-full text-xs py-2"
              >
                {rede.soCopiar && rede.id !== "link"
                  ? `Copiar para ${rede.nome}`
                  : rede.id === "link"
                    ? ativo
                      ? "Link copiado ✓"
                      : "Copiar link"
                    : rede.copiarAntes
                      ? `Publicar no ${rede.nome}`
                      : `Abrir ${rede.nome}`}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
