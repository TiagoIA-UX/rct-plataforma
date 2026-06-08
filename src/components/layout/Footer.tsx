import Link from "next/link";
import { Logo } from "@/components/layout/Logo";

export function Footer() {
  return (
    <footer className="border-t border-gold bg-[var(--cosmic-dark)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Logo variant="footer" />
            <p className="mt-3 font-[family-name:var(--font-cormorant)] text-sm text-[var(--sacred-gold)]">
              Religião Científica Tecnológica
            </p>
            <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
              Tradição cristã e neurociência comportamental — memória, emoção, hábitos e
              vínculos, com referências publicadas.
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
              {process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@rct.com.br"}
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-gold pt-6 text-center text-xs text-[rgba(248,246,240,0.4)]">
          © {new Date().getFullYear()} RCT — Transparência, consentimento e respeito ao visitante.
        </p>
      </div>
    </footer>
  );
}
