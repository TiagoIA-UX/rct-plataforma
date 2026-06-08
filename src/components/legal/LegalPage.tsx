import Link from "next/link";
import { LEGAL } from "@/lib/legal";

interface Props {
  titulo: string;
  children: React.ReactNode;
}

export function LegalPage({ titulo, children }: Props) {
  return (
    <div className="px-6 pt-32 pb-24">
      <article className="prose-rct mx-auto max-w-3xl">
        <h1>{titulo}</h1>
        <p className="font-[family-name:var(--font-jetbrains)] text-xs text-[rgba(248,246,240,0.45)]">
          Última atualização: {LEGAL.ultimaAtualizacao} · {LEGAL.plataforma}
        </p>
        {children}
        <hr className="my-10 border-gold" />
        <p className="text-sm text-[rgba(248,246,240,0.6)]">
          Dúvidas:{" "}
          <a href={`mailto:${LEGAL.emailPrivacidade}`}>{LEGAL.emailPrivacidade}</a>
        </p>
        <p className="mt-4 text-sm">
          <Link href="/privacidade">Privacidade</Link>
          {" · "}
          <Link href="/termos">Termos de uso</Link>
          {" · "}
          <Link href="/cookies">Cookies</Link>
          {" · "}
          <Link href="/seguranca">Segurança</Link>
        </p>
      </article>
    </div>
  );
}
