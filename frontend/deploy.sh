#!/bin/bash

# 🚀 Script de Deploy - SapiensBi Frontend
# Este script automatiza o processo de deploy no Vercel

echo "🚀 Iniciando deploy do SapiensBi Frontend..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_message() {
    echo -e "${GREEN}$1${NC}"
}

print_warning() {
    echo -e "${YELLOW}$1${NC}"
}

print_error() {
    echo -e "${RED}$1${NC}"
}

print_info() {
    echo -e "${BLUE}$1${NC}"
}

# Verificar se estamos no diretório correto
if [ ! -f "package.json" ]; then
    print_error "❌ Erro: Execute este script dentro da pasta frontend/"
    exit 1
fi

# Passo 1: Verificar se o build funciona
print_info "📦 Verificando se o build funciona..."
if npm run build; then
    print_message "✅ Build realizado com sucesso!"
else
    print_error "❌ Erro no build. Corrija os problemas antes de continuar."
    exit 1
fi

# Passo 2: Verificar se o git está inicializado
if [ ! -d ".git" ]; then
    print_info "🔧 Inicializando repositório Git..."
    git init
    print_message "✅ Git inicializado!"
fi

# Passo 3: Adicionar arquivos
print_info "📁 Adicionando arquivos ao Git..."
git add .

# Passo 4: Fazer commit
print_info "💾 Fazendo commit..."
git commit -m "Deploy: SapiensBi Frontend - $(date)"

# Passo 5: Verificar se o remote está configurado
if ! git remote get-url origin > /dev/null 2>&1; then
    print_warning "⚠️  Remote 'origin' não configurado."
    echo "Por favor, configure o remote do GitHub:"
    echo "git remote add origin https://github.com/SEU_USUARIO/sapiensbi-frontend.git"
    echo ""
    print_info "Depois execute: git push -u origin main"
else
    # Passo 6: Fazer push
    print_info "🚀 Fazendo push para o GitHub..."
    if git push origin main; then
        print_message "✅ Push realizado com sucesso!"
    else
        print_error "❌ Erro no push. Verifique se o remote está configurado corretamente."
        exit 1
    fi
fi

print_message "🎉 Deploy preparado com sucesso!"
echo ""
print_info "📋 Próximos passos:"
echo "1. Acesse https://vercel.com"
echo "2. Faça login com GitHub"
echo "3. Clique em 'New Project'"
echo "4. Importe o repositório sapiensbi-frontend"
echo "5. Configure as variáveis de ambiente"
echo "6. Clique em 'Deploy'"
echo ""
print_info "📚 Consulte o GUIA_DEPLOY_VERCEL.md para instruções detalhadas"
echo ""
print_message "🚀 Sua aplicação estará online em alguns minutos!" 