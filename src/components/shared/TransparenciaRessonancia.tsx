import { TEXTO_TRANSPARENCIA_RESSONANCIA } from "@/lib/salvaguardas";

export function TransparenciaRessonancia({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs leading-relaxed text-[rgba(248,246,240,0.45)] ${className}`}>
      {TEXTO_TRANSPARENCIA_RESSONANCIA}
    </p>
  );
}
