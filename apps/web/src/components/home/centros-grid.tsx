import Link from "next/link";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CENTROS } from "@/lib/constants";

export function CentrosGrid() {
  return (
    <section
      className="mx-auto max-w-6xl px-4 py-12"
      aria-labelledby="centros-titulo"
    >
      <h2 id="centros-titulo" className="mb-8 text-center text-2xl font-semibold">
        Centros de formação
      </h2>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CENTROS.map((centro) => (
          <li key={centro.slug}>
            <Link href={centro.href} className="block h-full no-underline">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle>{centro.titulo}</CardTitle>
                  <CardDescription>{centro.descricao}</CardDescription>
                </CardHeader>
                <span className="text-sm font-medium text-[var(--color-primary)]">
                  Acessar centro →
                </span>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
