import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MECANICAS } from "@/lib/constants";

export function Mecanicas() {
  return (
    <section
      className="bg-[var(--color-muted-bg)] py-16"
      aria-labelledby="mecanicas-titulo"
    >
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="mecanicas-titulo" className="mb-2 text-center text-2xl font-semibold">
          Prática diária, sem vício
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-[var(--color-muted)]">
          Engajamento baseado em hábitos saudáveis e reforço positivo — nunca em loops
          compulsivos ou notificações abusivas.
        </p>
        <ul className="grid gap-6 sm:grid-cols-2">
          {MECANICAS.map((m) => (
            <li key={m.titulo}>
              <Card>
                <CardHeader>
                  <CardTitle>{m.titulo}</CardTitle>
                  <CardDescription>{m.descricao}</CardDescription>
                </CardHeader>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
