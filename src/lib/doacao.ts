/** Dados públicos para doação — configure no .env.local ou use os padrões abaixo */

export const DOACAO = {
  chavePix: process.env.NEXT_PUBLIC_PIX_CHAVE ?? "61699939000180",
  cnpjFormatado: process.env.NEXT_PUBLIC_MEI_CNPJ ?? "61.699.939/0001-80",
  titular: process.env.NEXT_PUBLIC_PIX_TITULAR ?? "RCT Plataforma",
  cidade: process.env.NEXT_PUBLIC_PIX_CIDADE ?? "",
  emailContato: process.env.NEXT_PUBLIC_CONTATO_EMAIL ?? "zairyx.ai@gmail.com",
  paypalEmail: process.env.NEXT_PUBLIC_PAYPAL_EMAIL ?? "tiagorocha1777@gmail.com",
} as const;

export const DESTINOS_APOIO = [
  "Alcance da palavra — mais pessoas conhecendo o caminho",
  "Manutenção do site — hospedagem, banco de dados e ferramentas gratuitas que sustentam a plataforma",
  "Expansão digital — novos conteúdos, acessibilidade e melhorias técnicas",
  "Espaço físico — criação de um lugar de encontro, oração e formação",
] as const;
