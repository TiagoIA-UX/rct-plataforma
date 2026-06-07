# Política de Versionamento — Semver RCT

Este projeto segue [Semantic Versioning 2.0.0](https://semver.org/lang/pt-BR/).

## Formato: `MAJOR.MINOR.PATCH`

| Incremento | Quando usar | Exemplos RCT |
|------------|-------------|--------------|
| **MAJOR** | Mudança incompatível na API, schema Prisma breaking, alteração dos pilares ou algoritmo de ressonância | Refatorar `DiagnosticoData`, mudar critério eliminatório de Ahimsa |
| **MINOR** | Nova funcionalidade compatível com versões anteriores | Área `/rede`, integração Mercado Pago, módulo de treinamento Fase II |
| **PATCH** | Correção de bug, ajuste visual, melhoria de copy sem mudar contratos | Fix no wizard, correção de score, header de segurança |

## Pré-1.0.0 (`0.x.y`)

Enquanto `MAJOR = 0`, a API e o schema podem evoluir com mais liberdade.
Trate `MINOR` como features e `PATCH` como correções.

**Versão atual:** `0.1.1` — Gênesis + transplante de motor do blog-terapia.

Arquivos de versão sincronizados: `package.json`, `VERSION`, `CHANGELOG.md`.

## Onde a versão aparece

- `package.json` → `version`
- `CHANGELOG.md` → histórico por release
- Git tags → `v0.1.0`, `v0.2.0`, etc.

## Fluxo de release

```bash
# 1. Atualize CHANGELOG.md e package.json
# 2. Commit
git commit -m "chore(release): v0.2.0"

# 3. Tag anotada
git tag -a v0.2.0 -m "v0.2.0 — descrição da release"

# 4. Push com tags
git push origin main --tags
```

## Convenção de commits (recomendada)

```
feat:     nova funcionalidade (MINOR)
fix:      correção de bug (PATCH)
feat!:    breaking change (MAJOR)
chore:    manutenção, deps, CI
docs:     documentação
```

## Critério para `1.0.0`

A plataforma atinge `1.0.0` quando **todos** estiverem estáveis em produção:

- [ ] Diagnóstico + score + persistência Neon
- [ ] Telegram Bot com convites reais
- [ ] Blog com cron Groq
- [ ] Área de contribuições moderada
- [ ] Auth de membros (Neon Auth / Google)
- [ ] Variáveis de ambiente documentadas e preenchidas na Vercel
