import {
  CLAUSULA_EPIGENETICA,
  validarSalvaguardaEpigenetica,
  validarPrincipioMestre,
  usaProtocoloLegadoTitulo,
} from "@/lib/salvaguardas";
import type { BlocoBencaoMaldicao } from "@/lib/viveka"; // idem

export function montarHtmlBencaoMaldicao(bloco: BlocoBencaoMaldicao): string {
  const fontes = bloco.base_cientifica.map((f) => `<li>${f}</li>`).join("");
  return `
<section class="rct-bencao-maldicao" data-rct-template="v2">
  <h2>O que ajuda e o que pode prejudicar — com honestidade total</h2>
  <div class="rct-bloco rct-bencao">
    <p><strong>🌱 Bênção</strong></p>
    <p>${bloco.bencao}</p>
  </div>
  <div class="rct-bloco rct-maldicao">
    <p><strong>⚠️ Maldição</strong></p>
    <p>${bloco.maldicao}</p>
  </div>
  <div class="rct-bloco rct-base">
    <p><strong>🔬 Base científica</strong></p>
    <ul>${fontes}</ul>
  </div>
  <div class="rct-bloco rct-salvaguarda">
    <p><strong>🛡️ Aviso importante</strong></p>
    <p>${bloco.salvaguarda}</p>
  </div>
  <div class="rct-bloco rct-viveka">
    <p><strong>🪞 Pergunta para refletir</strong></p>
    <p><em>${bloco.pergunta_viveka}</em></p>
  </div>
</section>`.trim();
}

export function montarConteudoArtigoCompleto(
  conteudoHtml: string,
  bloco: BlocoBencaoMaldicao,
  categoria: string
): string {
  let html = conteudoHtml.trim();
  if (categoria === "epigenetica-sagrada" || html.toLowerCase().includes("epigen")) {
    html = `<aside class="rct-clausula-epigenetica"><p>${CLAUSULA_EPIGENETICA}</p></aside>\n${html}`;
  }
  return `${html}\n${montarHtmlBencaoMaldicao(bloco)}`;
}

export function validarArtigoAntesPublicar(
  titulo: string,
  conteudoHtml: string,
  categoria: string
): { ok: boolean; motivo?: string } {
  const cabecalho = `${titulo}\n${conteudoHtml.slice(0, 200)}`;
  if (usaProtocoloLegadoTitulo(cabecalho.split("\n").slice(0, 2).join("\n"))) {
    return {
      ok: false,
      motivo:
        "Título/subtítulo no protocolo legado (yogue/samadhi/dharana) — revisão editorial NEUMA obrigatória.",
    };
  }
  const blob = `${titulo}\n${conteudoHtml}`;
  if (categoria === "epigenetica-sagrada" && !blob.includes("nunca superioridade")) {
    return {
      ok: false,
      motivo: "Categoria epigenetica-sagrada exige cláusula anti-superioridade.",
    };
  }
  const principio = validarPrincipioMestre(blob);
  if (!principio.ok) {
    return principio;
  }
  return validarSalvaguardaEpigenetica(blob);
}
