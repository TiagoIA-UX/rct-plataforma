import {
  MARCA_OURO_MARCA,
  MARCA_TEAL,
  MARCA_TEAL_CLARO,
  NEUMA_ICON_N,
  NEUMA_ICON_VIEWBOX,
  NEUMA_ONDA_OURO,
  NEUMA_ONDA_PONTO,
  NEUMA_ONDA_TEAL,
  NEUMA_SYMBOL_VIEWBOX,
} from "@/lib/marca-visual";

interface Props {
  variant?: "full" | "icon";
  size?: number;
  className?: string;
}

/**
 * Símbolo NEUMA — onda + ponto dourado (logo) ou N geométrico (favicon).
 */
export function NeumaSymbol({ variant = "full", size = 44, className = "" }: Props) {
  if (variant === "icon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={NEUMA_ICON_VIEWBOX}
        width={size}
        height={size}
        className={className}
        aria-hidden="true"
      >
        <path d={NEUMA_ICON_N} fill={MARCA_TEAL} />
      </svg>
    );
  }

  const stroke = size >= 36 ? 4.5 : 3.5;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={NEUMA_SYMBOL_VIEWBOX}
      width={size}
      height={Math.round(size * (68 / 64))}
      className={className}
      aria-hidden="true"
    >
      <path
        d={NEUMA_ONDA_TEAL}
        fill="none"
        stroke={MARCA_TEAL_CLARO}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={NEUMA_ONDA_OURO}
        fill="none"
        stroke={MARCA_OURO_MARCA}
        strokeWidth={stroke}
        strokeLinecap="round"
      />
      <circle
        cx={NEUMA_ONDA_PONTO.cx}
        cy={NEUMA_ONDA_PONTO.cy}
        r={NEUMA_ONDA_PONTO.r}
        fill={MARCA_OURO_MARCA}
      />
    </svg>
  );
}
