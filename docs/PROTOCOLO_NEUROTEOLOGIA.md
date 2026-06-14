# Protocolo de Aceitação Geral — Eixo Neuroteologia (Salvaguarda 0.8)

> RCT = Ressonância Científica Tecnológica · Protocolo Mestre Divino v2.0

## Princípio

Todo conteúdo da RCT mostra **o Caminho do aperfeiçoamento pela meditação e atenção plena
com comprovação científica**, sempre:

1. **Referenciado biblicamente** — versículo concreto (livro capítulo:versículo).
2. **Referenciado cientificamente** — autor/ano, rótulo `[ESTABELECIDA]` ou `[HIPÓTESE]`.
3. **Ancorado na tradição contemplativa cristã** — oração contemplativa, lectio divina,
   oração do coração, respiração unida à oração, guarda do coração.

Esse tripé (Bíblia + ciência + prática contemplativa) é a **Neuroteologia** da plataforma:
a base para escrever, artigo a artigo, uma "bíblia neuroteológica científica e tecnológica".

## Regras de aceitação (por que assim)

O público-alvo cristão/católico **acolhe** a meditação quando está a serviço da oração e da
relação com Deus, e **rejeita o sincretismo**. Fundamento: Carta da Congregação para a
Doutrina da Fé *Sobre alguns aspectos da meditação cristã* (1989) e *Jesus Cristo, Portador
da Água da Vida* (2003).

Portanto:

- ✅ Meditação / atenção plena / respiração com comprovação científica = **caminho central**.
- ✅ Tradição contemplativa cristã = **linguagem primária**.
- ⚠️ Yoga e tradições orientais = **apenas comparação rotulada** ("Para comparação — tradição X").
- ❌ **Proibido** descrever Jesus como yogue/Samadhi/Dharana/Dhyana.
- ❌ Proibido superioridade por origem/linhagem (Salvaguarda 0.1) e fake science (Satya).

## Implementação no código

| Item | Local |
|------|-------|
| Princípio (constante) | `PRINCIPIO_NEUROTEOLOGIA` em `src/lib/salvaguardas.ts` |
| Bloqueio Jesus-yogue | `descreveJesusComoYogue()` em `src/lib/salvaguardas.ts` |
| Validação na publicação | `validarArtigoAntesPublicar()` em `src/lib/artigo-template.ts` |
| Orientação aos agentes | `src/lib/prompts/agents/agente-03-redator-paulo.txt`, `estrutura-artigo-paulo.txt` |
| Regra sempre-aplicada | `.cursor/rules/protocolo-mestre.mdc` (Salvaguarda 0.8) |

## Estrutura obrigatória do artigo (padrão Paulo)

1. Dados concretos da fonte bíblica (versículos + números).
2. Indícios + hipóteses com rótulo científico.
3. O que a ciência diz sobre corpo/mente.
4. O que o tema **NÃO** sustenta (descartar teorias fracas).
5. Síntese RCT (fé cristã primária).
6. **Prática — o Caminho da meditação/atenção com comprovação** + encaminhamento profissional.
7. Bloco final: bênção, maldição, base científica, salvaguarda, pergunta para refletir.
