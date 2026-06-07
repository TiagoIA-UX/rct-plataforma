import { z } from "zod";

export const contribuicaoSchema = z.object({
  autor_email: z.string().email("Informe um e-mail válido."),
  autor_nome: z.string().min(2).optional(),
  tipo: z.enum(["reforco", "correcao", "aperfeicoamento", "novo_modulo"]),
  titulo: z.string().min(10, "Título deve ter pelo menos 10 caracteres."),
  conteudo: z.string().min(200, "Desenvolvimento deve ter pelo menos 200 caracteres."),
  referencia_cientifica: z.string().url().optional().or(z.literal("")),
  modulo_relacionado: z.string().optional(),
});
