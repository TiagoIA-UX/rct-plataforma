# Contribuindo — Evangelho Digital

## Princípio

Toda contribuição deve passar na pergunta de validação do projeto:

> Esta funcionalidade ajuda o usuário a se tornar uma pessoa melhor, mais consciente, mais responsável e mais capaz de contribuir positivamente para sua família, comunidade e sociedade?

## Ambiente local

```powershell
.\scripts\setup.ps1
.\scripts\start-local.ps1
```

## Conteúdo editorial

Conteúdo gerado por IA **deve** passar pelo pipeline em `services/agents/`. Não publique texto de um único modelo sem auditoria.

## Branches

- `main` — estável
- `develop` — integração
- `feature/*` — novas funcionalidades

## Commits

Mensagens em português ou inglês, no imperativo: `feat:`, `fix:`, `docs:`, `chore:`.
