# Repositório — rct-plataforma

Repositório oficial: **https://github.com/TiagoIA-UX/rct-plataforma**

O motor de produção foi herdado do `blog-terapia-elisa-rietjens` (Groq, Neon, Mercado Pago, scripts).
A identidade, lógica RCT e fases de treinamento são novas.

## Publicar

```bash
git add -A
git commit -m "feat: RCT v0.2.0 — evangelização pública e treinamento por fases"
git push -u origin main
git tag -a v0.2.0 -m "v0.2.0"
git push origin --tags
```

## Variáveis mínimas

`DATABASE_URL`, `GROQ_API_KEY`, `ADMIN_PASSWORD`, `CRON_SECRET`, `NEXT_PUBLIC_SITE_URL`
