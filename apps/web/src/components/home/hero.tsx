import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PILARES } from "@/lib/constants";

export function Hero() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-16 text-center md:py-24"
      aria-labelledby="hero-titulo"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-wide text-[var(--color-accent)]">
        Formação humana integral
      </p>
      <h1
        id="hero-titulo"
        className="mx-auto max-w-3xl text-3xl font-semibold leading-tight text-[var(--color-foreground)] md:text-4xl lg:text-5xl"
      >
        Transformar conhecimento em ação prática — com fé, ciência e responsabilidade
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-muted)]">
        Um centro de conhecimento e transformação humana. Sem redes sociais viciantes.
        Com neuroergonomia, ética e cuidado pela sua família e comunidade.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/aprendizagem">Começar uma trilha</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/fe-ciencia">Explorar Fé e Ciência</Link>
        </Button>
      </div>
      <ul
        className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-3"
        aria-label="Pilares da plataforma"
      >
        {PILARES.map((p) => (
          <li
            key={p}
            className="rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-2 text-sm"
          >
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
