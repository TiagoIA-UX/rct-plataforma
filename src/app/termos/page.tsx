import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL } from "@/lib/legal";
import { MARCA_NOME } from "@/lib/identidade";

/** ISR — ver CACHE_TTL.static em src/lib/cache.ts */
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Condições de uso de ${MARCA_NOME}.`,
};

export default function TermosPage() {
  return (
    <LegalPage titulo="Termos de Uso">
      <h2>1. Aceitação</h2>
      <p>
        Ao acessar {LEGAL.siteUrl}, você concorda com estes termos e com a{" "}
        <a href="/privacidade">Política de Privacidade</a>. Se não concordar, utilize apenas a
        leitura pública sem enviar dados pessoais.
      </p>

      <h2>2. Natureza do conteúdo</h2>
      <p>
        {MARCA_NOME} oferece textos que unem fé e estudos científicos publicados — para que a fé possa
        ser compreendida e vivida — com referências verificáveis. O conteúdo é informativo e
        espiritual; não substitui aconselhamento médico, psicológico, jurídico ou pastoral individual.
      </p>

      <h2>3. Uso permitido</h2>
      <ul>
        <li>Ler e compartilhar links do blog com atribuição</li>
        <li>Participar do questionário com informações verdadeiras</li>
        <li>Respeitar outros participantes e a equipe</li>
      </ul>

      <h2>4. Uso proibido</h2>
      <ul>
        <li>Ataques, assédio, discriminação ou incitação à violência</li>
        <li>Tentativas de invasão, scraping abusivo ou sobrecarga dos sistemas</li>
        <li>Envio de malware, spam ou conteúdo ilegal</li>
        <li>Uso dos dados de terceiros sem base legal</li>
      </ul>

      <h2>5. Propriedade intelectual</h2>
      <p>
        Textos, marca {MARCA_NOME} e layout são protegidos. Citação breve com link é permitida. Reprodução
        integral requer autorização.
      </p>

      <h2>6. Doações</h2>
      <p>
        As contribuições financeiras via PIX são voluntárias e destinam-se ao alcance da plataforma,
        manutenção técnica, expansão e projetos associados (incluindo espaço físico). Não há
        contrapartida obrigatória vinculada ao valor doado.
      </p>

      <h2>7. Formação reservada</h2>
      <p>
        Acesso mediante inscrição e acolhimento. Conteúdo reservado não pode ser redistribuído sem
        permissão.
      </p>

      <h2>8. Disponibilidade</h2>
      <p>
        Buscamos alta disponibilidade, mas não garantimos operação ininterrupta. Manutenções e
        força maior podem causar indisponibilidade temporária. Veja também{" "}
        <a href="/seguranca">Segurança e disponibilidade</a>.
      </p>

      <h2>9. Limitação de responsabilidade</h2>
      <p>
        Na extensão permitida pela lei brasileira e europeia aplicável, {MARCA_NOME} não responde por
        danos indiretos decorrentes do uso do site ou de decisões tomadas com base nos textos.
      </p>

      <h2>10. Lei e foro</h2>
      <p>
        Para usuários no Brasil, aplica-se a legislação brasileira. Para consumidores na UE,
        aplicam-se também as normas imperativas de proteção do consumidor e do GDPR do país de
        residência. Contato: <a href={`mailto:${LEGAL.emailContato}`}>{LEGAL.emailContato}</a>.
      </p>
    </LegalPage>
  );
}
