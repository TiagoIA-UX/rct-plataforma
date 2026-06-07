import { RESPOSTAS_RESSONANCIA } from "@/lib/convites";
import { salvarDiagnostico } from "@/lib/db/diagnostico";
import { analisarTextosMissao } from "@/lib/groq-analise";
import { calcularRessonanciaPublica, recalcularNivelPublico } from "@/lib/ressonancia-score";
import { extrairTriagemInterna } from "@/lib/triagem-interna";
import { alertarAdminTriagem, enviarConviteTelegram } from "@/lib/telegram-bot";
import { diagnosticoSchema } from "@/lib/validations/diagnostico";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = diagnosticoSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Dados inválidos", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const analiseIA = await analisarTextosMissao(data);
    const resultado = calcularRessonanciaPublica(data);

    resultado.dimensoes.missao = analiseIA.score_missao;
    resultado.score += analiseIA.score_missao;

    const nivelPublico = recalcularNivelPublico(resultado.score);
    resultado.nivel = nivelPublico;
    resultado.convite_rede = nivelPublico === "alto";

    const triagem = extrairTriagemInterna(analiseIA);
    const nivelInterno = triagem.apto_treinamento ? "escolhido" : nivelPublico;

    let conviteEnviado = false;
    if (triagem.apto_treinamento && data.telegram_username) {
      conviteEnviado = await enviarConviteTelegram({
        username: data.telegram_username,
        nome: data.nome,
        territorio: data.territorio_primario,
        frase_reconhecimento: analiseIA.frase_reconhecimento,
      });
    }

    const registro = await salvarDiagnostico({
      ...data,
      score: resultado.score,
      nivel: nivelInterno,
      analise_ia: analiseIA,
      convite_enviado: conviteEnviado,
    });

    if (triagem.apto_treinamento) {
      await alertarAdminTriagem({
        id: registro.id,
        nome: data.nome,
        territorio_primario: data.territorio_primario,
        score: resultado.score,
        frase_reconhecimento: analiseIA.frase_reconhecimento,
        triagem,
      });
    }

    return Response.json({
      nivel: nivelPublico,
      score: resultado.score,
      dimensoes: resultado.dimensoes,
      frase_reconhecimento: analiseIA.frase_reconhecimento,
      resposta: RESPOSTAS_RESSONANCIA[nivelPublico],
      diagnostico_id: registro.id,
    });
  } catch (error) {
    console.error("[api/diagnostico] Erro:", error);
    return Response.json({ error: "Erro interno ao processar diagnóstico." }, { status: 500 });
  }
}
