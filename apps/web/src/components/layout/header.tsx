import Link from "next/link";
import { CENTROS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-background)]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/"
          className="text-xl font-semibold text-[var(--color-primary)] no-underline hover:opacity-90"
          aria-label="Evangelho Digital — página inicial"
        >
          Evangelho Digital
        </Link>
        <nav aria-label="Navegação principal">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 text-sm sm:gap-x-5">
            {CENTROS.map((c) => (
              <li key={c.slug}>
                <Link
                  href={c.href}
                  className={cn(
                    "text-[var(--color-foreground)] underline-offset-4 hover:underline",
                    "focus-visible:rounded focus-visible:outline focus-visible:outline-2"
                  )}
                >
                  {c.titulo.replace("Centro ", "").replace("Centro de ", "")}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/aprendizagem"
                className="font-medium text-[var(--color-primary)] underline-offset-4 hover:underline"
              >
                Aprender
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
