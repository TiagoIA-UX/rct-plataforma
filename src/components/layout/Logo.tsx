import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";
import {
  MARCA_NOME,
  MARCA_NOME_FUNDADOR,
  MARCA_NOME_INSTITUTO,
  MARCA_PILAR,
  MARCA_SIGLA,
} from "@/lib/identidade";

interface Props {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: Props) {
  const isHeader = variant === "header";

  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 sm:gap-3"
      aria-label={`${MARCA_NOME} — página inicial`}
    >
      <LogoMark size={isHeader ? 40 : 36} />
      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={`font-[family-name:var(--font-inter)] font-medium tracking-wide text-[rgba(248,246,240,0.82)] ${
            isHeader ? "text-[10px] sm:text-[11px]" : "text-[10px]"
          }`}
        >
          {MARCA_NOME_INSTITUTO}
        </span>
        <span
          className={`font-[family-name:var(--font-inter)] font-bold uppercase tracking-[0.14em] text-[var(--pure-white)] ${
            isHeader ? "text-base sm:text-lg md:text-xl" : "text-base"
          }`}
        >
          {MARCA_SIGLA}
        </span>
        <span
          className={`font-[family-name:var(--font-inter)] font-medium tracking-wide text-[var(--marca-ouro)] ${
            isHeader ? "text-[9px] sm:text-[10px]" : "text-[9px]"
          }`}
        >
          {MARCA_NOME_FUNDADOR}
        </span>
        {isHeader ? (
          <span className="mt-0.5 hidden font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[0.12em] text-[rgba(248,246,240,0.45)] lg:block">
            {MARCA_PILAR}
          </span>
        ) : (
          <span className="mt-1 font-[family-name:var(--font-jetbrains)] text-[8px] uppercase tracking-[0.12em] text-[rgba(248,246,240,0.5)]">
            {MARCA_PILAR}
          </span>
        )}
      </span>
    </Link>
  );
}
