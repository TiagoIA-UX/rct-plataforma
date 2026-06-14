import { ETIMOLOGIA } from "@/lib/etimologia";

type Props = {
  id: keyof typeof ETIMOLOGIA | string;
  children: React.ReactNode;
  className?: string;
};

/** Palavra controversa ou técnica com link para etimologia (Wikipédia). */
export function PalavraEtimologia({ id, children, className = "" }: Props) {
  const ent = ETIMOLOGIA[id];
  if (!ent) {
    return <span className={className}>{children}</span>;
  }
  return (
    <a
      href={ent.url}
      className={`palavra-etimologia ${className}`.trim()}
      target="_blank"
      rel="noopener noreferrer"
      title={`${ent.rotulo} — Wikipédia (leitura complementar)`}
    >
      {children}
    </a>
  );
}
