# 🔧 Solução para Restrições da Pull Request

## 🚨 **Problemas Identificados**

### **1. Review Required**
- ❌ "At least 1 approving review is required"
- ❌ "New changes require approval from someone other than the last pusher"

### **2. Commits Must Have Verified Signatures**
- ❌ "Commits must have verified signatures"

## 🔧 **Soluções**

### **Opção 1: Configurar GPG Signing (Recomendado)**

#### **Passo 1: Gerar Chave GPG**
```bash
# Gerar nova chave GPG
gpg --full-generate-key

# Escolher opções:
# 1. RSA and RSA (default)
# 2. 4096 bits
# 3. 0 (não expira)
# 4. Nome: Seu Nome
# 5. Email: seu-email@exemplo.com
# 6. Comentário: GitHub Signing
# 7. O (OK)
# 8. Senha: (deixe em branco para facilitar)
```

#### **Passo 2: Configurar Git com GPG**
```bash
# Listar chaves GPG
gpg --list-secret-keys --keyid-format LONG

# Copiar o ID da chave (ex: 3AA5C34371567BD2)
# Configurar Git para usar a chave
git config --global user.signingkey 3AA5C34371567BD2

# Habilitar signing automático
git config --global commit.gpgsign true

# Configurar GPG agent
git config --global gpg.program gpg
```

#### **Passo 3: Adicionar Chave ao GitHub**
```bash
# Exportar chave pública
gpg --armor --export 3AA5C34371567BD2

# Copiar a saída (incluindo BEGIN e END)
```

1. Acesse: https://github.com/settings/keys
2. Clique em **"New GPG key"**
3. Cole a chave pública
4. Clique em **"Add GPG key"**

#### **Passo 4: Re-fazer Commits com Signing**
```bash
# Fazer amend nos commits para assiná-los
git commit --amend --no-edit -S

# Forçar push (cuidado!)
git push origin deploy-sapiensbi-enem --force
```

### **Opção 2: Desabilitar Proteções Temporariamente**

#### **Via GitHub Web Interface**
1. Acesse: https://github.com/adislandev/sapiensdash/settings/branches
2. Clique em **"main"** nas branch protection rules
3. **Desmarque** temporariamente:
   - "Require a pull request before merging"
   - "Require signed commits"
4. Clique em **"Save changes"**
5. Fazer merge da PR
6. **Re-habilitar** as proteções

### **Opção 3: Merge Direto via Command Line**

#### **Se você tem permissões de admin**
```bash
# Voltar para main
git checkout main

# Fazer merge da branch
git merge deploy-sapiensbi-enem

# Push para main
git push origin main
```

## 🎯 **Solução Rápida (Recomendada)**

### **Passo 1: Desabilitar Proteções Temporariamente**
1. Acesse: https://github.com/adislandev/sapiensdash/settings/branches
2. Clique em **"main"**
3. **Desmarque**:
   - ✅ "Require a pull request before merging"
   - ✅ "Require signed commits"
4. **Salve** as alterações

### **Passo 2: Fazer Merge**
1. Volte para a Pull Request
2. Clique em **"Merge pull request"**
3. Confirme o merge

### **Passo 3: Re-habilitar Proteções**
1. Volte para as configurações da branch
2. **Marque** novamente:
   - ✅ "Require a pull request before merging"
   - ✅ "Require signed commits"
3. **Salve** as alterações

## 🔄 **Após o Merge**

```bash
# Voltar para main
git checkout main

# Atualizar main
git pull origin main

# Verificar status
git log --oneline -3

# Deletar branch (opcional)
git branch -d deploy-sapiensbi-enem
git push origin --delete deploy-sapiensbi-enem
```

## 🎉 **Resultado Esperado**

Após resolver as restrições:
- ✅ **Pull Request** aprovada e mergeada
- ✅ **Branch main** atualizada com o código completo
- ✅ **Sistema SapiensBi ENEM** disponível na main
- ✅ **Deploy no Vercel** pode ser feito da branch main

---

**🔧 Escolha a opção que melhor se adequa ao seu caso e execute os passos!** 