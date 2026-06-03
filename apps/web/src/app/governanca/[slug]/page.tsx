import type { Metadata } from "next";
import { notFound } from "next/navigation";

const DOCUMENTOS: Record<
  string,
  { titulo: string; resumo: string; secoes: { titulo: string; texto: string }[] }
> = {
  etica: {
    titulo: "Código de Ética",
    resumo: "Compromissos com dignidade humana, transparência e formação integral.",
    secoes: [
      {
        titulo: "Missão",
        texto:
          "Promover formação humana integral sem manipulação, sensacionalismo ou exploração de dados pessoais.",
      },
      {
        titulo: "Proibições",
        texto:
          "É vedado usar dark patterns, vício comportamental, polarização intencional ou conteúdo divisivo.",
      },
    ],
  },
  privacidade: {
    titulo: "Política de Privacidade",
    resumo: "Tratamento de dados conforme LGPD e Privacy by Design.",
    secoes: [
      {
        titulo: "Coleta mínima",
        texto: "Coletamos apenas dados necessários para prestação do serviço e melhoria ética da plataforma.",
      },
      {
        titulo: "Direitos do titular",
        texto: "Acesso, correção, exclusão e portabilidade mediante solicitação ao contato institucional.",
      },
    ],
  },
  termos: {
    titulo: "Termos de Uso",
    resumo: "Condições de uso da plataforma Evangelho Digital.",
    secoes: [
      {
        titulo: "Uso permitido",
        texto: "Formação pessoal, familiar e comunitária. Proibida reprodução comercial não autorizada.",
      },
    ],
  },
  "ia-responsavel": {
    titulo: "Política de IA Responsável",
    resumo: "Conteúdos validados por cadeia multiagente — nunca publicação por modelo único.",
    secoes: [
      {
        titulo: "Pipeline obrigatório",
        texto:
          "Pesquisa → Fé → Ciência → Redação → Ética → Multicanal → Governança → Publicação. Nenhum estágio pode ser ignorado.",
      },
      {
        titulo: "Regra de ouro",
        texto: "Todo conteúdo deve ser verdadeiro, verificável, útil, compreensível, ético e respeitoso.",
      },
    ],
  },
  transparencia: {
    titulo: "Política de Transparência",
    resumo: "Neutralidade comercial e clareza sobre fontes e financiamento.",
    secoes: [
      {
        titulo: "Financiamento",
        texto: "Qualquer patrocínio ou parceria será declarado de forma visível e não influenciará pareceres editoriais.",
      },
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doc = DOCUMENTOS[slug];
  if (!doc) return { title: "Documento não encontrado" };
  return { title: doc.titulo, description: doc.resumo };
}

export default async function GovernancaPage({ params }: Props) {
  const { slug } = await params;
  const doc = DOCUMENTOS[slug];
  if (!doc) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">{doc.titulo}</h1>
        <p className="mt-3 text-[var(--color-muted)]">{doc.resumo}</p>
      </header>
      {doc.secoes.map((s) => (
        <section key={s.titulo} className="mb-8">
          <h2 className="text-xl font-semibold">{s.titulo}</h2>
          <p className="mt-2 leading-relaxed">{s.texto}</p>
        </section>
      ))}
    </article>
  );
}
