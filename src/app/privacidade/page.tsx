import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";
import { MARCA_NOME } from "@/lib/identidade";

/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como ${MARCA_NOME} trata dados pessoais — LGPD (Brasil) e GDPR (União Europeia).`,
};

export default function PrivacidadePage() {
  return (
    <LegalPage titulo="Política de Privacidade">
      <h2>1. Quem somos</h2>
      <p>
        O controlador dos dados é <strong>{LEGAL.controlador}</strong>, operador da plataforma{" "}
        {LEGAL.plataforma}, acessível em {LEGAL.siteUrl}. Para assuntos de privacidade:{" "}
        <a href={`mailto:${LEGAL.emailPrivacidade}`}>{LEGAL.emailPrivacidade}</a>.
      </p>

      <h2>2. Legislação aplicável</h2>
      <p>Esta política atende, conforme o caso:</p>
      <ul>
        <li>
          <strong>LGPD</strong> — Lei nº 13.709/2018 (Brasil): tratamento de dados pessoais,
          direitos do titular e papel da ANPD.
        </li>
        <li>
          <strong>GDPR</strong> — Regulamento (UE) 2016/679: visitantes no Espaço Econômico
          Europeu, incluindo bases legais, direitos e transferências internacionais.
        </li>
        <li>
          <strong>Marco Civil da Internet</strong> — Lei nº 12.965/2014 (Brasil): privacidade,
          guarda de registros e transparência.
        </li>
      </ul>

      <h2>3. Dados que coletamos</h2>
      <ul>
        <li>
          <strong>Navegação pública:</strong> cookies essenciais, sua escolha de cookies (guardada
          no cache do navegador), logs técnicos (IP, navegador, horário) para segurança.
        </li>
        <li>
          <strong>Doações (opcional):</strong> se você enviar comprovante por e-mail, tratamos apenas
          os dados necessários para registro e contato.
        </li>
        <li>
          <strong>Formação reservada:</strong> e-mail, nome e reflexões enviadas por quem foi
          acolhido.
        </li>
      </ul>
      <p>Não vendemos dados pessoais. Não usamos perfilamento invasivo.</p>

      <h2>4. Finalidades e bases legais</h2>
      <ul>
        <li>Personalizar conteúdo na formação reservada — consentimento (LGPD art. 7º, I; GDPR art. 6º, 1, a).</li>
        <li>Contato por e-mail/Telegram — consentimento específico e revogável.</li>
        <li>Segurança, prevenção a fraudes e logs — legítimo interesse / obrigação legal.</li>
        <li>Cookies de visita anônima (Vercel Analytics) — somente se você clicar em &ldquo;Aceitar cookies&rdquo; no aviso inicial.</li>
      </ul>

      <h2>5. Seus direitos</h2>
      <p>Você pode solicitar, conforme LGPD e GDPR:</p>
      <ul>
        <li>Confirmação e acesso aos dados</li>
        <li>Correção de dados incompletos ou desatualizados</li>
        <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
        <li>Portabilidade (GDPR)</li>
        <li>Revogação do consentimento e oposição a tratamentos</li>
        <li>Informação sobre compartilhamento e subprocessadores</li>
      </ul>
      <p>
        Envie pedidos para{" "}
        <a href={`mailto:${LEGAL.emailPrivacidade}`}>{LEGAL.emailPrivacidade}</a>. Responderemos
        em prazo razoável (GDPR: até 30 dias; LGPD: conforme ANPD).
      </p>

      <h2>6. Retenção</h2>
      <p>
        Mantemos dados apenas pelo tempo necessário à finalidade ou exigência legal. Logs de segurança: período limitado.
      </p>

      <h2>7. Subprocessadores</h2>
      <ul>
        <li><strong>Vercel</strong> — hospedagem e entrega do site (EUA/UE).</li>
        <li><strong>Neon</strong> — banco de dados PostgreSQL criptografado em trânsito.</li>
        <li><strong>Groq</strong> — análise de texto na formação reservada (sem armazenar além do necessário).</li>
        <li><strong>Telegram / Resend / Mercado Pago</strong> — somente se você usar esses canais ou recursos.</li>
      </ul>
      <p>Contratos e cláusulas de proteção de dados são exigidos dos provedores quando aplicável.</p>

      <h2>8. Transferência internacional</h2>
      <p>
        Alguns provedores podem processar dados fora do Brasil ou do EEE. Adotamos salvaguardas
        reconhecidas (cláusulas contratuais padrão, avaliação de risco) conforme LGPD art. 33 e
        GDPR capítulo V.
      </p>

      <h2>9. Crianças</h2>
      <p>
        A formação reservada não se destina a menores de 18 anos sem consentimento dos
        responsáveis.
      </p>

      <h2>10. Alterações</h2>
      <p>
        Esta política pode ser atualizada. A data no topo indica a versão vigente. Mudanças
        relevantes serão comunicadas no site.
      </p>
    </LegalPage>
  );
}
