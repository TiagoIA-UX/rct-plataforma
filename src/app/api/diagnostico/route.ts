import { RESPOSTAS_RESSONANCIA, elegivelConviteRessonancia } from "@/lib/convites";
import { salvarDiagnostico } from "@/lib/db/diagnostico";
import { analisarTextosMissao } from "@/lib/groq-analise";
import { calcularScoreTermos } from "@/lib/ressonancia-pesos";
import { calcularRessonanciaPublica, recalcularNivelPublico } from "@/lib/ressonancia-score";
import { extrairTriagemInterna } from "@/lib/triagem-interna";
import { alertarAltaRessonancia, enviarConviteTelegram } from "@/lib/telegram-bot";
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

    const scoreTermos = calcularScoreTermos(data.aplicacao_diaria, data.maior_questao);
    const bonusTermos = Math.round(scoreTermos * 0.3);
    resultado.dimensoes.ahimsa += bonusTermos;
    resultado.score += bonusTermos;

    resultado.dimensoes.missao = analiseIA.score_missao;
    resultado.score += analiseIA.score_missao;

    resultado.score = Math.min(100, resultado.score);
    const nivelPublico = recalcularNivelPublico(resultado.score);
    resultado.nivel = nivelPublico;
    resultado.convite_rede = elegivelConviteRessonancia(resultado.score);

    const triagem = extrairTriagemInterna(analiseIA);
    const nivelInterno = triagem.apto_treinamento ? "escolhido" : nivelPublico;

    let conviteEnviado = false;
    if (resultado.convite_rede && data.telegram_username) {
      conviteEnviado = await enviarConviteTelegram({
        username: data.telegram_username,
      });
    }

    if (resultado.convite_rede) {
      await alertarAltaRessonancia({
        score: resultado.score,
        territorio_primario: data.territorio_primario,
        textosAnalise: [data.aplicacao_diaria, data.maior_questao],
      });
    }

    const registro = await salvarDiagnostico({
      ...data,
      score: resultado.score,
      nivel: nivelInterno,
      analise_ia: analiseIA,
      convite_enviado: conviteEnviado,
    });

    return Response.json({
      nivel: nivelPublico,
      score: resultado.score,
      dimensoes: resultado.dimensoes,
      frase_reconhecimento: analiseIA.frase_reconhecimento,
      resposta: RESPOSTAS_RESSONANCIA[nivelPublico],
      diagnostico_id: registro.id,
      acesso_formacao: triagem.apto_treinamento,
      convite_rede: resultado.convite_rede,
    });
  } catch (error) {
    console.error("[api/diagnostico] Erro:", error);
    return Response.json({ error: "Erro interno ao processar diagnóstico." }, { status: 500 });
  }
}
