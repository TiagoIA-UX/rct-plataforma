import Link from "next/link";
import { LINKS_GOVERNANCA } from "@/lib/constants";

export function Footer() {
  const razaoSocial = process.env.NEXT_PUBLIC_MEI_RAZAO_SOCIAL ?? "[Razão Social MEI]";
  const cnpj = process.env.NEXT_PUBLIC_MEI_CNPJ ?? "[CNPJ]";
  const email = process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@evangelhodigital.org";

  return (
    <footer
      className="mt-auto border-t border-[var(--color-border)] bg-[var(--color-muted-bg)]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <section aria-labelledby="footer-institucional">
            <h2 id="footer-institucional" className="mb-3 text-lg font-semibold">
              Transparência institucional
            </h2>
            <p className="text-sm text-[var(--color-muted)] leading-relaxed">
              {razaoSocial}
              <br />
              CNPJ: {cnpj}
              <br />
              Plataforma de formação humana integral — sem fins de manipulação
              comportamental ou vício de engajamento.
            </p>
          </section>

          <section aria-labelledby="footer-governanca">
            <h2 id="footer-governanca" className="mb-3 text-lg font-semibold">
              Governança
            </h2>
            <ul className="space-y-2 text-sm">
              {LINKS_GOVERNANCA.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[var(--color-primary)] underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="footer-contato">
            <h2 id="footer-contato" className="mb-3 text-lg font-semibold">
              Contato e disponibilidade
            </h2>
            <p className="text-sm text-[var(--color-muted)]">
              <a href={`mailto:${email}`} className="text-[var(--color-primary)] hover:underline">
                {email}
              </a>
            </p>
            <p className="mt-3 text-sm text-[var(--color-muted)]">
              Status do serviço:{" "}
              <Link href="/status" className="text-[var(--color-primary)] hover:underline">
                disponibilidade
              </Link>
            </p>
          </section>
        </div>

        <p className="mt-8 border-t border-[var(--color-border)] pt-6 text-center text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} Evangelho Digital. Dados tratados conforme LGPD.
        </p>
      </div>
    </footer>
  );
}
