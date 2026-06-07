import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gold bg-[var(--cosmic-dark)] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-[family-name:var(--font-cormorant)] text-xl text-[var(--sacred-gold)]">
              RCT — Religião Científica Tecnológica
            </p>
            <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
              O fim do misticismo irracional. O início da evolução biológica consciente.
            </p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Navegação
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/manifesto">Manifesto</Link></li>
              <li><Link href="/diagnostico">Diagnóstico</Link></li>
              <li><Link href="/contribuir">Contribuir</Link></li>
              <li><Link href="/rede">Rede</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
              Contato
            </p>
            <p className="mt-3 text-sm text-[rgba(248,246,240,0.6)]">
              {process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "contato@rct.com.br"}
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-gold pt-6 text-center text-xs text-[rgba(248,246,240,0.4)]">
          © {new Date().getFullYear()} RCT — Transparência total. Zero manipulação encoberta.
        </p>
      </div>
    </footer>
  );
}
