import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/shared/NewsletterForm";
import { MARCA_DESCRICAO, MARCA_NOME, MARCA_PILAR, MARCA_SLOGAN_COMPLETO } from "@/lib/identidade";

export function Footer() {
  return (
    <footer className="border-t border-gold bg-[var(--cosmic-dark)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 font-[family-name:var(--font-cormorant)] text-sm italic text-[var(--sacred-gold)]">
              {MARCA_SLOGAN_COMPLETO}
            </p>
            <p className="mt-1 font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[rgba(248,246,240,0.5)]">
              {MARCA_PILAR}
            </p>
            <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
              {MARCA_DESCRICAO}
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Navegação
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/caminho">O Caminho</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/diagnostico">Questionário</Link></li>
              <li><Link href="/contribuir">Contribuir</Link></li>
              <li><Link href="/rede">Comunidade</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Legal e segurança
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacidade">Privacidade (LGPD / GDPR)</Link></li>
              <li><Link href="/termos">Termos de uso</Link></li>
              <li><Link href="/cookies">Cookies</Link></li>
              <li><Link href="/seguranca">Segurança</Link></li>
            </ul>
            <p className="mt-4 text-sm text-[rgba(248,246,240,0.6)]">
              {process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "zairyx.ai@gmail.com"}
            </p>
            <div className="mt-6">
              <p className="font-[family-name:var(--font-jetbrains)] text-[10px] uppercase tracking-widest text-[var(--sacred-gold)] mb-2">
                Newsletter
              </p>
              <NewsletterForm variant="compact" />
            </div>
          </div>
        </div>
        <p className="mt-10 max-w-3xl mx-auto text-center text-xs leading-relaxed text-[rgba(248,246,240,0.45)]">
          {MARCA_NOME} — um espaço aberto para quem busca unir fé, ciência e oração no dia a dia.
          Sem coleta de dados de comportamento, sem critérios ocultos de acesso.
        </p>
        <p className="mt-6 border-t border-gold pt-6 text-center text-xs text-[rgba(248,246,240,0.4)]">
          © {new Date().getFullYear()} {MARCA_NOME} — Transparência, consentimento e respeito ao visitante.
        </p>
      </div>
    </footer>
  );
}
