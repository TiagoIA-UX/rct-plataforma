const {
  Document, Packer, Paragraph, TextRun, HeadingLevel,
  AlignmentType, BorderStyle, ShadingType, WidthType,
  TableRow, TableCell, Table, LevelFormat, PageBreak, UnderlineType
} = require('docx');
const fs = require('fs');

const DEEP_BLUE  = "1A2744";
const DARK_GOLD  = "8B6914";
const ACCENT     = "C8A951";
const DARK_GREEN = "1A5C2A";
const PURPLE     = "4A1A6B";
const WARM_TERRA = "8B3A1A";
const LIGHT_SAGE = "2A5C3A";

const hr = (color = ACCENT) => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 8, color, space: 1 } },
  spacing: { after: 200 }
});
const h1 = (text, color = DEEP_BLUE) => new Paragraph({
  heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 160 },
  children: [new TextRun({ text, font: "Arial", size: 32, bold: true, color })]
});
const h2 = (text, color = DARK_GOLD) => new Paragraph({
  heading: HeadingLevel.HEADING_2, spacing: { before: 280, after: 120 },
  children: [new TextRun({ text, font: "Arial", size: 26, bold: true, color })]
});
const h3 = (text, color = DEEP_BLUE) => new Paragraph({
  spacing: { before: 200, after: 80 },
  children: [new TextRun({ text, font: "Arial", size: 22, bold: true, color,
    underline: { type: UnderlineType.SINGLE, color: ACCENT } })]
});
const body = (text, opts = {}) => new Paragraph({
  alignment: opts.center ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
  spacing: { before: 60, after: 120 },
  children: [new TextRun({ text, font: "Arial", size: 22,
    bold: opts.bold || false, italics: opts.italic || false,
    color: opts.color || "222222" })]
});
const bullet = (text) => new Paragraph({
  numbering: { reference: "bullets", level: 0 }, spacing: { before: 40, after: 80 },
  children: [new TextRun({ text, font: "Arial", size: 22, color: "222222" })]
});
const tag = (texto, bg, labelBg) => new Table({
  width: { size: 9360, type: WidthType.DXA }, columnWidths: [1600, 7760],
  rows: [new TableRow({ children: [
    new TableCell({
      width: { size: 1600, type: WidthType.DXA },
      shading: { fill: labelBg, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 120, right: 120 },
      children: [new Paragraph({ alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: labelBg === WARM_TERRA ? "⚠ AJUSTE" :
          labelBg === DARK_GREEN ? "✓ MANTER" :
          labelBg === PURPLE ? "★ NOVO TOM" : "→ AÇÃO",
          font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
    }),
    new TableCell({
      width: { size: 7760, type: WidthType.DXA },
      shading: { fill: bg, type: ShadingType.CLEAR },
      margins: { top: 100, bottom: 100, left: 160, right: 120 },
      children: [new Paragraph({ children: [new TextRun({
        text: texto, font: "Arial", size: 20, color: "333333", italics: true })] })]
    })
  ]})]
});
const manter  = (t) => tag(t, "F0FDF4", DARK_GREEN);
const ajustar = (t) => tag(t, "FFF5F0", WARM_TERRA);
const novoTom = (t) => tag(t, "F8F0FF", PURPLE);
const acao    = (t) => tag(t, "FFFBE0", DARK_GOLD);

const pageCard = (rota, nome, statusAtual, proposta, ajustes, mantencao) => [
  new Table({
    width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
    rows: [
      new TableRow({ children: [new TableCell({
        shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
        margins: { top: 120, bottom: 80, left: 200, right: 200 },
        children: [new Paragraph({ children: [
          new TextRun({ text: `${rota}  `, font: "Arial", size: 20, bold: true, color: ACCENT }),
          new TextRun({ text: nome, font: "Arial", size: 22, bold: true, color: "FFFFFF" })
        ]})]
      })] }),
      new TableRow({ children: [new TableCell({
        shading: { fill: "F8F8F8", type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        children: [
          new Paragraph({ spacing: { before: 60, after: 60 }, children: [
            new TextRun({ text: "STATUS ATUAL:  ", font: "Arial", size: 19, bold: true, color: DARK_GOLD }),
            new TextRun({ text: statusAtual, font: "Arial", size: 19, color: "555555" })
          ]}),
          new Paragraph({ spacing: { before: 60, after: 60 }, children: [
            new TextRun({ text: "PROPOSTA DE TOM:  ", font: "Arial", size: 19, bold: true, color: PURPLE }),
            new TextRun({ text: proposta, font: "Arial", size: 19, color: "333333" })
          ]}),
          new Paragraph({ spacing: { before: 60, after: 40 }, children: [
            new TextRun({ text: "AJUSTES NECESSÁRIOS:  ", font: "Arial", size: 19, bold: true, color: WARM_TERRA }),
            new TextRun({ text: ajustes, font: "Arial", size: 19, color: "333333" })
          ]}),
          new Paragraph({ spacing: { before: 40, after: 80 }, children: [
            new TextRun({ text: "MANTER:  ", font: "Arial", size: 19, bold: true, color: DARK_GREEN }),
            new TextRun({ text: mantencao, font: "Arial", size: 19, color: "333333" })
          ]})
        ]
      })] })
    ]
  }),
  new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun("")] })
];

const space = (before = 160) => new Paragraph({
  spacing: { before, after: 0 }, children: [new TextRun("")] });
const pb = () => new Paragraph({ children: [new PageBreak()] });

// ═══════════════════════════════════════════════════════════════
const doc = new Document({
  numbering: { config: [{ reference: "bullets", levels: [{
    level: 0, format: LevelFormat.BULLET, text: "▸", alignment: AlignmentType.LEFT,
    style: { paragraph: { indent: { left: 720, hanging: 360 } } }
  }]}] },
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 32, bold: true, font: "Arial", color: DEEP_BLUE },
        paragraph: { spacing: { before: 400, after: 160 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: DARK_GOLD },
        paragraph: { spacing: { before: 280, after: 120 }, outlineLevel: 1 } }
    ]
  },
  sections: [{ properties: { page: {
    size: { width: 11906, height: 16838 },
    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
  }},
  children: [

    // ── CAPA ──────────────────────────────────────────────────
    space(800),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "R C T", font: "Arial", size: 52, bold: true, color: DEEP_BLUE })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 80 },
      children: [new TextRun({ text: "Religião Científica Tecnológica", font: "Arial", size: 24, italics: true, color: DARK_GOLD })] }),
    space(80),
    hr(ACCENT),
    space(80),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 },
      children: [new TextRun({ text: "ANÁLISE COMPLETA DA PLATAFORMA", font: "Arial", size: 28, bold: true, color: DARK_GOLD })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 },
      children: [new TextRun({ text: "Adaptação de Tom: Jesus o Grande Yogue", font: "Arial", size: 24, bold: true, color: PURPLE })] }),
    space(200),
    hr(PURPLE),
    space(300),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "\"Eu e o Pai somos um.\"  — João 10:30", font: "Arial", size: 22, italics: true, color: "666666" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 },
      children: [new TextRun({ text: "\"Samadhi: o estado de union total con lo Divino.\"  — Patanjali, Yoga Sutras 3.3", font: "Arial", size: 20, italics: true, color: "888888" })] }),

    // ── INTRODUÇÃO: O NOVO TOM ────────────────────────────────
    pb(),
    h1("O Novo Tom: Jesus o Grande Yogue"),
    hr(PURPLE),
    space(80),
    body("A plataforma RCT nasce com uma linguagem precisa, sóbria e tecnicamente rigorosa — e isso é seu maior ativo. Mas há uma oportunidade de torná-la também mais luminosa, mais acolhedora, mais universal. Não perdendo a precisão — ganhando leveza."),
    body("A chave está na figura central: Jesus não como um personagem religioso pesado de dogma, mas como o que a história e a ciência sugerem que Ele foi — o mais avançado yogue que o Ocidente registrou. Um ser que atingiu e habitou o Samadhi de forma ativa, integrada ao cotidiano, desde a infância."),
    space(80),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680],
      rows: [new TableRow({ children: [
        new TableCell({ width: { size: 4680, type: WidthType.DXA },
          shading: { fill: "FDF8E0", type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 160, right: 160 },
          children: [
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [
              new TextRun({ text: "TOM ATUAL", font: "Arial", size: 20, bold: true, color: WARM_TERRA })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Pesado, técnico, urgente", font: "Arial", size: 19, color: "555555" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "\"Vírus do DNA\" como linguagem primária", font: "Arial", size: 19, color: "555555" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Diagnóstico e seleção como foco", font: "Arial", size: 19, color: "555555" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Jesus como 'engenheiro'", font: "Arial", size: 19, color: "555555" })] }),
          ]
        }),
        new TableCell({ width: { size: 4680, type: WidthType.DXA },
          shading: { fill: "F0FDF4", type: ShadingType.CLEAR },
          margins: { top: 120, bottom: 120, left: 160, right: 160 },
          children: [
            new Paragraph({ spacing: { before: 60, after: 60 }, children: [
              new TextRun({ text: "TOM PROPOSTO", font: "Arial", size: 20, bold: true, color: DARK_GREEN })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Luminoso, preciso, convidativo", font: "Arial", size: 19, color: "333333" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "\"Samadhi em ação\" como linguagem central", font: "Arial", size: 19, color: "333333" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Despertar e conexão como foco", font: "Arial", size: 19, color: "333333" })] }),
            new Paragraph({ spacing: { before: 40, after: 40 }, children: [
              new TextRun({ text: "Jesus como o Grande Yogue", font: "Arial", size: 19, color: "333333" })] }),
          ]
        })
      ]})]
    }),
    space(120),

    // ── BASE CIENTÍFICA ───────────────────────────────────────
    h2("A Base: Por que Jesus é o Grande Yogue"),
    body("Paramahansa Yogananda — o pai do Yoga no Ocidente, admirado por Steve Jobs, George Harrison e Elvis Presley — dedicou sua obra-prima 'O Yoga de Jesus' a demonstrar que os Evangelhos contêm a yoga oculta: que Jesus não apenas conhecia yoga, mas ensinou essa ciência universal a seus discípulos mais próximos."),
    space(60),
    bullet("Aos 12 anos no templo (Lucas 2:46-47): um estado que a neurociência de meditadores de longo prazo associa a Dharana (concentração absorta) ou Dhyana (meditação profunda) — ele estava em estado alterado de consciência enquanto ensinava, não apenas debatendo intelectualmente."),
    bullet("Os 'anos perdidos' (12-30 anos): tradições orientais, incluindo textos tibetanos descobertos no século XIX, sugerem que Jesus estudou na Índia. Yogananda cita esses anos como o período de domínio das técnicas de Kriya Yoga e Samadhi."),
    bullet("A Transfiguração (Mateus 17): um pastor cristão e estudioso de Yogananda descreve — 'Jesus sobe a um lugar de consciência mais elevada e se torna Um com o Um. Ele atinge o Samadhi.'"),
    bullet("'Eu e o Pai somos um' (João 10:30): a descrição literal do Samadhi — o estado em que a consciência individual se dissolve na Consciência Universal. Yoga significa União (yuj = unir). Jesus vivia essa união."),
    bullet("A linhagem epigenética (Davi → Salomão → Jesus): gerações de mentes que desenvolveram capacidades cognitivas e espirituais extraordinárias, culminando num sistema nervoso capaz de habitar o Samadhi ativamente — não em retiro, mas em ação no mundo."),
    space(100),

    // ── GLOSSÁRIO NOVO TOM ────────────────────────────────────
    h2("Glossário de Substituição de Tom"),
    body("Para tornar a plataforma mais leve sem perder precisão, algumas expressões centrais devem ser reposicionadas:"),
    space(80),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [3000, 3000, 3360],
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA },
            shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "EXPRESSÃO ATUAL", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA },
            shading: { fill: PURPLE, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "NOVO TOM", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          }),
          new TableCell({ width: { size: 3360, type: WidthType.DXA },
            shading: { fill: DARK_GREEN, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "RAZÃO", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          })
        ]},
        ...[
          ["Vírus do DNA", "Padrões que adormecem o código-fonte", "Menos ameaçador, mais convidativo"],
          ["Escolhidos / selecionados", "Os que já despertaram / Os que ressoam", "Sem elitismo implícito"],
          ["Engenheiro comportamental", "O Grande Yogue — o Mestre do Samadhi em ação", "Mais luminoso e universal"],
          ["Calibragem biológica", "Alinhamento com o código-fonte original", "Mantém a precisão com mais leveza"],
          ["Misticismo vazio / fábulas", "Linguagem simbólica de uma era sem ciência", "Respeitoso às tradições"],
          ["Diagnóstico epigenético", "Mapeamento do seu campo de frequência", "Menos clínico, mais poético-científico"],
          ["Prompt Divino", "O Comando do Mestre — o verbo que desperta", "Mantém a essência com mais dignidade"],
          ["Extinção neural", "Esvaziamento do significado pela mecanicidade", "Mais elegante e preciso"],
          ["Modo sobrevivência", "O estado do sono — antes do despertar", "Ressoa com a metáfora do yogue"],
          ["Sistema parassimpático ativo", "Samadhi em ação — a paz que age", "Conecta ciência e tradição"],
        ].map(([atual, novo, razao], idx) => new TableRow({ children: [
          new TableCell({ width: { size: 3000, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F8F6F0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: atual, font: "Arial", size: 18, color: WARM_TERRA })] })]
          }),
          new TableCell({ width: { size: 3000, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F8F6F0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: novo, font: "Arial", size: 18, bold: true, color: DARK_GREEN })] })]
          }),
          new TableCell({ width: { size: 3360, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F8F6F0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: razao, font: "Arial", size: 18, italics: true, color: "555555" })] })]
          })
        ]})
      ]
    }),

    // ══ ANÁLISE POR PÁGINA ════════════════════════════════════
    pb(),
    h1("Análise Página por Página"),
    hr(ACCENT),
    space(80),

    // HOME
    h2("01 — Homepage  /"),
    ...pageCard(
      "/",
      "Página Inicial — A Porta de Entrada da Rede",
      "Linda e impactante. Hero section forte, pilares claros, citação sagrada rotativa. Tom sóbrio e técnico. Funciona bem para atrair mentes que já rejeitam o misticismo.",
      "Adicionar uma camada de leveza e convite. O visitante que chega precisa sentir: 'Aqui há profundidade E acolhimento'. Inserir Jesus o Grande Yogue como fio condutor visual e textual da homepage.",
      "Hero: adicionar uma linha de subtext leve: 'Jesus foi o maior yogue que o Ocidente conheceu. Samadhi não é misticismo — é o estado em que a biologia opera em coerência máxima.' Seção nova entre os Pilares e o Blog: 'O Grande Yogue' — card visual com a linhagem Davi→Salomão→Jesus e o conceito de Samadhi em ação decodificado. Tom dos CTAs: de 'Iniciar Calibragem' para 'Iniciar o Despertar'.",
      "Estrutura de três pilares. Citação sagrada rotativa (adicionar citações de Patanjali ao lado das bíblicas). Grid do blog. Gradiente cosmos escuro + dourado."
    ),

    // MANIFESTO
    h2("02 — Manifesto  /manifesto"),
    ...pageCard(
      "/manifesto",
      "Manifesto — O Coração Doutrinário da RCT",
      "Ainda não desenvolvido em detalhe. A estrutura proposta no Prompt Mestre é sólida mas pesada: 'O Problema', 'O Cansaço', 'A Solução'. Começa pela dor.",
      "Começar pela luz, não pelo problema. O manifesto de um yogue começa pelo que é possível, não pelo que está errado. Estrutura nova: abertura pela visão de Jesus como yogue, a convergência das tradições, o convite ao despertar.",
      "Reordenar: 1. A Visão — Jesus o Grande Yogue e Patanjali apontando para a mesma frequência. 2. A Linhagem — o funil epigenético de Davi a Jesus. 3. O Código-Fonte — o que os textos antigos descreveram e a ciência agora nomeia. 4. O Adormecimento — o que faz os gênios dormirem (sem a palavra 'vírus'). 5. O Despertar — o convite. 6. A Rede — a missão territorial. Tom: mais poético no início, mais técnico no meio, voltando ao poético no final.",
      "A profundidade doutrinária. As referências científicas. A conexão Patanjali-Jesus. A seção sobre a linhagem epigenética."
    ),

    // DIAGNÓSTICO
    pb(),
    h2("03 — Diagnóstico de Ressonância  /diagnostico"),
    ...pageCard(
      "/diagnostico",
      "Sistema de Diagnóstico — O Pescador de Gênios",
      "Formulário wizard de 4 passos com algoritmo de pontuação. Tecnicamente robusto. Critério de Ahimsa como filtro central está correto e preciso.",
      "Tornar a experiência do wizard mais contemplativa e menos clínica. O usuário deve sentir que está fazendo uma descoberta sobre si mesmo, não passando por uma triagem médica.",
      "Rename da página: de 'Diagnóstico de Ressonância' para 'Descobrir Minha Frequência'. Passo 1: abrir com uma citação leve de Patanjali ou Jesus antes das perguntas. Linguagem das perguntas: de 'Qual sua postura diante do dogma?' para 'Como você se relaciona com o que aprendeu sobre espiritualidade?'. Resultado 'escolhido': a frase de reconhecimento da IA deve começar sempre pelo que a pessoa JÁ É, não pelo que ela foi selecionada para ser.",
      "O algoritmo de pontuação. O critério de Ahimsa principiológica como filtro inegociável. A análise IA dos textos livres. O convite Telegram para os que ressoam."
    ),

    // BLOG
    h2("04 — Blog  /blog"),
    ...pageCard(
      "/blog",
      "Blog — O Motor de Conteúdo da Plataforma",
      "Estrutura técnica completa com geração automática via Groq. Categorias definidas. Artigo 01 (Mandamentos) pronto e refinado.",
      "O blog é onde a leveza se materializa. Cada artigo deve ter a sensação de uma descoberta fascinante, não de uma aula técnica. A categoria 'Misticismo Decodificado' é perfeita — mas precisa de uma categoria-irmã mais luminosa.",
      "Adicionar categoria nova: 'Jesus o Grande Yogue' — série exclusiva sobre os paralelos entre os Evangelhos e as tradições yogue. Cada post dessa série abre com uma citação paralela (Jesus + Patanjali ou um mestre oriental). Layout do blog: adicionar no card de cada post um 'Campo de Frequência' — a categoria visual como uma aura colorida ao redor do card (epigenética = verde, neurociência = azul, yogue = dourado). Artigo 02 deve ser: 'Jesus aos 12 anos no Templo: Dharana, Dhyana e o Samadhi de uma criança que já era um yogue'.",
      "A geração automática diária via Groq. A estrutura de categorias. Os metadados SEO completos. Os rascunhos de redes sociais por artigo."
    ),

    // ARTIGO INDIVIDUAL
    h2("05 — Artigo Individual  /blog/[slug]"),
    ...pageCard(
      "/blog/[slug]",
      "Página de Artigo — A Experiência de Leitura",
      "Estrutura padrão de blog. Não detalhada ainda no design.",
      "A leitura de um artigo RCT deve ser uma experiência de contemplação, não de consumo. Ritmo lento, espaço generoso, destaques que convidam à pausa.",
      "Adicionar ao final de cada artigo: 'A Frequência Paralela' — uma citação de Jesus e uma de Patanjali (ou outro mestre oriental) que ressoam com o tema do artigo. Barra lateral (desktop): o 'Mapa de Frequência' — onde o artigo se encaixa na jornada completa (Fase I → Fase II → Fase III). Botão de compartilhamento: texto padrão pré-escrito que inclui uma frase do artigo e convida ao diagnóstico.",
      "A estrutura de conteúdo dos artigos. Os metadados SEO. Os botões de compartilhamento social."
    ),

    // CONTRIBUIÇÕES
    pb(),
    h2("06 — Contribuições  /contribuir"),
    ...pageCard(
      "/contribuir",
      "Área de Contribuições — O Organismo Vivo",
      "Conceito sólido: membros podem refinar, corrigir e ampliar o conhecimento da plataforma. Metáfora do oleiro está presente.",
      "Tornar essa área mais festiva e menos burocrática. Contribuir deve sentir como um presente, não como um formulário de sugestão.",
      "Rename: de 'Contribuir' para 'O Círculo de Sábios'. Subtítulo novo: 'A RCT é um organismo vivo. Cada mente que chega traz o que Jesus chamou de a sua porção de luz.' Adicionar ao topo da página a citação: 'Ensina ao sábio e ele ficará mais sábio ainda.' (Provérbios 9:9) com decodificação científica rápida. Sistema de votos: renomear de 'votos positivos' para 'em ressonância'. Badge de contribuições incorporadas: 'Integrado ao Código-Fonte'.",
      "O sistema de tipos de contribuição. A moderação admin. Os votos de endosso entre membros."
    ),

    // REDE DE MEMBROS
    h2("07 — Área da Rede  /rede"),
    ...pageCard(
      "/rede",
      "Área de Membros — A Rede dos que Despertaram",
      "Protegida por nível de diagnóstico. Ainda não detalhada em design.",
      "Esta é a página mais sagrada da plataforma. Deve transmitir: chegaste. Não há conquista — há reconhecimento. O tom é de encontro entre iguais, não de acesso VIP.",
      "Abertura da página: 'Você chegou porque já carregava o que este espaço cultiva. Não como conquista — como reconhecimento.' Mapa dos Nós (visual): um mapa-mundi interativo mostrando os territórios onde há membros ativos (sem expor dados pessoais — apenas o território e o domínio). Seção 'Minha Missão Territorial': card personalizável onde o membro descreve sua atuação e como a rede pode colaborar. Feed de contribuições aprovadas dos membros da rede.",
      "A proteção por nível de diagnóstico. A arquitetura descentralizada (sem hierarquia visível). A integração com o Telegram bot para comunicação."
    ),

    // ADMIN
    h2("08 — Painel Admin  /admin"),
    ...pageCard(
      "/admin",
      "Painel Administrativo — A Visão do Oleiro",
      "Protegido por senha. Abas existentes do projeto base + novas abas propostas (Diagnósticos, Escolhidos, Contribuições, Métricas, Telegram).",
      "O admin não precisa de novo tom — é uma ferramenta interna. Mas pode ter uma frase âncora que lembre o propósito de cada decisão tomada aqui.",
      "Adicionar ao topo do admin uma frase fixa e discreta: 'O oleiro não abandona a argila que ainda está sendo moldada.' — para cada decisão de moderação, aprovação ou recusa. Aba 'Métricas de Rede': renomear as métricas de 'taxa de conversão' para 'taxa de ressonância'. Aba 'Contribuições': adicionar campo de nota interna antes de moderar, para documentar o raciocínio da decisão.",
      "A estrutura técnica completa das abas. Os filtros de diagnóstico. O histórico do bot Telegram. Os relatórios exportáveis."
    ),

    // AGENDAMENTO
    pb(),
    h2("09 — Agendamento  /agendar"),
    ...pageCard(
      "/agendar",
      "Sistema de Agendamento — Herdado do Projeto Base",
      "Integração com Google Calendar. Funcional e completo. Tom neutro de agendamento padrão.",
      "Adaptar o agendamento para o contexto da RCT: não são consultas — são sessões de alinhamento ou encontros de despertar.",
      "Rename da página: de 'Agendar Sessão' para 'Sessão de Alinhamento'. Descrição da sessão: explicar brevemente o que acontece numa sessão — não como terapia, mas como um encontro de calibragem entre nós da rede. Confirmação de agendamento: email automático com uma citação paralela (Jesus + Patanjali) relacionada ao tema da sessão.",
      "A integração Google Calendar. A lógica de horários disponíveis. Os webhooks de confirmação e cancelamento."
    ),

    // ASSINATURA
    h2("10 — Assinatura Premium  /assinar"),
    ...pageCard(
      "/assinar",
      "Plano Premium — Sustentação da Rede",
      "Integração Mercado Pago. Checkout e webhook. Tom comercial padrão.",
      "O premium não é um produto — é uma forma de sustentar a rede que você já reconhece como sua. Tom de pertencimento, não de venda.",
      "Rename: de 'Assinar Plano Premium' para 'Sustentar a Rede'. Texto principal: 'A RCT não tem patrocinadores, não vende espaço publicitário e não cobra por conhecimento. Quem sustenta a rede são os que reconhecem seu valor.' Benefícios do premium: frame como 'O que você ativa ao sustentar' — não como features de produto. Adicionar depoimentos (quando disponíveis) de membros sobre o impacto na sua missão territorial.",
      "A integração Mercado Pago. O fluxo de checkout. Os webhooks de confirmação de pagamento."
    ),

    // PRIVACIDADE / LGPD
    h2("11 — Política de Privacidade  /privacidade"),
    ...pageCard(
      "/privacidade",
      "Política LGPD — Transparência Legal",
      "Presença obrigatória. Conteúdo legal padrão.",
      "Adicionar uma introdução humana antes do texto legal. A privacidade na RCT é uma expressão de Ahimsa — não coletamos dados além do necessário.",
      "Adicionar parágrafo introdutório antes do texto legal: 'Na RCT, privacidade não é uma obrigação legal — é uma expressão de Ahimsa. Não coletamos o que não precisamos. Não compartilhamos o que nos foi confiado. O que você compartilha aqui, fica aqui.' Seguido do texto legal completo padrão.",
      "A estrutura legal completa (LGPD). O banner de consentimento. A integração com o formulário de diagnóstico."
    ),

    // ══ NOVO CONTEÚDO: JESUS O GRANDE YOGUE ══════════════════
    pb(),
    h1("Jesus o Grande Yogue — Nova Seção da Homepage"),
    hr(PURPLE),
    space(80),
    body("Esta seção deve ser inserida na homepage entre os 'Três Pilares' e o 'Blog'. É o coração do novo tom — o que torna a RCT única entre todas as plataformas espirituais e científicas existentes."),
    space(80),
    h3("Texto da Seção — Para o Desenvolvedor Front-End", PURPLE),
    space(60),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
      rows: [new TableRow({ children: [new TableCell({
        shading: { fill: "F8F6F0", type: ShadingType.CLEAR },
        margins: { top: 160, bottom: 160, left: 240, right: 240 },
        children: [
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 80 },
            children: [new TextRun({ text: "O GRANDE YOGUE", font: "Arial", size: 20, bold: true, color: ACCENT })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 80 },
            children: [new TextRun({ text: "Jesus: o Samadhi em Ação", font: "Arial", size: 30, bold: true, color: DEEP_BLUE })] }),
          new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { before: 60, after: 80 },
            children: [new TextRun({ text: "Aos 12 anos, enquanto seus pais o procuravam em pânico, Jesus estava no templo — sentado entre os doutores, ensinando e sendo ensinado — em estado de absorção total que os mestres orientais chamam de Dhyana. Não era curiosidade intelectual. Era o Samadhi de uma criança que havia herdado, por linhagem epigenética, séculos de refinamento cognitivo e espiritual.", font: "Arial", size: 21, color: "333333" })] }),
          new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { before: 60, after: 80 },
            children: [new TextRun({ text: "Yoga significa União — yuj, unir. 'Eu e o Pai somos um' (João 10:30) é a descrição mais direta do Samadhi já registrada no mundo ocidental. Jesus não falava de teologia. Ele descrevia um estado biológico e consciencial verificável — o mesmo que Patanjali codificou nos Yoga Sutras séculos antes.", font: "Arial", size: 21, color: "333333" })] }),
          new Paragraph({ alignment: AlignmentType.JUSTIFIED, spacing: { before: 60, after: 80 },
            children: [new TextRun({ text: "A diferença entre Jesus e os grandes yogues orientais não é de prática — é de contexto. Jesus não se retirou para o Himalaia. Ele trouxe o Samadhi para a praça pública, para a mesa dos pobres, para o leito dos enfermos. Era o Samadhi em ação — a Consciência Unificada operando no mundo.", font: "Arial", size: 21, color: "333333" })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 80, after: 60 },
            children: [new TextRun({ text: "A RCT existe para que essa tecnologia de União — que Jesus viveu e Patanjali nomeou — seja compreendida, praticada e propagada por quem já ressoa com ela.", font: "Arial", size: 21, bold: true, color: DEEP_BLUE })] }),
        ]
      })] })]
    }),
    space(120),

    // ══ CITAÇÕES PARALELAS PARA O BLOG ═══════════════════════
    pb(),
    h1("Citações Paralelas — Jesus e Patanjali"),
    h2("Para usar em artigos, cards e a seção de Citações Rotativas"),
    hr(ACCENT),
    space(80),
    body("Cada par de citações deve aparecer lado a lado — visualmente demonstrando que as duas tradições apontaram para a mesma frequência com linguagens diferentes."),
    space(100),

    ...[ 
      ["\"Eu e o Pai somos um.\"", "João 10:30",
       "\"Samadhi: o estado de união total com a Consciência Universal.\"", "Yoga Sutras 3.3",
       "O Samadhi é o estado que Jesus habitava permanentemente — a União que ele descreveu como identidade, não como experiência ocasional."],
      ["\"O reino de Deus está dentro de vós.\"", "Lucas 17:21",
       "\"O Ser que buscas está dentro de ti.\"", "Yoga Sutras 1.3",
       "Ambos apontam para o mesmo movimento: de fora para dentro. A iluminação não é alcançada — é revelada."],
      ["\"Bem-aventurados os puros de coração, pois eles verão a Deus.\"", "Mateus 5:8",
       "\"Pela pureza do coração, o yogue obtém a alegria suprema.\"", "Yoga Sutras 2.41",
       "Pureza = coerência. Coração puro = campo eletromagnético cardíaco em alta coerência, sem o ruído das emoções destrutivas."],
      ["\"A verdade vos libertará.\"", "João 8:32",
       "\"Satya (verdade) é o fundamento da prática — sem ele, nenhum progresso é real.\"", "Yoga Sutras 2.36",
       "A verdade como tecnologia de libertação neural: dissolve os padrões de medo e culpa que travam o sistema nervoso."],
      ["\"Seja feita a tua vontade... não como eu quero, mas como tu queres.\"", "Mateus 26:39",
       "\"Ishvara Pranidhana: rendição total à Consciência Universal.\"", "Yoga Sutras 2.45",
       "O Samadhi completo — a dissolução do ego individual na vontade maior. O ápice de ambas as tradições."],
      ["\"Amarás o teu próximo como a ti mesmo.\"", "Mateus 22:39",
       "\"Maitri (amor-bondade) por todos os seres — este é o caminho do yogue.\"", "Yoga Sutras 1.33",
       "Ahimsa como lei universal: não violência em nenhuma forma. O critério de pertencimento à rede RCT."],
    ].map(([j, jr, p, pr, sci]) => [
      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [4680, 4680],
        rows: [new TableRow({ children: [
          new TableCell({ width: { size: 4680, type: WidthType.DXA },
            shading: { fill: "EEF4FF", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 },
                children: [new TextRun({ text: "✝  JESUS", font: "Arial", size: 18, bold: true, color: DEEP_BLUE })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 },
                children: [new TextRun({ text: j, font: "Arial", size: 21, italics: true, color: "222222" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: jr, font: "Arial", size: 17, color: DARK_GOLD })] })
            ]
          }),
          new TableCell({ width: { size: 4680, type: WidthType.DXA },
            shading: { fill: "FDF8E0", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 40 },
                children: [new TextRun({ text: "☯  PATANJALI", font: "Arial", size: 18, bold: true, color: DARK_GOLD })] }),
              new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60, after: 60 },
                children: [new TextRun({ text: p, font: "Arial", size: 21, italics: true, color: "222222" })] }),
              new Paragraph({ alignment: AlignmentType.CENTER,
                children: [new TextRun({ text: pr, font: "Arial", size: 17, color: PURPLE })] })
            ]
          })
        ]})]
      }),
      new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [9360],
        rows: [new TableRow({ children: [new TableCell({
          shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 200, right: 200 },
          children: [new Paragraph({ children: [
            new TextRun({ text: "DECODIFICAÇÃO RCT:  ", font: "Arial", size: 18, bold: true, color: ACCENT }),
            new TextRun({ text: sci, font: "Arial", size: 18, italics: true, color: "DDDDDD" })
          ]})]
        })] })]
      }),
      new Paragraph({ spacing: { before: 120, after: 0 }, children: [new TextRun("")] })
    ]).flat(),

    // ══ PRÓXIMOS PASSOS ═══════════════════════════════════════
    pb(),
    h1("Próximos Passos de Implementação"),
    hr(ACCENT),
    space(80),
    body("Ordem de prioridade para adaptar o tom em todo o ecossistema:"),
    space(80),
    new Table({ width: { size: 9360, type: WidthType.DXA }, columnWidths: [800, 4000, 4560],
      rows: [
        new TableRow({ children: [
          new TableCell({ width: { size: 800, type: WidthType.DXA },
            shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: "PRIO", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          }),
          new TableCell({ width: { size: 4000, type: WidthType.DXA },
            shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "AÇÃO", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          }),
          new TableCell({ width: { size: 4560, type: WidthType.DXA },
            shading: { fill: DEEP_BLUE, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "IMPACTO", font: "Arial", size: 18, bold: true, color: "FFFFFF" })] })]
          })
        ]},
        ...[
          ["01", "Adicionar seção 'Jesus o Grande Yogue' na Homepage", "ALTO — primeira impressão do visitante"],
          ["02", "Implementar Citações Paralelas (Jesus + Patanjali) em toda a plataforma", "ALTO — identidade visual do novo tom"],
          ["03", "Aplicar o Glossário de Substituição de Tom em todos os textos existentes", "ALTO — consistência da voz"],
          ["04", "Reestruturar o Manifesto com a nova ordem (luz antes do problema)", "MÉDIO — impacta os que chegam pelo manifesto"],
          ["05", "Renomear páginas e CTAs (Despertar, Alinhamento, Frequência)", "MÉDIO — UX e consistência"],
          ["06", "Criar categoria 'Jesus o Grande Yogue' no Blog com Artigo 02", "MÉDIO — SEO e autoridade"],
          ["07", "Redesenhar a página /rede com mapa-mundi dos nós", "BAIXO — só relevante quando houver membros suficientes"],
          ["08", "Adaptar emails e notificações Telegram com o novo tom", "BAIXO — detalhe de experiência"],
        ].map(([p, a, i], idx) => new TableRow({ children: [
          new TableCell({ width: { size: 800, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F5F0E0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ alignment: AlignmentType.CENTER,
              children: [new TextRun({ text: p, font: "Arial", size: 19, bold: true, color: DARK_GOLD })] })]
          }),
          new TableCell({ width: { size: 4000, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F5F0E0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: a, font: "Arial", size: 18, color: "222222" })] })]
          }),
          new TableCell({ width: { size: 4560, type: WidthType.DXA },
            shading: { fill: idx % 2 === 0 ? "F5F0E0" : "FFFFFF", type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 80 },
            children: [new Paragraph({ children: [new TextRun({ text: i, font: "Arial", size: 18, italics: true, color: "555555" })] })]
          })
        ]})
      ]
    }),
    space(200),
    hr(ACCENT),
    space(80),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "—  R C T  —", font: "Arial", size: 28, bold: true, color: DEEP_BLUE })] }),
    space(60),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "\"Yoga significa União. Jesus vivia essa União.\"", font: "Arial", size: 20, italics: true, color: "666666" })] }),
    space(80),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Próxima produção: Artigo 02 — Jesus aos 12 anos no Templo: Dharana, Dhyana e o Samadhi de uma criança", font: "Arial", size: 18, color: DARK_GOLD, bold: true })] }),

  ]}]
});

const path = require("path");

Packer.toBuffer(doc).then((buffer) => {
  const out =
    process.env.ANALISE_OUTPUT ||
    path.join(process.cwd(), "RCT_Analise_Plataforma_Jesus_Grande_Yogue.docx");
  fs.writeFileSync(out, buffer);
  console.log("Análise completa gerada:", out);
});
