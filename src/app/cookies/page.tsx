import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Cookies e tecnologias semelhantes na plataforma RCT — LGPD e ePrivacy (UE).",
};

export default function CookiesPage() {
  return (
    <LegalPage titulo="Política de Cookies">
      <h2>1. O que são cookies e cache</h2>
      <p>
        <strong>Cookies</strong> são pequenos arquivos que o site guarda no seu navegador.
        <strong> Cache</strong> (ou <em>armazenamento local</em>) é um espaço no navegador onde
        guardamos, por exemplo, se você já escolheu aceitar ou recusar cookies opcionais.
        Usamos o nome técnico <code>localStorage</code> para essa escolha.
      </p>

      <h2>2. Base legal</h2>
      <ul>
        <li>
          <strong>LGPD (Brasil):</strong> você decide se aceita cookies além dos essenciais.
        </li>
        <li>
          <strong>GDPR (União Europeia):</strong> mesma regra — consentimento antes de cookies
          opcionais.
        </li>
      </ul>

      <h2>3. O que guardamos no seu navegador</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold text-left text-[var(--sacred-gold)]">
            <th className="py-2 pr-4">Nome / tipo</th>
            <th className="py-2 pr-4">Finalidade</th>
            <th className="py-2">Duração</th>
          </tr>
        </thead>
        <tbody className="text-[rgba(248,246,240,0.75)]">
          <tr className="border-b border-gold/30">
            <td className="py-3 pr-4">Sua escolha (cache / localStorage)</td>
            <td className="py-3 pr-4">Lembra se você clicou em &ldquo;Só o essencial&rdquo; ou &ldquo;Aceitar cookies&rdquo;</td>
            <td className="py-3">Até limpar o navegador</td>
          </tr>
          <tr className="border-b border-gold/30">
            <td className="py-3 pr-4">Sessão / autenticação (se ativo)</td>
            <td className="py-3 pr-4">Manter login seguro em áreas restritas</td>
            <td className="py-3">Sessão</td>
          </tr>
          <tr className="border-b border-gold/30">
            <td className="py-3 pr-4">Cookies de visita (se você aceitar)</td>
            <td className="py-3 pr-4">Conta quantas pessoas acessam o site, sem identificar você (Vercel Analytics)</td>
            <td className="py-3">Conforme provedor</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Suas opções</h2>
      <p>
        No aviso que aparece na primeira visita, você escolhe:
      </p>
      <ul>
        <li>
          <strong>Só o essencial</strong> — apenas cookies necessários para o site funcionar;
          nenhum cookie de contagem de visitas.
        </li>
        <li>
          <strong>Aceitar cookies</strong> — essenciais + cookies de visita anônima.
        </li>
      </ul>
      <p>
        Para mudar depois, limpe cookies e cache nas configurações do navegador ou use o modo
        privado/anônimo.
      </p>

      <h2>5. Mais informações</h2>
      <p>
        Detalhes sobre dados pessoais estão na{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
    </LegalPage>
  );
}
