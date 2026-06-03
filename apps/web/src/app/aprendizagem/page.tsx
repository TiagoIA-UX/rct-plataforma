import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Centro de Aprendizagem",
  description: "Trilhas, cursos, desafios e certificados de formação humana integral.",
};

const TRILHAS_EXEMPLO = [
  {
    slug: "habitos-diarios",
    titulo: "Hábitos que transformam",
    duracao: "4 semanas",
    nivel: "Iniciante",
  },
  {
    slug: "fe-ciencia-intro",
    titulo: "Introdução a Fé e Ciência",
    duracao: "6 semanas",
    nivel: "Intermediário",
  },
  {
    slug: "familia-comunicacao",
    titulo: "Comunicação na família",
    duracao: "3 semanas",
    nivel: "Iniciante",
  },
] as const;

export default function AprendizagemPage() {
  return (
    <article className="mx-auto max-w-6xl px-4 py-12">
      <header className="mb-10 max-w-3xl">
        <h1 className="text-3xl font-semibold md:text-4xl">Centro de Aprendizagem</h1>
        <p className="mt-4 text-lg text-[var(--color-muted)]">
          Trilhas com progresso claro, desafios semanais e certificados — sempre orientados à
          prática, nunca à gamificação viciante.
        </p>
      </header>

      <section aria-labelledby="trilhas-disponiveis">
        <h2 id="trilhas-disponiveis" className="mb-6 text-xl font-semibold">
          Trilhas disponíveis
        </h2>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TRILHAS_EXEMPLO.map((t) => (
            <li key={t.slug}>
              <Card>
                <CardHeader>
                  <CardTitle>{t.titulo}</CardTitle>
                  <CardDescription>
                    {t.duracao} · {t.nivel}
                  </CardDescription>
                </CardHeader>
                <Link
                  href={`/aprendizagem/${t.slug}`}
                  className="text-sm font-medium text-[var(--color-primary)] hover:underline"
                >
                  Iniciar trilha →
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 grid gap-6 sm:grid-cols-3" aria-label="Recursos de aprendizagem">
        <Card>
          <CardHeader>
            <CardTitle>Missões diárias</CardTitle>
            <CardDescription>Uma ação por dia, verificável e significativa.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Diário digital</CardTitle>
            <CardDescription>Reflexões guiadas para consolidar o aprendizado.</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Certificados</CardTitle>
            <CardDescription>Reconhecimento de conclusão com critérios transparentes.</CardDescription>
          </CardHeader>
        </Card>
      </section>
    </article>
  );
}
