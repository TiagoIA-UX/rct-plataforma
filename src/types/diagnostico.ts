export type PerspectivaEspiritualidade =
  | "misticismo_puro"
  | "ciencia_pura"
  | "convergencia"
  | "ainda_descobrindo";

export type PosturaDogma =
  | "aceita"
  | "questiona"
  | "rejeita_com_logica"
  | "indiferente";

export type PosturaViolencia =
  | "justificada_em_casos"
  | "evito_mas_aceito"
  | "recuso_em_qualquer_forma";

export type AhimsaPratica =
  | "nunca_ouvi"
  | "conheço_teoricamente"
  | "pratico_parcialmente"
  | "e_minha_identidade";

export type TerritorioPrimario =
  | "saude"
  | "educacao"
  | "ciencia_tecnologia"
  | "arte_comunicacao"
  | "lideranca"
  | "familia_comunidade";

/** Níveis públicos de evangelização */
export type NivelPublico = "baixo" | "medio" | "alto";

/** Nível interno admin — treinamento avançado */
export type NivelInterno = NivelPublico | "escolhido" | "em_treinamento";

export interface DiagnosticoData {
  perspectiva_espiritualidade: PerspectivaEspiritualidade;
  postura_dogma: PosturaDogma;
  postura_violencia: PosturaViolencia;
  ahimsa_conhece: boolean;
  ahimsa_pratica: AhimsaPratica;
  territorio_primario: TerritorioPrimario;
  aplicacao_diaria: string;
  maior_questao: string;
  nome: string;
  email: string;
  telegram_username?: string;
  consentimento_lgpd: boolean;
  consentimento_contato: boolean;
}

export interface AnaliseIA {
  score_missao: number;
  indicadores_positivos: string[];
  territorio_confirmado: TerritorioPrimario;
  frase_reconhecimento: string;
  triagem_interna?: {
    ahimsa_principiologico: boolean;
    consumo_carne_inferido: string | null;
    coerencia_textual: number;
    indicadores_vida: string[];
    apto_treinamento: boolean;
    fase_sugerida: string;
    notas_admin: string;
  };
}

export interface ResultadoRessonancia {
  score: number;
  nivel: NivelPublico;
  dimensoes: {
    ahimsa: number;
    consciencia: number;
    missao: number;
    abertura: number;
  };
  convite_rede: boolean;
}

export type FaseTreinamento =
  | "divya_manas"
  | "fase_i"
  | "fase_ii"
  | "fase_iii"
  | "rede";

export type StatusProva = "pendente" | "em_analise" | "aprovado" | "reprovado" | "reformulacao";
