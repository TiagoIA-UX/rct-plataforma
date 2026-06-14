import { getBannerArtigo } from "@/lib/rct-blog";

interface Props {
  categoria: string;
  titulo?: string;
  slug?: string;
  /** hero = página do artigo; compact = listagens */
  variant?: "hero" | "compact";
  priority?: boolean;
  className?: string;
}

export function BannerArtigo({
  categoria,
  titulo,
  slug,
  variant = "hero",
  priority = false,
  className = "",
}: Props) {
  const banner = getBannerArtigo(categoria, titulo, slug);
  const isHero = variant === "hero";

  return (
    <figure className={`overflow-hidden rounded-sm ${className}`}>
      <div
        className={`relative w-full bg-[rgba(26,39,68,0.5)] ${
          isHero ? "aspect-[21/9] min-h-[200px]" : "aspect-[16/9]"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={banner.src}
          alt={banner.alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#0d1520] via-[rgba(13,21,32,0.45)] to-transparent"
          aria-hidden
        />
        <div className={`absolute inset-x-0 bottom-0 ${isHero ? "p-6 md:p-8" : "p-4"}`}>
          <span
            className={`inline-block rounded-sm border border-[rgba(200,169,81,0.35)] bg-[rgba(13,21,32,0.65)] font-[family-name:var(--font-jetbrains)] uppercase tracking-widest text-[var(--sacred-gold)] backdrop-blur-sm ${
              isHero ? "px-3 py-1 text-xs" : "px-2 py-0.5 text-[10px]"
            }`}
          >
            {banner.label}
          </span>
          {isHero && (
            <p className="mt-3 max-w-xl text-sm text-[rgba(248,246,240,0.85)] md:text-base">
              {banner.frase}
            </p>
          )}
        </div>
      </div>
      {isHero && (
        <figcaption className="mt-2 text-right font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
          Foto: {banner.credito}
        </figcaption>
      )}
    </figure>
  );
}
