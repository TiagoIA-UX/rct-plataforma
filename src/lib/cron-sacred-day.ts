/** Dia sagrado (sábado) — sem publicação automática de artigos */

const TZ = "America/Sao_Paulo";

export function isDiaSagrado(date = new Date()): boolean {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
  }).format(date);
  return weekday === "Sat";
}
