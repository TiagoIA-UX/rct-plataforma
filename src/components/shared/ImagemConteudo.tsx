interface Props {
  src: string;
  alt: string;
  credito: string;
  className?: string;
  priority?: boolean;
}

/** Imagens externas via tag nativa — maior compatibilidade que otimizador remoto */
export function ImagemConteudo({ src, alt, credito, className = "", priority = false }: Props) {
  return (
    <figure className={`overflow-hidden rounded-sm ${className}`}>
      <div className="relative aspect-[16/9] w-full bg-[rgba(26,39,68,0.5)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <figcaption className="mt-2 text-right font-[family-name:var(--font-jetbrains)] text-[10px] text-[rgba(248,246,240,0.35)]">
        Foto: {credito}
      </figcaption>
    </figure>
  );
}
