# RCT — inicia o ambiente de desenvolvimento local
# Uso: .\INICIAR.ps1

$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "  RCT — Religiao Cientifica Tecnologica" -ForegroundColor DarkYellow
Write-Host "  Iniciando ambiente local..." -ForegroundColor Gray
Write-Host ""

# Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js nao encontrado. Instale Node 20+ em https://nodejs.org" -ForegroundColor Red
    exit 1
}

$nodeVersion = node -v
Write-Host "  Node: $nodeVersion" -ForegroundColor DarkGray

# .env.local
if (-not (Test-Path ".env.local")) {
    Write-Host ""
    Write-Host "  Aviso: .env.local nao encontrado." -ForegroundColor Yellow
    Write-Host "  Copie .env.example (se existir) ou configure as variaveis antes do deploy." -ForegroundColor Yellow
    Write-Host ""
}

# Dependencias
if (-not (Test-Path "node_modules")) {
    Write-Host "  Instalando dependencias (npm install)..." -ForegroundColor Cyan
    npm install
    if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }
}

# Prisma Client
Write-Host "  Gerando Prisma Client..." -ForegroundColor DarkGray
npm run db:generate 2>$null
if ($LASTEXITCODE -ne 0) {
    npx prisma generate
}

Write-Host ""
Write-Host "  Servidor: http://localhost:3000" -ForegroundColor Green
Write-Host "  Pressione Ctrl+C para parar." -ForegroundColor Gray
Write-Host ""

npm run dev
