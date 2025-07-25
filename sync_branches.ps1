# Script para sincronizar branches
Write-Host "🔄 Sincronizando branches..." -ForegroundColor Green

# Mudar para main
Write-Host "📋 Mudando para branch main..." -ForegroundColor Yellow
git checkout main

# Atualizar main
Write-Host "⬇️ Atualizando main..." -ForegroundColor Yellow
git pull origin main

# Atualizar adislan-dev para ficar igual à main
Write-Host "🔄 Atualizando adislan-dev..." -ForegroundColor Yellow
git checkout adislan-dev
git reset --hard main
git push origin adislan-dev --force

# Criar branch notebook
Write-Host "📝 Criando branch notebook..." -ForegroundColor Yellow
git checkout -b notebook

# Mudar para notebook
Write-Host "✅ Mudando para branch notebook..." -ForegroundColor Green
git checkout notebook

Write-Host "🎉 Todas as branches estão sincronizadas!" -ForegroundColor Green
Write-Host "📍 Branch atual: notebook" -ForegroundColor Cyan 