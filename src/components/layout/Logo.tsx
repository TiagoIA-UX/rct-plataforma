import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import { MARCA_NOME, MARCA_PILAR } from "@/lib/identidade";

interface Props {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: Props) {
  const isHeader = variant === "header";

  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-90"
      aria-label={`${MARCA_NOME} — página inicial`}
    >
      <LogoMark size={isHeader ? 36 : 32} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-cormorant)] font-semibold tracking-[0.06em] text-[var(--pure-white)] ${
            isHeader ? "text-xl md:text-2xl" : "text-lg"
          }`}
        >
          {MARCA_NOME}
        </span>
        <span className="mt-1 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.14em] text-[var(--sacred-gold)] opacity-90">
          {MARCA_PILAR}
        </span>
      </span>
    </Link>
  );
}
