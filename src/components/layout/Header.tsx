"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/manifesto", label: "Manifesto" },
  { href: "/blog", label: "Blog" },
  { href: "/diagnostico", label: "Calibragem" },
  { href: "/treinamento", label: "Treinamento" },
  { href: "/contribuir", label: "Contribuir" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gold bg-[rgba(13,21,32,0.92)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-[family-name:var(--font-cormorant)] text-2xl text-[var(--pure-white)]">
          RCT
        </Link>
        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest transition-colors ${
                pathname === link.href ? "text-[var(--sacred-gold)]" : "text-[rgba(248,246,240,0.7)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link href="/diagnostico" className="btn-primary text-sm px-4 py-2">
          Calibragem
        </Link>
      </div>
    </header>
  );
}
