/** Paleta visual Instituto NEUMA — Tiago Rocha */
export const MARCA_TEAL = "#1d656e";
export const MARCA_TEAL_CLARO = "#236570";
export const MARCA_OURO_MARCA = "#c4b08a";

/** N estilizado (favicon + emblema) — legível em 16px */
export const NEUMA_N_PATH = "M6 26V6h5l10 12.5V6h5v20h-5L11 13.5V26H6z";

export const NEUMA_N_PONTO = { cx: 24, cy: 8, r: 2.5 };

export const NEUMA_SYMBOL_VIEWBOX = "0 0 32 32";

export function neumaDotRadius(size: number): number {
  return Math.max(1.8, (size / 32) * NEUMA_N_PONTO.r);
}
