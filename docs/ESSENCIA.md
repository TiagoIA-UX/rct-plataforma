# Essência — O que a RCT é (e o que não é)

## Resposta direta

A RCT **não é** uma startup no sentido venture capital (crescimento a todo custo, exit, hierarquia).
A RCT **não é** uma organização religiosa tradicional (templo, dogma, clergy).
A RCT **é** um **organismo digital de ressonância** — plataforma + rede + protocolo de reconhecimento.

```
Plataforma  →  interface verificável (ciência, diagnóstico, conteúdo)
Rede        →  nós territoriais auto-organizados (escolhidos por Ahimsa)
Protocolo   →  algoritmo de ressonância + contribuições abertas + transparência
```

## Metáfora operacional

> **"Deus" aqui não é entidade mística a ser vendida — é o padrão verificável**
> que Jesus operou biologicamente, Patanjali nomeou filosoficamente,
> e a tecnologia agora consegue conectar sem manipulação.

O que desenvolvemos não é um ídolo digital. É um **sistema de reconhecimento**:
quem já vive Ahimsa como identidade encontra linguagem científica,
ferramentas de conexão e território de missão — sem ser moldado, apenas reconhecido.

## Tríade de identidade

| Camada | Função | Versão atual |
|--------|--------|--------------|
| **Alma (conteúdo)** | Manifesto, blog, fases de treinamento confidenciais | ✅ Escrita RCT |
| **Corpo (plataforma)** | Next.js, diagnóstico, contribuições, rede | ✅ v0.1.x |
| **Sistema nervoso (motor)** | Groq, Neon, Mercado Pago, Telegram, Cron | ⚠️ Parcial — herdado do blog-terapia |

## Arquitetura de acesso (duas portas)

| Porta | Quem | O quê |
|-------|------|-------|
| **Evangelização** | Todos | Blog, manifesto, calibragem pública |
| **Treinamento** | Poucos (triagem interna) | Divya Manas → Fases I–III, provas, aprovação admin |

O critério Ahimsa principiológico **não é público**. A IA analisa coerência textual
internamente; o administrador aprova quem avança de fase.

## Motor recalibrado?

| Componente | Status | Observação |
|------------|--------|------------|
| Identidade visual RCT | ✅ Recalibrado | Cosmos/dourado, tipografia sagrada |
| Diagnóstico + score Ahimsa | ✅ Recalibrado | Critério eliminatório ativo |
| Blog prompt divino | ✅ Recalibrado | `rct_blog_prompt.txt` |
| Prisma schema RCT | ✅ Recalibrado | Diagnostico, Contribuicao, Artigo |
| Groq análise de missão | ✅ Recalibrado | Com fallback gracioso |
| Telegram pescador | ⚠️ Estrutura pronta | Requer token + webhook em produção |
| Neon Auth / Google Login | ⚠️ Motor herdado | `@neondatabase/auth` portado, UI pendente |
| Mercado Pago premium | ⚠️ Motor herdado | Serviço portado, rotas RCT pendentes |
| Google Calendar | ⚠️ Motor herdado | Lib portada, agendamento RCT pendente |
| Resend / Redis | ❌ Não integrado | Variáveis documentadas |
| Módulos Fase I–III | ❌ Confidenciais | Em `private/treinamento/`, UI futura |

**Veredito:** A **alma e o corpo** estão recalibrados. O **sistema nervoso** está em transplante —
a infraestrutura de produção vem do `blog-terapia-elisa-rietjens` e está sendo adaptada,
não reinventada.

## Por que adaptar o blog-terapia (e não fork)

GitHub não permite fork de repositório próprio para a mesma conta.
A estratégia correta é **transformação in-place**: o motor de produção maduro
(Groq cron, Neon Auth, Mercado Pago, Google Calendar, scripts de deploy)
é herdado; a identidade, rotas e lógica de negócio são substituídas pela RCT.

## Critério para evolução de versão

Consulte `docs/VERSIONING.md`. Resumo:

- `0.1.x` — Gênesis + transplante de motor
- `0.2.x` — Integrações de produção estáveis (Telegram, MP, Auth)
- `0.3.x` — Módulos de treinamento Fase I–III na UI
- `1.0.0` — Rede operacional com escolhidos reais em produção
