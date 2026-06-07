# Propriedade intelectual — RCT Plataforma

**Titular:** Tiago Aureliano da Rocha

## Não versionar

- `private/` e **todo** seu conteúdo:
  - `private/scripts/` — inicialização, geração de posts, validação de ambiente
  - `private/lib/` — motores operacionais (blog, provas, triagem, tópicos)
  - `private/prompts/` — prompts divinos e templates de IA
  - `private/treinamento/*.docx` — materiais de fases
- `scripts/` e `prompts/` na raiz (legado — usar apenas `private/`)
- `.env`, `.env.local`, `*.bak_*`
- `CURSOR_PROMPT*.md`, `*_PROMPT*.md`
- Materiais `RCT_Fase*_*.docx` e `RCT_*_Confidencial.docx`

O repositório público/privado no GitHub contém apenas **stubs** em `src/lib/` que carregam os módulos reais de `private/lib/*.mjs` em runtime local.

Copie `.env.example` → `.env.local` e mantenha `private/` apenas na máquina de desenvolvimento.

**Inicialização:** `npm run init` ou `.\private\scripts\init-sistema.ps1` (Windows).
