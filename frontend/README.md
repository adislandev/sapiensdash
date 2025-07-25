# 🚀 SapiensBi Frontend

Frontend React com autenticação Firebase para o dashboard SapiensBi.

## 🎯 **Funcionalidades**

- ✅ **Autenticação Firebase** (Google + Email/Senha)
- ✅ **Sistema de Roles** (Admin/Usuário)
- ✅ **Interface Responsiva** com Tailwind CSS
- ✅ **Design Moderno** com animações e gradientes
- ✅ **Proteção de Rotas** automática
- ✅ **Navegação Lateral** moderna
- ✅ **Dashboard** com cards informativos
- ✅ **Integração com API** Django

## 🎨 **Design Features**

- 🌈 **Gradientes Animados** - Backgrounds com efeitos visuais
- ✨ **Animações Suaves** - Transições e micro-interações
- 📱 **Responsivo** - Otimizado para desktop, tablet e mobile
- 🎭 **Tema Escuro** - Interface moderna com cores escuras
- 🔮 **Efeitos Visuais** - Blur, glow e partículas animadas
- 🎯 **UX Moderna** - Foco em experiência do usuário

## 🛠️ **Tecnologias**

- **React 18** com TypeScript
- **Firebase Authentication**
- **Tailwind CSS** para estilização
- **React Router** para navegação
- **Vercel** para deploy

## 📦 **Instalação Local**

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm start

# Gerar build de produção
npm run build

# Executar testes
npm test
```

## 🌐 **Deploy no Vercel**

### **Passo 1: Preparar o Repositório**

1. **Criar repositório no GitHub**
2. **Fazer push do código**
3. **Verificar se o build funciona localmente**

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

## 🔧 **Configuração do Firebase**

### **1. Configurar Domínios Autorizados**

No Firebase Console:
1. Vá para **Authentication** → **Settings**
2. Adicione seu domínio Vercel aos **Authorized domains**
3. Exemplo: `sapiensbi.vercel.app`

### **2. Verificar Configuração**

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

## 📁 **Estrutura do Projeto**

```
frontend/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   ├── contexts/           # Contextos React
│   ├── firebase/           # Configuração Firebase
│   ├── pages/              # Páginas da aplicação
│   ├── services/           # Serviços de API
│   ├── types/              # Tipos TypeScript
│   ├── App.tsx             # Componente principal
│   ├── index.tsx           # Ponto de entrada
│   └── index.css           # Estilos globais
├── public/                 # Arquivos públicos
├── package.json            # Dependências
├── vercel.json             # Configuração Vercel
└── README.md               # Este arquivo
```

## 🎨 **Design System**

### **Cores Principais**
- **Azul**: `from-blue-900 via-blue-800 to-blue-900`
- **Verde**: `from-emerald-900 via-teal-800 to-green-900`
- **Cinza**: `bg-gray-900/50` (cards e elementos)

### **Animações**
- **Fade In**: `opacity-0` → `opacity-100`
- **Slide**: `translate-x-8` → `translate-x-0`
- **Pulse**: `animate-pulse` para elementos de fundo
- **Bounce**: `animate-bounce` para partículas

### **Efeitos Visuais**
- **Blur**: `blur-3xl` para elementos de fundo
- **Glow**: Gradientes com opacidade
- **Backdrop**: `backdrop-blur-xl` para cards

## 🚨 **Solução de Problemas**

### **Erro de Build**
```bash
# Limpar cache
npm run build -- --reset-cache
```

### **Erro de Firebase**
- Verifique se o domínio está autorizado
- Confirme as credenciais no `config.ts`

### **Erro de API**
- Configure a URL da API no Vercel
- Verifique se o backend está rodando

### **Problemas de Design**
- Verifique se o Tailwind CSS está configurado
- Confirme se as classes estão aplicadas corretamente

## 📚 **Documentação**

- [React Documentation](https://reactjs.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT.

---

**Desenvolvido com ❤️ para SapiensBi** 