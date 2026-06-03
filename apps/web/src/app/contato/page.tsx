import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canal institucional para dúvidas, LGPD e suporte.",
};

export default function ContatoPage() {
  const email = process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@evangelhodigital.org";

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Contato</h1>
      <p className="mt-4 text-[var(--color-muted)]">
        Para questões sobre privacidade (LGPD), acessibilidade, conteúdo editorial ou
        funcionamento da plataforma:
      </p>
      <p className="mt-6">
        <a
          href={`mailto:${email}`}
          className="text-lg text-[var(--color-primary)] hover:underline"
        >
          {email}
        </a>
      </p>
    </article>
  );
}
