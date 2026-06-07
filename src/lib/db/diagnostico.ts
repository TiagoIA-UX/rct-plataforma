import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { AnaliseIA, DiagnosticoData } from "@/types/diagnostico";

interface SalvarDiagnosticoInput extends DiagnosticoData {
  score: number;
  nivel: string;
  analise_ia: AnaliseIA;
  convite_enviado: boolean;
}

export async function salvarDiagnostico(data: SalvarDiagnosticoInput) {
  return prisma.diagnostico.create({
    data: {
      nome: data.nome,
      email: data.email,
      telegram_username: data.telegram_username ?? null,
      territorio_primario: data.territorio_primario,
      score: data.score,
      nivel: data.nivel,
      consumo_carne: data.analise_ia.triagem_interna?.consumo_carne_inferido ?? "nao_coletado",
      postura_violencia: data.postura_violencia,
      ahimsa_conhece: data.ahimsa_conhece,
      ahimsa_pratica: data.ahimsa_pratica,
      perspectiva: data.perspectiva_espiritualidade,
      postura_dogma: data.postura_dogma,
      aplicacao_diaria: data.aplicacao_diaria,
      maior_questao: data.maior_questao,
      analise_ia: data.analise_ia as unknown as Prisma.InputJsonValue,
      convite_enviado: data.convite_enviado,
      consentimento_lgpd: data.consentimento_lgpd,
      consentimento_contato: data.consentimento_contato,
    },
  });
}

export async function listarDiagnosticos(filtros?: {
  nivel?: string;
  territorio?: string;
  apto_treinamento?: boolean;
}) {
  const diagnosticos = await prisma.diagnostico.findMany({
    where: {
      ...(filtros?.nivel ? { nivel: filtros.nivel } : {}),
      ...(filtros?.territorio ? { territorio_primario: filtros.territorio } : {}),
    },
    orderBy: { created_at: "desc" },
  });

  if (filtros?.apto_treinamento === undefined) return diagnosticos;

  return diagnosticos.filter((d) => {
    const analise = d.analise_ia as AnaliseIA | null;
    const apto = analise?.triagem_interna?.apto_treinamento ?? false;
    return apto === filtros.apto_treinamento;
  });
}
