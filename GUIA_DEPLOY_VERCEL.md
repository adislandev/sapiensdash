# 🚀 Guia Completo - Deploy SapiensBi no Vercel

## 📋 **Pré-requisitos**

- ✅ Conta no GitHub
- ✅ Conta no Vercel
- ✅ Projeto React funcionando localmente
- ✅ Firebase configurado

## 🎯 **Status Atual**

- ✅ **Frontend React** implementado
- ✅ **Firebase** configurado
- ✅ **Build** testado e funcionando
- ✅ **Arquivos de deploy** criados
- ⏳ **Deploy no Vercel** (próximo passo)

## 📁 **Estrutura Preparada**

```
sapiensdash/
├── frontend/                    # ✅ Pasta do frontend
│   ├── src/                     # ✅ Código fonte
│   ├── public/                  # ✅ Arquivos públicos
│   ├── package.json             # ✅ Dependências
│   ├── vercel.json              # ✅ Configuração Vercel
│   ├── .gitignore               # ✅ Arquivos ignorados
│   └── README.md                # ✅ Documentação
├── backend/                     # ⚠️ Backend (separado)
└── README.md                    # ✅ Documentação geral
```

## 🚀 **Passo a Passo - Deploy no Vercel**

### **Passo 1: Preparar Repositório GitHub**

1. **Criar repositório no GitHub**
   ```bash
   # Nome sugerido: sapiensbi-frontend
   # Descrição: Frontend React do SapiensBi Dashboard
   # Público ou Privado (sua escolha)
   ```

2. **Fazer push do código**
   ```bash
   cd frontend
   git init
   git add .
   git commit -m "Initial commit - SapiensBi Frontend"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/sapiensbi-frontend.git
   git push -u origin main
   ```

### **Passo 2: Configurar Vercel**

1. **Acesse [vercel.com](https://vercel.com)**
2. **Faça login com GitHub**
3. **Clique em "New Project"**
4. **Importe o repositório** `sapiensbi-frontend`
5. **Configure o projeto:**
   - **Framework Preset:** Create React App
   - **Root Directory:** `./` (padrão)
   - **Build Command:** `npm run build` (padrão)
   - **Output Directory:** `build` (padrão)
   - **Install Command:** `npm install` (padrão)

### **Passo 3: Configurar Variáveis de Ambiente**

No Vercel, vá em **Settings** → **Environment Variables**:

```env
# Nome: REACT_APP_API_URL
# Value: https://seu-backend-django.vercel.app/api
# Environment: Production, Preview, Development
```

### **Passo 4: Configurar Firebase**

1. **Acesse [Firebase Console](https://console.firebase.google.com/)**
2. **Vá para seu projeto** `sapiensdash`
3. **Authentication** → **Settings** → **Authorized domains**
4. **Adicione o domínio Vercel:**
   - `sapiensbi.vercel.app` (ou o domínio gerado)
   - `sapiensbi-git-main-seu-usuario.vercel.app`

### **Passo 5: Deploy**

1. **Clique em "Deploy"**
2. **Aguarde o build** (2-3 minutos)
3. **Verifique se não há erros**
4. **Acesse a URL gerada**

## 🔧 **Configurações Específicas**

### **Configuração do Vercel (vercel.json)**

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/static/(.*)",
      "dest": "/static/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **Configuração do Firebase**

O Firebase já está configurado no arquivo `src/firebase/config.ts`:

```typescript
const firebaseConfig = {
  apiKey: "AIzaSyADSW4jCv1LrL8kXt__EM9oD2Ur7JLGEUA",
  authDomain: "sapiensdash.firebaseapp.com",
  projectId: "sapiensdash",
  storageBucket: "sapiensdash.firebasestorage.app",
  messagingSenderId: "74024978856",
  appId: "1:74024978856:web:31a81ee682972f0117759d",
  measurementId: "G-FWCWFVSJBR"
};
```

## 🧪 **Testes Pós-Deploy**

### **1. Teste de Acesso**
- ✅ Acesse a URL do Vercel
- ✅ Verifique se carrega a página de login
- ✅ Teste o login com Google

### **2. Teste de Autenticação**
- ✅ Faça login com Google
- ✅ Verifique se redireciona para dashboard
- ✅ Teste a navegação lateral

### **3. Teste de Responsividade**
- ✅ Teste em desktop
- ✅ Teste em mobile
- ✅ Verifique menu lateral

### **4. Teste de API** (se backend configurado)
- ✅ Clique em "Testar Conexão com API"
- ✅ Verifique se recebe resposta

## 🚨 **Solução de Problemas**

### **Erro: "Build Failed"**
```bash
# Verificar logs no Vercel
# Possíveis causas:
# - Dependências faltando
# - Erro de TypeScript
# - Variáveis de ambiente não configuradas
```

### **Erro: "Firebase: Error (auth/unauthorized-domain)"**
1. Vá para Firebase Console
2. Authentication → Settings → Authorized domains
3. Adicione o domínio Vercel

### **Erro: "Page Not Found"**
1. Verifique se o `vercel.json` está correto
2. Confirme se as rotas estão configuradas
3. Teste localmente com `npm run build`

### **Erro: "API Connection Failed"**
1. Configure a variável `REACT_APP_API_URL` no Vercel
2. Verifique se o backend está rodando
3. Teste a URL da API diretamente

## 📊 **Monitoramento**

### **Vercel Analytics**
- Acesse o dashboard do Vercel
- Monitore performance
- Verifique logs de erro

### **Firebase Analytics**
- Configure no Firebase Console
- Monitore uso da aplicação
- Acompanhe métricas de usuário

## 🔄 **Deploy Automático**

O Vercel faz deploy automático quando:
- ✅ Push para branch `main`
- ✅ Pull Request mergeado
- ✅ Deploy manual

## 📱 **Domínio Personalizado** (Opcional)

1. **No Vercel:**
   - Settings → Domains
   - Add Domain
   - Configure DNS

2. **Exemplo:**
   - `sapiensbi.com`
   - `app.sapiensbi.com`
   - `dashboard.sapiensbi.com`

## 🎉 **Resultado Final**

Após o deploy, você terá:
- ✅ **URL pública** da aplicação
- ✅ **Deploy automático** configurado
- ✅ **Firebase** funcionando
- ✅ **Interface responsiva** online
- ✅ **Sistema de autenticação** ativo

## 📞 **Suporte**

Se encontrar problemas:
1. Verifique os logs no Vercel
2. Teste localmente primeiro
3. Consulte a documentação
4. Entre em contato se necessário

---

**🎯 Próximo passo: Deploy do Backend Django (opcional)**

O frontend está pronto para produção! Agora você pode:
1. Fazer o deploy do backend Django
2. Configurar a integração completa
3. Personalizar a interface
4. Adicionar novas funcionalidades

**🚀 Sua aplicação estará online e funcionando!** 