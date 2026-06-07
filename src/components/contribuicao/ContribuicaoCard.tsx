"use client";

interface Contribuicao {
  id: string;
  autor_email: string;
  autor_nome: string | null;
  tipo: string;
  titulo: string;
  conteudo: string;
  referencia_cientifica: string | null;
  modulo_relacionado: string | null;
  status: string;
  votos_positivos: number;
  created_at: string;
}

const TIPO_LABELS: Record<string, string> = {
  reforco: "Reforço",
  correcao: "Correção",
  aperfeicoamento: "Aperfeiçoamento",
  novo_modulo: "Novo Módulo",
};

interface Props {
  contribuicao: Contribuicao;
  onVotar?: (id: string) => void;
}

export function ContribuicaoCard({ contribuicao, onVotar }: Props) {
  const apelido = contribuicao.autor_nome ?? contribuicao.autor_email.split("@")[0];

  return (
    <article className="card-sacred rounded-sm p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="font-[family-name:var(--font-jetbrains)] text-xs uppercase tracking-widest text-[var(--sacred-gold)]">
            {TIPO_LABELS[contribuicao.tipo] ?? contribuicao.tipo}
          </span>
          {contribuicao.status === "incorporado" && (
            <span className="ml-3 rounded-sm bg-[var(--life-green)] px-2 py-0.5 text-xs">
              Incorporado
            </span>
          )}
          <h3 className="mt-2 text-xl text-[var(--pure-white)]">{contribuicao.titulo}</h3>
        </div>
        <span className="font-[family-name:var(--font-jetbrains)] text-sm text-[var(--sacred-gold)]">
          {contribuicao.votos_positivos} endossos
        </span>
      </div>
      <p className="mt-4 line-clamp-4 text-[rgba(248,246,240,0.75)]">{contribuicao.conteudo}</p>
      {contribuicao.referencia_cientifica && (
        <a
          href={contribuicao.referencia_cientifica}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-sm"
        >
          Referência científica →
        </a>
      )}
      <div className="mt-4 flex items-center justify-between text-sm text-[rgba(248,246,240,0.5)]">
        <span>por {apelido}</span>
        {onVotar && (
          <button onClick={() => onVotar(contribuicao.id)} className="btn-secondary text-xs px-3 py-1">
            Endossar
          </button>
        )}
      </div>
    </article>
  );
}
