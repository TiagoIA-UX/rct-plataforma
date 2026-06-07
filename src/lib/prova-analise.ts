import Groq from "groq-sdk";
import type { FaseTreinamento } from "@/types/diagnostico";

export interface ResultadoProva {
  score_coerencia: number;
  score_mentira: number;
  indicadores: string[];
  aprovado_automatico: boolean;
  notas: string;
}

const FALLBACK: ResultadoProva = {
  score_coerencia: 50,
  score_mentira: 50,
  indicadores: ["análise manual necessária"],
  aprovado_automatico: false,
  notas: "IA indisponível — aguardar revisão do administrador.",
};

export async function analisarProvaTreinamento(
  fase: FaseTreinamento,
  resposta: string,
  email: string
): Promise<ResultadoProva> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return FALLBACK;

  const groq = new Groq({ apiKey });

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Você detecta incoerências e possíveis falsidades em textos de treinamento espiritual-científico.
Analise coerência lógica, consistência entre afirmações, ausência de contradições graves.
NÃO julgue crenças — julgue coerência textual e honestidade intelectual.
Retorne APENAS JSON:
{
  "score_coerencia": 0-100,
  "score_mentira": 0-100 (0=coerente, 100=muita incoerência/mentira detectada),
  "indicadores": ["lista de observações"],
  "aprovado_automatico": boolean (true se score_coerencia>=75 e score_mentira<=25),
  "notas": "para o administrador"
}`,
        },
        {
          role: "user",
          content: `Fase: ${fase}\nCandidato: ${email}\nResposta:\n${resposta}`,
        },
      ],
      max_tokens: 500,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) return FALLBACK;

    const parsed = JSON.parse(content) as ResultadoProva;
    return {
      score_coerencia: Math.min(100, Math.max(0, parsed.score_coerencia ?? 50)),
      score_mentira: Math.min(100, Math.max(0, parsed.score_mentira ?? 50)),
      indicadores: parsed.indicadores ?? [],
      aprovado_automatico: parsed.aprovado_automatico ?? false,
      notas: parsed.notas ?? "",
    };
  } catch (error) {
    console.error("[prova-analise] Erro:", error);
    return FALLBACK;
  }
}
