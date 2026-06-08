import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";

/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Segurança e Disponibilidade",
  description:
    "Pilares de segurança da informação, conformidade e medidas técnicas da plataforma RCT.",
};

export default function SegurancaPage() {
  return (
    <LegalPage titulo="Segurança, Disponibilidade e Conformidade">
      <h2>1. Pilares que nos orientam</h2>
      <p>A gestão de riscos da RCT considera, de forma integrada:</p>
      <ul>
        <li>
          <strong>Confidencialidade</strong> — só quem precisa acessa dados pessoais; criptografia
          em trânsito (HTTPS/TLS 1.2+).
        </li>
        <li>
          <strong>Integridade</strong> — proteção contra alteração não autorizada de dados e
          conteúdo; validação de entradas nas APIs.
        </li>
        <li>
          <strong>Disponibilidade</strong> — infraestrutura em nuvem com redundância (Vercel,
          Neon); monitoramento e backups do banco.
        </li>
        <li>
          <strong>Autenticidade</strong> — verificação de origem em webhooks e rotas
          administrativas (tokens, segredos em variáveis de ambiente).
        </li>
        <li>
          <strong>Irretratabilidade (não repúdio)</strong> — registros de consentimento e logs de
          operações sensíveis quando necessário.
        </li>
        <li>
          <strong>Responsabilidade (accountability)</strong> — políticas documentadas, contato de
          privacidade e revisão periódica de práticas.
        </li>
      </ul>

      <h2>2. Medidas técnicas</h2>
      <ul>
        <li>Cabeçalhos HTTP de segurança: X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy</li>
        <li>Segredos e chaves de API apenas em ambiente servidor — nunca expostos no navegador</li>
        <li>Prisma ORM com consultas parametrizadas (mitigação de injeção SQL)</li>
        <li>Validação de dados com Zod nas rotas de API</li>
        <li>Acesso administrativo restrito por credenciais e variáveis de ambiente</li>
        <li>Dados em repouso: criptografia gerenciada pelo provedor Neon</li>
        <li>Scripts confidenciais e prompts fora do repositório público (pasta private/)</li>
      </ul>

      <h2>3. Conformidade legal (resumo)</h2>
      <ul>
        <li>
          <strong>LGPD</strong> — Lei 13.709/2018: privacidade, segurança, incidentes, direitos do
          titular.
        </li>
        <li>
          <strong>GDPR</strong> — Regulamento UE 2016/679: para visitantes europeus; privacidade
          by design e by default.
        </li>
        <li>
          <strong>Marco Civil da Internet</strong> — Lei 12.965/2014: guarda de logs e
          transparência.
        </li>
        <li>
          <strong>NIST CSF / ISO 27001 (referência)</strong> — boas práticas de governança e
          melhoria contínua, adaptadas à escala da plataforma.
        </li>
      </ul>

      <h2>4. Incidentes de segurança</h2>
      <p>
        Em caso de incidente com dados pessoais, adotamos contenção, análise de impacto e
        comunicação aos titulares e à ANPD / autoridades europeias quando exigido por lei.
        Reporte vulnerabilidades:{" "}
        <a href={`mailto:${LEGAL.emailPrivacidade}`}>{LEGAL.emailPrivacidade}</a>.
      </p>

      <h2>5. Disponibilidade e continuidade</h2>
      <p>
        A plataforma depende de provedores de nuvem. Em indisponibilidade prolongada,
        priorizamos restauração do blog público e proteção dos dados do questionário. Não há SLA
        contratual para visitantes gratuitos; buscamos boa-fé e melhor esforço.
      </p>

      <h2>6. Seus hábitos importam</h2>
      <p>
        Use senhas fortes em serviços vinculados (e-mail, Telegram). Não compartilhe links de
        áreas reservadas. Em redes públicas, prefira HTTPS e evite enviar dados sensíveis sem
        necessidade.
      </p>
    </LegalPage>
  );
}
