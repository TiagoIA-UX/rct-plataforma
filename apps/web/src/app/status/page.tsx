import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disponibilidade do serviço",
};

export default function StatusPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Disponibilidade</h1>
      <p className="mt-4 text-[var(--color-muted)]">
        Monitoramento via Grafana e Prometheus em produção. Esta página será atualizada
        com status em tempo real após deploy.
      </p>
      <p className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] p-4">
        Status atual: <strong className="text-[var(--color-primary)]">Operacional (desenvolvimento)</strong>
      </p>
    </article>
  );
}
