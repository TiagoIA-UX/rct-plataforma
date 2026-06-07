import { z } from "zod";

/** Schema PÚBLICO — sem critérios internos de treinamento */
export const diagnosticoSchema = z.object({
  perspectiva_espiritualidade: z.enum([
    "misticismo_puro",
    "ciencia_pura",
    "convergencia",
    "ainda_descobrindo",
  ]),
  postura_dogma: z.enum(["aceita", "questiona", "rejeita_com_logica", "indiferente"]),
  postura_violencia: z.enum([
    "justificada_em_casos",
    "evito_mas_aceito",
    "recuso_em_qualquer_forma",
  ]),
  ahimsa_conhece: z.boolean(),
  ahimsa_pratica: z.enum([
    "nunca_ouvi",
    "conheço_teoricamente",
    "pratico_parcialmente",
    "e_minha_identidade",
  ]),
  territorio_primario: z.enum([
    "saude",
    "educacao",
    "ciencia_tecnologia",
    "arte_comunicacao",
    "lideranca",
    "familia_comunidade",
  ]),
  aplicacao_diaria: z.string().min(20, "Descreva sua aplicação diária com mais detalhes."),
  maior_questao: z.string().min(10, "Descreva sua maior questão."),
  nome: z.string().min(2, "Informe seu nome."),
  email: z.string().email("Informe um e-mail válido."),
  telegram_username: z.string().optional(),
  consentimento_lgpd: z.literal(true, {
    errorMap: () => ({ message: "Consentimento LGPD é obrigatório." }),
  }),
  consentimento_contato: z.boolean(),
});
