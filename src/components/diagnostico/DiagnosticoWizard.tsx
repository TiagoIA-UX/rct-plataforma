"use client";

import { useState } from "react";
import type { DiagnosticoData, NivelPublico } from "@/types/diagnostico";
import { ResultadoRessonancia } from "./ResultadoRessonancia";

const TOTAL_PASSOS = 3;

const initialData: Partial<DiagnosticoData> = {
  consentimento_lgpd: false,
  consentimento_contato: false,
  ahimsa_conhece: false,
};

export function DiagnosticoWizard() {
  const [passo, setPasso] = useState(1);
  const [data, setData] = useState<Partial<DiagnosticoData>>(initialData);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [resultado, setResultado] = useState<{
    nivel: NivelPublico;
    score: number;
    frase_reconhecimento: string;
    resposta: { titulo: string; paragrafo: string; cta: string; acao: string };
  } | null>(null);

  function update<K extends keyof DiagnosticoData>(key: K, value: DiagnosticoData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  async function enviar() {
    setLoading(true);
    setErro(null);

    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        setErro(json.error ?? "Não foi possível enviar suas respostas. Tente novamente.");
        return;
      }

      setResultado(json);
      if (typeof window !== "undefined") {
        localStorage.setItem("rct_diagnostico", JSON.stringify(json));
      }
    } catch {
      setErro("Falha de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (resultado) {
    return (
      <ResultadoRessonancia
        nivel={resultado.nivel}
        score={resultado.score}
        fraseReconhecimento={resultado.frase_reconhecimento}
        resposta={resultado.resposta}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex gap-2">
        {Array.from({ length: TOTAL_PASSOS }, (_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i < passo ? "bg-[var(--sacred-gold)]" : "bg-[rgba(200,169,81,0.2)]"
            }`}
          />
        ))}
      </div>

      {passo === 1 && (
        <div className="card-sacred rounded-sm p-8">
          <h2 className="text-2xl text-[var(--sacred-gold)]">Sobre você</h2>
          <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
            Responda com tranquilidade. Não há resposta certa ou errada — apenas o que é verdadeiro
            para você neste momento.
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label className="label-sacred">Como você se relaciona com espiritualidade hoje?</label>
              <select
                className="input-sacred"
                value={data.perspectiva_espiritualidade ?? ""}
                onChange={(e) =>
                  update("perspectiva_espiritualidade", e.target.value as DiagnosticoData["perspectiva_espiritualidade"])
                }
              >
                <option value="">Selecione...</option>
                <option value="misticismo_puro">Experiência e intuição me guiam</option>
                <option value="ciencia_pura">Prefiro explicações baseadas em evidências</option>
                <option value="convergencia">Busco diálogo entre fé e ciência</option>
                <option value="ainda_descobrindo">Ainda estou descobrindo</option>
              </select>
            </div>
            <div>
              <label className="label-sacred">Como você lida com dogmas e tradições?</label>
              <select
                className="input-sacred"
                value={data.postura_dogma ?? ""}
                onChange={(e) =>
                  update("postura_dogma", e.target.value as DiagnosticoData["postura_dogma"])
                }
              >
                <option value="">Selecione...</option>
                <option value="aceita">Acolho com confiança</option>
                <option value="questiona">Questiono com respeito</option>
                <option value="rejeita_com_logica">Prefiro avaliar com razão e evidências</option>
                <option value="indiferente">Não é central para mim</option>
              </select>
            </div>
            <div>
              <label className="label-sacred">Como você pratica a não-violência no dia a dia?</label>
              <select
                className="input-sacred"
                value={data.ahimsa_pratica ?? ""}
                onChange={(e) => {
                  const v = e.target.value as DiagnosticoData["ahimsa_pratica"];
                  update("ahimsa_pratica", v);
                  update("ahimsa_conhece", v !== "nunca_ouvi");
                }}
              >
                <option value="">Selecione...</option>
                <option value="nunca_ouvi">Ainda não explorei este conceito</option>
                <option value="conheço_teoricamente">Conheço a ideia, pratico pouco</option>
                <option value="pratico_parcialmente">Tento aplicar no cotidiano</option>
                <option value="e_minha_identidade">É parte importante da minha forma de viver</option>
              </select>
            </div>
            <div>
              <label className="label-sacred">Sua postura diante da violência (física, verbal ou simbólica)</label>
              <select
                className="input-sacred"
                value={data.postura_violencia ?? ""}
                onChange={(e) =>
                  update("postura_violencia", e.target.value as DiagnosticoData["postura_violencia"])
                }
              >
                <option value="">Selecione...</option>
                <option value="justificada_em_casos">Acredito que pode ser necessária em alguns casos</option>
                <option value="evito_mas_aceito">Evito, mas entendo contextos extremos</option>
                <option value="recuso_em_qualquer_forma">Busco sempre caminhos sem violência</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {passo === 2 && (
        <div className="card-sacred rounded-sm p-8">
          <h2 className="text-2xl text-[var(--sacred-gold)]">Sua área de interesse</h2>
          <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
            Conte, com suas palavras, como você gostaria de servir ao bem comum.
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label className="label-sacred">Área da vida que mais importa para você neste momento</label>
              <select
                className="input-sacred"
                value={data.territorio_primario ?? ""}
                onChange={(e) =>
                  update("territorio_primario", e.target.value as DiagnosticoData["territorio_primario"])
                }
              >
                <option value="">Selecione...</option>
                <option value="saude">Saúde</option>
                <option value="educacao">Educação</option>
                <option value="ciencia_tecnologia">Ciência e Tecnologia</option>
                <option value="arte_comunicacao">Arte e Comunicação</option>
                <option value="lideranca">Liderança</option>
                <option value="familia_comunidade">Família e Comunidade</option>
              </select>
            </div>
            <div>
              <label className="label-sacred">Como você aplica seus valores no dia a dia?</label>
              <textarea
                className="input-sacred min-h-[120px] resize-y"
                value={data.aplicacao_diaria ?? ""}
                onChange={(e) => update("aplicacao_diaria", e.target.value)}
                placeholder="Ex.: no trabalho, em casa, na comunidade..."
              />
            </div>
            <div>
              <label className="label-sacred">O que mais lhe preocupa no mundo hoje?</label>
              <textarea
                className="input-sacred min-h-[100px] resize-y"
                value={data.maior_questao ?? ""}
                onChange={(e) => update("maior_questao", e.target.value)}
                placeholder="Opcional — compartilhe se desejar."
              />
            </div>
          </div>
        </div>
      )}

      {passo === 3 && (
        <div className="card-sacred rounded-sm p-8">
          <h2 className="text-2xl text-[var(--sacred-gold)]">Contato e consentimento</h2>
          <p className="mt-2 text-sm text-[rgba(248,246,240,0.6)]">
            Seus dados são tratados conforme a LGPD (Brasil) e o GDPR (União Europeia), quando
            aplicável. Leia a{" "}
            <a href="/privacidade" className="underline" target="_blank" rel="noopener noreferrer">
              Política de Privacidade
            </a>
            . Você pode solicitar acesso, correção ou exclusão a qualquer momento.
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <label className="label-sacred">Nome</label>
              <input className="input-sacred" type="text" value={data.nome ?? ""} onChange={(e) => update("nome", e.target.value)} />
            </div>
            <div>
              <label className="label-sacred">E-mail</label>
              <input className="input-sacred" type="email" value={data.email ?? ""} onChange={(e) => update("email", e.target.value)} />
            </div>
            <div>
              <label className="label-sacred">Telegram (opcional)</label>
              <input
                className="input-sacred"
                type="text"
                placeholder="@seuusuario"
                value={data.telegram_username ?? ""}
                onChange={(e) => update("telegram_username", e.target.value)}
              />
            </div>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={data.consentimento_lgpd ?? false}
                onChange={(e) => update("consentimento_lgpd", e.target.checked)}
                className="mt-1"
              />
              <span>
                Li a Política de Privacidade e autorizo o tratamento dos meus dados para
                personalizar conteúdo e, se eu aceitar abaixo, para contato da RCT (consentimento
                livre, específico e revogável).
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                checked={data.consentimento_contato ?? false}
                onChange={(e) => update("consentimento_contato", e.target.checked)}
                className="mt-1"
              />
              <span>Aceito receber novidades e convites da RCT por e-mail ou Telegram.</span>
            </label>
          </div>
        </div>
      )}

      {erro && <p className="mt-4 text-sm text-red-400">{erro}</p>}

      <div className="mt-8 flex justify-between">
        {passo > 1 && (
          <button onClick={() => setPasso((p) => p - 1)} className="btn-secondary">
            Voltar
          </button>
        )}
        {passo < TOTAL_PASSOS ? (
          <button onClick={() => setPasso((p) => p + 1)} className="btn-primary ml-auto">
            Continuar
          </button>
        ) : (
          <button onClick={enviar} disabled={loading} className="btn-primary ml-auto">
            {loading ? "Enviando..." : "Enviar respostas"}
          </button>
        )}
      </div>
    </div>
  );
}
