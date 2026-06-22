/** Textos públicos — PROMPT MESTRE Instituto NEUMA */
import { IMAGENS } from "@/lib/imagens";
import {
  MARCA_DESCRICAO,
  MARCA_FRASE_ESPERANCA,
  MARCA_PERGUNTA_FUNDAMENTAL,
  MARCA_PERGUNTA_PROFUNDA,
} from "@/lib/identidade";
import { REFS } from "@/lib/referencias";

export const ESSENCIA_PLATAFORMA = {
  titulo: MARCA_FRASE_ESPERANCA,
  texto: `Antes de «${MARCA_PERGUNTA_FUNDAMENTAL}», muitos chegam perguntando: «${MARCA_PERGUNTA_PROFUNDA}» ${MARCA_DESCRICAO} Sem dogma, sem promessas mágicas — e também sem fatalismo.`,
};

export type SecaoCaminho = {
  id: string;
  titulo: string;
  conteudo: string;
  ref: string | null;
  imagem?: string;
  creditoImagem?: string;
};

export const SECOES_CAMINHO: SecaoCaminho[] = [
  {
    id: "pergunta",
    titulo: "O que aconteceu comigo?",
    conteudo: `Ansiedade, depressão, trauma, burnout ou vazio raramente começam com curiosidade
científica. Começam com dor: por que estou assim? por que perdi a alegria? por que sinto
que me afastei de mim mesmo? O Instituto NEUMA acolhe essa pergunta antes de qualquer teoria.`,
    ref: null,
    imagem: IMAGENS.formacao.src,
    creditoImagem: IMAGENS.formacao.credito,
  },
  {
    id: "mecanismo",
    titulo: "Como isso afeta mente, corpo e comportamento",
    conteudo: `Depois da compreensão humana vem o mecanismo: o cérebro se reorganiza com prática
(Kandel, 2006). Estresse, memória e vínculo moldam como vivemos — linguagem científica
para quem precisa de nomes, não de julgamento.`,
    ref: `Estudo publicado: ${REFS.neuroplasticidade}`,
    imagem: IMAGENS.blog.src,
    creditoImagem: IMAGENS.blog.credito,
  },
  {
    id: "lentes",
    titulo: "Múltiplas tradições, uma investigação",
    conteudo: `História, simbolismo, espiritualidade e psicologia entram como lentes — nunca como
dogma único. Relatos evangélicos são um corpus entre outros; a pergunta permanece aberta
e investigativa.`,
    ref: null,
    imagem: IMAGENS.comunidade.src,
    creditoImagem: IMAGENS.comunidade.credito,
  },
  {
    id: "florescer",
    titulo: "Não só por que adoecemos — como florescemos",
    conteudo: `O NEUMA não deve ser só marca de dor. Propósito, coragem, criatividade, significado
e plenitude também pertencem ao caminho. A esperança funciona porque existe contraste:
sofrimento compreendido e possibilidade real de mudança.`,
    ref: null,
    imagem: IMAGENS.milagres.src,
    creditoImagem: IMAGENS.milagres.credito,
  },
  {
    id: "pratica",
    titulo: "O que posso fazer hoje?",
    conteudo: `Regulação emocional e vínculos estáveis sustentam mudança (Gross, 1998;
Holt-Lunstad et al., 2010). Prática concreta, aviso profissional quando necessário,
e a pergunta final: eu ainda posso mudar?`,
    ref: `Estudos: ${REFS.regulacao}; ${REFS.vinculos}`,
    imagem: IMAGENS.contribuir.src,
    creditoImagem: IMAGENS.contribuir.credito,
  },
  {
    id: "convite",
    titulo: "Fique à vontade",
    conteudo: `Blog e caminho são abertos. O questionário é opcional. Quem desejar apoiar encontra
PIX em Contribuir. Comece pela compreensão — no seu ritmo.`,
    ref: null,
  },
];

export const ESSENCIA_DESCRICAO = MARCA_DESCRICAO;
