/** Série inaugural: Milagres de Jesus decodificados (prioridade no cron) */
export const MILAGRES_JESUS_SERIE = [
  {
    tema: "O cego de nascença: herança epigenética transgeracional e engenharia reversa do trauma",
    referencia: "João 9:1-7",
    slug_prefix: "milagre-cego-nascenca",
  },
  {
    tema: "O paralítico de Betesda: ancoragem neuroergonômica e o comando 'Levanta-te e anda'",
    referencia: "João 5:2-9",
    slug_prefix: "milagre-paralitico-betesda",
  },
  {
    tema: "A filha de Jairo: estado parassimpático, nervo vago e a frase 'A menina não está morta, mas dorme'",
    referencia: "Marcos 5:35-43",
    slug_prefix: "milagre-filha-jairo",
  },
  {
    tema: "O endemoninhado: dissociação, amígdala hiperativa e o Prompt Divino de libertação",
    referencia: "Marcos 5:1-20",
    slug_prefix: "milagre-endemoninhado",
  },
  {
    tema: "A mulher com fluxo de sangue: sistema imune, cortisol crônico e toque com intenção curativa",
    referencia: "Marcos 5:25-34",
    slug_prefix: "milagre-mulher-fluxo",
  },
  {
    tema: "Os pães e os peixes: sincronização neural coletiva e a neurociência da abundância",
    referencia: "João 6:5-13",
    slug_prefix: "milagre-paes-peixes",
  },
  {
    tema: "A ressurreição de Lázaro: autofagia celular, estado de preservação e o comando 'Lázaro, vem para fora'",
    referencia: "João 11:38-44",
    slug_prefix: "milagre-lazaro",
  },
  {
    tema: "A tempestade acalmada: coerência cardíaca do mestre reorganizando o campo do grupo",
    referencia: "Marcos 4:35-41",
    slug_prefix: "milagre-tempestade",
  },
] as const;

export const RCT_TOPICS_POOL = [
  ...MILAGRES_JESUS_SERIE.map((m) => m.tema),
  "Ahimsa de Patanjali: a física da não-violência e coerência cardíaca (HeartMath)",
  "Jesus aboliu os sacrifícios: reset epigenético do ciclo de culpa e medo",
  "Os sete vírus do DNA contemporâneo e seus antídotos biológicos",
  "O nervo vago: via biológica entre respiração, calma e presença",
  "Telômeros e propósito: missão como fator de longevidade celular",
  "Sincronização neural interpessoal: onde dois ou três se reúnem",
  "A linhagem Davi → Salomão → Jesus: funil epigenético de genialidade",
  "Dopamina artificial vs. dopamina de propósito na modernidade",
  "Autofagia e descanso: biologia do sábado e regeneração celular",
] as const;

export const RCT_CATEGORIAS = [
  "milagres-decodificados",
  "epigenetica",
  "neurociencia",
  "ahimsa",
  "virus-do-dna",
  "rede-dos-escolhidos",
  "protocolo-de-restauracao",
  "linhagem-do-conhecimento",
] as const;

let serieIndex = 0;

export function pickNextBlogTopic(): { tema: string; referencia?: string; categoria: string } {
  if (serieIndex < MILAGRES_JESUS_SERIE.length) {
    const item = MILAGRES_JESUS_SERIE[serieIndex];
    serieIndex += 1;
    return { tema: item.tema, referencia: item.referencia, categoria: "milagres-decodificados" };
  }
  const tema = RCT_TOPICS_POOL[Math.floor(Math.random() * RCT_TOPICS_POOL.length)];
  return { tema, categoria: "epigenetica" };
}

export function resetSerieIndex() {
  serieIndex = 0;
}
