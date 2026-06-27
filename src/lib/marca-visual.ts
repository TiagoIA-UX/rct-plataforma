/** Paleta visual Instituto NEUMA — Tiago Rocha */
export const MARCA_TEAL = "#1d656e";
export const MARCA_TEAL_CLARO = "#236570";
export const MARCA_OURO_MARCA = "#c4b08a";

/** N estilizado (favicon + emblema) — traço com cantos arredondados, legível em 16px */
export const NEUMA_N_PATH = "M9 24V8L23 24V8";

/** Espessura do traço do N no viewBox 32 */
export const NEUMA_N_STROKE = 4.5;

export const NEUMA_N_PONTO = { cx: 24.5, cy: 7.5, r: 2.5 };

export const NEUMA_SYMBOL_VIEWBOX = "0 0 32 32";

export function neumaDotRadius(size: number): number {
  return Math.max(1.8, (size / 32) * NEUMA_N_PONTO.r);
}
