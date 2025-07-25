@echo off
echo 🔄 Sincronizando branches...

echo 📋 Mudando para branch main...
git checkout main

echo ⬇️ Atualizando main...
git pull origin main

echo 🔄 Atualizando adislan-dev...
git checkout adislan-dev
git reset --hard main
git push origin adislan-dev --force

echo 📝 Criando branch notebook...
git checkout -b notebook

echo ✅ Mudando para branch notebook...
git checkout notebook

echo 🎉 Todas as branches estão sincronizadas!
echo 📍 Branch atual: notebook

pause 