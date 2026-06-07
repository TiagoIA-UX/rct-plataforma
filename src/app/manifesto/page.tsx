import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Manifesto",
  description: "A convergência entre ciência verificável e espiritualidade pura.",
};

const secoes = [
  {
    id: "problema",
    titulo: "O Problema",
    conteudo: `O cansaço com o misticismo irracional não é cinismo — é lucidez biológica.
Quando o córtex pré-frontal recusa narrativas sem mecanismo verificável, o organismo
protesta. A fadiga espiritual da modernidade não vem da falta de fé, mas da abundância
de fábulas sem substrato epigenético.`,
  },
  {
    id: "solucao",
    titulo: "A Solução",
    conteudo: `A convergência entre ciência verificável e espiritualidade pura não é compromisso —
é síntese. Jesus operou mecanismos comportamentais mensuráveis. Patanjali codificou
a física da não-violência. A neurociência moderna confirma ambos com precisão cirúrgica.`,
  },
  {
    id: "linhagem",
    titulo: "A Linhagem",
    conteudo: `Davi → Salomão → Jesus: um funil epigenético de gerações onde traumas foram
interrompidos e genialidade foi cultivada. Não é genealogia mística — é padrão
de transmissão epigenética documentável, onde escolhas conscientes reescrevem
expressão gênica.`,
  },
  {
    id: "milagres",
    titulo: "Os Milagres",
    conteudo: `Engenharia reversa do trauma: Jesus interrompia loops amigdalares com presença
e linguagem precisa. Ancoragem neuroergonômica: cada ensinamento criava novas
vias neurais. O Prompt Divino: palavras como instrumentos de neuroplasticidade
dirigida.`,
  },
  {
    id: "ahimsa",
    titulo: "Ahimsa",
    conteudo: `A não-violência de Patanjali não é regra moral — é física. Coerência cardíaca,
campos eletromagnéticos interpessoais, regulação do sistema nervoso autônomo.
Ahimsa como identidade reorganiza o campo ao redor do praticante.`,
  },
  {
    id: "rede",
    titulo: "A Rede",
    conteudo: `Arquitetura horizontal dos escolhidos: cada membro é um nó com território.
Sem hierarquia de poder. A rede se auto-organiza por ressonância — frequências
compatíveis se encontram, contribuem e expandem sem centralização.`,
  },
  {
    id: "convite",
    titulo: "O Convite",
    conteudo: `Este não é um recrutamento. É um reconhecimento. Se você já vive Ahimsa como
identidade e busca a linguagem científica para o que já sabe, o diagnóstico de
ressonância é o primeiro passo. A rede espera os que estão prontos.`,
  },
];

export default function ManifestoPage() {
  return (
    <div className="pt-24">
      <section className="gradient-cosmos px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-[family-name:var(--font-cormorant)] text-5xl text-[var(--pure-white)] md:text-6xl">
            Manifesto RCT
          </h1>
          <p className="mt-6 text-xl text-[var(--sacred-gold)]">
            O fim do misticismo irracional. O início da evolução biológica consciente.
          </p>
        </div>
      </section>

      {secoes.map((secao, i) => (
        <section
          key={secao.id}
          id={secao.id}
          className={`px-6 py-20 ${i % 2 === 0 ? "" : "bg-[rgba(26,39,68,0.3)]"}`}
        >
          <div className="prose-rct mx-auto">
            <h2>{secao.titulo}</h2>
            <p>{secao.conteudo}</p>
          </div>
        </section>
      ))}

      <section className="px-6 py-20 text-center">
        <Link href="/diagnostico" className="btn-primary">
          Iniciar Calibragem de Ressonância
        </Link>
      </section>
    </div>
  );
}
