import Link from "next/link";
import { LogoMark } from "@/components/layout/LogoMark";

interface Props {
  variant?: "header" | "footer";
}

export function Logo({ variant = "header" }: Props) {
  const isHeader = variant === "header";

  return (
    <Link
      href="/"
      className="group flex items-center gap-3 transition-opacity hover:opacity-90"
      aria-label="RCT — página inicial"
    >
      <LogoMark size={isHeader ? 36 : 32} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-[family-name:var(--font-cormorant)] font-semibold tracking-[0.14em] text-[var(--pure-white)] ${
            isHeader ? "text-2xl" : "text-xl"
          }`}
        >
          RCT
        </span>
        <span className="mt-1 font-[family-name:var(--font-jetbrains)] text-[9px] uppercase tracking-[0.18em] text-[var(--sacred-gold)] opacity-90">
          Tradição · Neurociência · Paz
        </span>
      </span>
    </Link>
  );
}
