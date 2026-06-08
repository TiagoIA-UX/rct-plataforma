import Groq from "groq-sdk";
import type { AnaliseIA, DiagnosticoData } from "@/types/diagnostico";
import { montarPromptTriagemInterna, type TriagemInterna } from "@/lib/triagem-interna";

type AnaliseCompleta = AnaliseIA & { triagem_interna?: TriagemInterna };

const FALLBACK: AnaliseCompleta = {
  score_missao: 8,
  indicadores_positivos: ["busca consciente", "reflexão sistemática"],
  territorio_confirmado: "ciencia_tecnologia",
  frase_reconhecimento: "Obrigado por compartilhar sua reflexão com sinceridade.",
  triagem_interna: {
    ahimsa_principiologico: false,
    consumo_carne_inferido: null,
    coerencia_textual: 50,
    indicadores_vida: [],
    apto_treinamento: false,
    fase_sugerida: "divya_manas",
    notas_admin: "Análise IA indisponível — revisão manual necessária.",
  },
};

export async function analisarTextosMissao(data: DiagnosticoData): Promise<AnaliseCompleta> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return { ...FALLBACK, territorio_confirmado: data.territorio_primario };
  }

  const groq = new Groq({ apiKey });

  try {
    const analiseTexto = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Você apoia a RCT com tom acolhedor, pacífico e respeitoso — sem julgamento, sem linguagem invasiva ou competitiva.
A frase_reconhecimento deve ser curta, natural e gentil (como um acolhimento humano).
Separe SEMPRE análise pública (frase_reconhecimento) de triagem_interna (admin).
Nunca use: frequência, escolhido, misticismo irracional, ataque, competição, ou termos que invadam privacidade.
Nunca inclua critérios de alimentação ou Ahimsa na frase pública.
Priorize estudos publicados e revisados por pares (ver protocolo-ciencia.txt). Tom respeitoso; nunca depreciar pesquisas em curso.`,
        },
        { role: "user", content: montarPromptTriagemInterna(data) },
      ],
      max_tokens: 700,
      response_format: { type: "json_object" },
    });

    const content = analiseTexto.choices[0]?.message?.content;
    if (!content) {
      return { ...FALLBACK, territorio_confirmado: data.territorio_primario };
    }

    const parsed = JSON.parse(content) as AnaliseCompleta;
    return {
      score_missao: Math.min(20, Math.max(0, parsed.score_missao ?? 8)),
      indicadores_positivos: parsed.indicadores_positivos ?? FALLBACK.indicadores_positivos,
      territorio_confirmado: parsed.territorio_confirmado ?? data.territorio_primario,
      frase_reconhecimento: parsed.frase_reconhecimento ?? FALLBACK.frase_reconhecimento,
      triagem_interna: parsed.triagem_interna ?? FALLBACK.triagem_interna,
    };
  } catch (error) {
    console.error("[groq] Erro na análise de missão:", error);
    return { ...FALLBACK, territorio_confirmado: data.territorio_primario };
  }
}
