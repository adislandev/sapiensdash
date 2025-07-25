# 🚀 Guia de Instalação - SapiensdjangoBi Frontend

## Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn
- Conta no Firebase Console
- Projeto Django configurado (opcional para testes)

## 📋 Passos de Instalação

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Firebase

1. **Acesse o [Firebase Console](https://console.firebase.google.com/)**
2. **Crie um novo projeto** ou use um existente
3. **Ative o Authentication:**
   - Vá para "Authentication" no menu lateral
   - Clique em "Get started"
   - Em "Sign-in method", habilite "Google"
   - Configure o domínio autorizado (localhost:3000 para desenvolvimento)

4. **Obtenha as credenciais:**
   - Vá para "Project settings" (ícone de engrenagem)
   - Role até "Your apps"
   - Clique em "Add app" e escolha "Web"
   - Copie as credenciais

5. **Atualize o arquivo `src/firebase/config.ts`:**

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key-real",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 4. Executar o Projeto

```bash
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 🔧 Configuração do Backend Django (Opcional)

### 1. Instalar Firebase Admin SDK

```bash
pip install firebase-admin
```

### 2. Baixar Credenciais do Serviço

1. No Firebase Console, vá para "Project settings"
2. Aba "Service accounts"
3. Clique em "Generate new private key"
4. Salve o arquivo JSON no seu projeto Django

### 3. Implementar Validação de Token

Use o arquivo `django_backend_example.py` como referência para implementar a validação de token no seu backend Django.

## 🧪 Testando a Aplicação

### 1. Teste de Login

1. Acesse `http://localhost:3000`
2. Você será redirecionado para `/login`
3. Clique em "Entrar com Google"
4. Faça login com sua conta Google
5. Você será redirecionado para `/dashboard`

### 2. Teste de API (se backend configurado)

1. No dashboard, clique em "Buscar Dados do Usuário"
2. Verifique se a resposta da API é exibida
3. Confirme que o token está sendo enviado corretamente

### 3. Teste de Proteção de Rotas

1. Faça logout
2. Tente acessar `/dashboard` diretamente
3. Você deve ser redirecionado para `/login`

## 🔍 Verificações Importantes

### ✅ Firebase Configurado Corretamente

- [ ] Projeto criado no Firebase Console
- [ ] Authentication habilitado com Google
- [ ] Credenciais atualizadas no `config.ts`
- [ ] Domínio localhost:3000 autorizado

### ✅ Frontend Funcionando

- [ ] `npm start` executa sem erros
- [ ] Página de login carrega
- [ ] Login com Google funciona
- [ ] Redirecionamento para dashboard funciona
- [ ] Logout funciona

### ✅ Backend Integrado (se aplicável)

- [ ] Firebase Admin SDK instalado
- [ ] Endpoint `/api/user-data/` implementado
- [ ] Validação de token funcionando
- [ ] CORS configurado corretamente

## 🚨 Solução de Problemas

### Erro: "Firebase: Error (auth/popup-closed-by-user)"

**Causa:** Usuário fechou o popup de autenticação
**Solução:** Tente novamente o login

### Erro: "Firebase: Error (auth/unauthorized-domain)"

**Causa:** Domínio não autorizado no Firebase
**Solução:** Adicione `localhost:3000` aos domínios autorizados no Firebase Console

### Erro: "Network Error" na API

**Causa:** Backend não está rodando ou CORS não configurado
**Solução:** 
1. Verifique se o backend Django está rodando
2. Configure CORS no Django
3. Verifique a URL da API no `.env`

### Erro: "Token inválido"

**Causa:** Configuração incorreta do Firebase Admin SDK
**Solução:**
1. Verifique o arquivo de credenciais do serviço
2. Confirme que o projeto ID está correto
3. Verifique se o Firebase Admin SDK foi inicializado corretamente

## 📚 Próximos Passos

1. **Personalizar Interface:** Modifique cores, layout e componentes
2. **Adicionar Funcionalidades:** Implemente mais páginas e features
3. **Configurar Produção:** Prepare para deploy
4. **Adicionar Testes:** Implemente testes unitários e de integração
5. **Otimizar Performance:** Implemente lazy loading e code splitting

## 🆘 Suporte

Se encontrar problemas:

1. Verifique o console do navegador para erros
2. Confirme todas as configurações do Firebase
3. Teste com um projeto Firebase novo
4. Verifique a documentação oficial do Firebase

---

**🎉 Parabéns!** Seu frontend React com Firebase Auth está configurado e funcionando! 