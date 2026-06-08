import { AVISO_LEITURA_COMPLEMENTAR } from "@/lib/salvaguardas";

export function AvisoLeituraComplementar({ className = "" }: { className?: string }) {
  return (
    <p
      className={`font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.55)] ${className}`}
    >
      {AVISO_LEITURA_COMPLEMENTAR}
    </p>
  );
}
