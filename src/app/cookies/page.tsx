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
      <h2>1. O que são cookies</h2>
      <p>
        Cookies são pequenos arquivos armazenados no seu navegador. Tecnologias semelhantes incluem
        localStorage (usamos para registrar sua escolha de consentimento).
      </p>

      <h2>2. Base legal</h2>
      <ul>
        <li>
          <strong>LGPD (Brasil):</strong> consentimento para cookies não essenciais; transparência
          sobre finalidades.
        </li>
        <li>
          <strong>GDPR e Diretiva ePrivacy (UE):</strong> consentimento prévio para cookies de
          medição e marketing, salvo estritamente necessários.
        </li>
      </ul>

      <h2>3. Cookies que utilizamos</h2>
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
            <td className="py-3 pr-4">rct_cookie_consent (localStorage)</td>
            <td className="py-3 pr-4">Registra se você aceitou cookies de medição</td>
            <td className="py-3">Até limpar o navegador</td>
          </tr>
          <tr className="border-b border-gold/30">
            <td className="py-3 pr-4">Sessão / autenticação (se ativo)</td>
            <td className="py-3 pr-4">Manter login seguro em áreas restritas</td>
            <td className="py-3">Sessão</td>
          </tr>
          <tr className="border-b border-gold/30">
            <td className="py-3 pr-4">Vercel Analytics (se aceito)</td>
            <td className="py-3 pr-4">Medição agregada e anônima de visitas</td>
            <td className="py-3">Conforme provedor</td>
          </tr>
        </tbody>
      </table>

      <h2>4. Como gerenciar</h2>
      <p>
        No banner inicial você pode escolher <strong>Só essenciais</strong> ou{" "}
        <strong>Aceitar medição</strong>. A qualquer momento, limpe cookies e localStorage nas
        configurações do navegador ou use modo privado.
      </p>

      <h2>5. Mais informações</h2>
      <p>
        Detalhes sobre dados pessoais estão na{" "}
        <a href="/privacidade">Política de Privacidade</a>.
      </p>
    </LegalPage>
  );
}
