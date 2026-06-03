import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CentroPageProps {
  titulo: string;
  descricao: string;
  topicos: readonly { titulo: string; descricao: string }[];
}

export function CentroPage({ titulo, descricao, topicos }: CentroPageProps) {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 max-w-3xl">
        <p className="mb-2 text-sm text-[var(--color-accent)]">Centro de formação</p>
        <h1 className="text-3xl font-semibold md:text-4xl">{titulo}</h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">{descricao}</p>
      </header>

      <section aria-labelledby="topicos-centro">
        <h2 id="topicos-centro" className="mb-6 text-xl font-semibold">
          Áreas de estudo e prática
        </h2>
        <ul className="grid gap-6 md:grid-cols-2">
          {topicos.map((t) => (
            <li key={t.titulo}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.titulo}</CardTitle>
                  <CardDescription>{t.descricao}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-muted-bg)] p-8">
        <h2 className="text-xl font-semibold">Sua próxima ação</h2>
        <p className="mt-2 max-w-xl text-[var(--color-muted)]">
          Escolha uma missão diária ou trilha no Centro de Aprendizagem. Pequenos passos
          consistentes geram transformação duradoura.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button asChild>
            <Link href="/aprendizagem">Ver trilhas</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Voltar ao início</Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
