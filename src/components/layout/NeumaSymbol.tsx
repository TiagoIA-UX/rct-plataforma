"use client";

import {
  MARCA_OURO_MARCA,
  MARCA_TEAL_CLARO,
  NEUMA_N_PATH,
  NEUMA_N_PONTO,
  NEUMA_SYMBOL_VIEWBOX,
  neumaDotRadius,
} from "@/lib/marca-visual";

interface Props {
  size?: number;
  className?: string;
}

/** Emblema NEUMA — N estilizado + ponto ouro */
export function NeumaSymbol({ size = 32, className = "" }: Props) {
  const dotR = neumaDotRadius(size);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={NEUMA_SYMBOL_VIEWBOX}
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <path d={NEUMA_N_PATH} fill={MARCA_TEAL_CLARO} />
      <circle
        cx={NEUMA_N_PONTO.cx}
        cy={NEUMA_N_PONTO.cy}
        r={dotR}
        fill={MARCA_OURO_MARCA}
      />
    </svg>
  );
}
