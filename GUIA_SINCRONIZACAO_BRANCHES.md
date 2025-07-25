# 🔄 **GUIA DE SINCRONIZAÇÃO DE BRANCHES**

## 📋 **OBJETIVO**
Sincronizar todas as branches para ficarem idênticas e criar a branch `notebook` para desenvolvimento do backend.

## 🚀 **COMANDOS PARA EXECUTAR**

### **1. Mudar para branch main**
```bash
git checkout main
```

### **2. Atualizar main**
```bash
git pull origin main
```

### **3. Atualizar adislan-dev para ficar igual à main**
```bash
git checkout adislan-dev
git reset --hard main
git push origin adislan-dev --force
```

### **4. Criar e mudar para branch notebook**
```bash
git checkout -b notebook
```

### **5. Verificar status**
```bash
git branch
```

## ✅ **RESULTADO ESPERADO**
- `main` e `adislan-dev` ficam idênticas
- Nova branch `notebook` criada
- Todas as branches sincronizadas

## 🎯 **PRÓXIMOS PASSOS**
Após sincronização, começaremos o desenvolvimento do backend Django no Docker.

## ⚠️ **NOTA IMPORTANTE**
Se o terminal ficar preso no pager (less), pressione `q` para sair e continue com o próximo comando. 