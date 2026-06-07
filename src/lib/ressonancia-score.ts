import type { DiagnosticoData, ResultadoRessonancia } from "@/types/diagnostico";

/**
 * Score PÚBLICO de evangelização — não expõe critérios internos de treinamento.
 * Ahimsa principiológica é avaliada apenas no painel admin (triagem interna).
 */
export function calcularRessonanciaPublica(data: DiagnosticoData): ResultadoRessonancia {
  let score = 0;
  const dimensoes = { ahimsa: 0, consciencia: 0, missao: 0, abertura: 0 };

  if (data.perspectiva_espiritualidade === "convergencia") {
    dimensoes.consciencia += 25;
    score += 25;
  } else if (data.perspectiva_espiritualidade === "ciencia_pura") {
    dimensoes.consciencia += 20;
    score += 20;
  } else if (data.perspectiva_espiritualidade === "ainda_descobrindo") {
    dimensoes.consciencia += 15;
    score += 15;
  } else if (data.perspectiva_espiritualidade === "misticismo_puro") {
    dimensoes.consciencia += 5;
    score += 5;
  }

  if (data.postura_dogma === "rejeita_com_logica") {
    dimensoes.consciencia += 15;
    score += 15;
  } else if (data.postura_dogma === "questiona") {
    dimensoes.consciencia += 10;
    score += 10;
  }

  if (data.postura_violencia === "recuso_em_qualquer_forma") {
    dimensoes.abertura += 15;
    score += 15;
  } else if (data.postura_violencia === "evito_mas_aceito") {
    dimensoes.abertura += 8;
    score += 8;
  }

  if (data.ahimsa_pratica === "e_minha_identidade") {
    dimensoes.abertura += 10;
    score += 10;
  } else if (data.ahimsa_pratica === "pratico_parcialmente") {
    dimensoes.abertura += 5;
    score += 5;
  } else if (data.ahimsa_pratica === "conheço_teoricamente") {
    dimensoes.abertura += 3;
    score += 3;
  }

  const nivel = recalcularNivelPublico(score);

  return {
    score,
    nivel,
    dimensoes,
    convite_rede: nivel === "alto",
  };
}

export function recalcularNivelPublico(score: number): ResultadoRessonancia["nivel"] {
  if (score >= 70) return "alto";
  if (score >= 45) return "medio";
  if (score >= 25) return "baixo";
  return "baixo";
}

/** @deprecated Use calcularRessonanciaPublica — mantido para compatibilidade interna */
export function calcularRessonancia(data: DiagnosticoData): ResultadoRessonancia {
  return calcularRessonanciaPublica(data);
}

export function recalcularNivel(score: number): ResultadoRessonancia["nivel"] {
  return recalcularNivelPublico(score);
}
