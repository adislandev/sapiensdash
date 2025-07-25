# 🐳 **BACKEND SAPIENSBI ENEM - DJANGO + DOCKER**

## 📋 **DESCRIÇÃO**

Backend Django para o sistema de análise comparativa de resultados do ENEM. Permite upload, processamento e análise de dados ENEM via API REST.

## 🏗️ **ARQUITETURA**

```
backend/
├── sapiensbi_enem/          # Projeto Django principal
├── enem_data/              # App para dados ENEM
├── analytics/              # App para análises
├── media/                  # Arquivos de upload
├── static/                 # Arquivos estáticos
├── logs/                   # Logs da aplicação
├── Dockerfile             # Configuração Docker
├── docker-compose.yml     # Orquestração de containers
└── requirements.txt       # Dependências Python
```

## 🚀 **FUNCIONALIDADES**

### **📊 Dados ENEM**
- ✅ Upload de arquivos CSV/XLS/XLSX
- ✅ Processamento automático de dados
- ✅ Validação e limpeza de dados
- ✅ Armazenamento no banco de dados
- ✅ API REST completa

### **📈 Análises**
- ✅ Estatísticas gerais
- ✅ Comparações entre escolas/estados
- ✅ Análise de tendências temporais
- ✅ Rankings e percentis
- ✅ Exportação de dados

### **🔐 Segurança**
- ✅ Autenticação Firebase
- ✅ Validação de uploads
- ✅ Controle de acesso
- ✅ Sanitização de dados

## 🛠️ **TECNOLOGIAS**

- **Django 4.2.7** - Framework web
- **Django REST Framework** - API REST
- **PostgreSQL** - Banco de dados
- **Redis** - Cache e filas
- **Pandas** - Processamento de dados
- **Docker** - Containerização
- **Gunicorn** - Servidor WSGI

## 📦 **INSTALAÇÃO E EXECUÇÃO**

### **1. Pré-requisitos**
```bash
# Docker e Docker Compose instalados
docker --version
docker-compose --version
```

### **2. Configuração**
```bash
# Copiar arquivo de ambiente
cp env.backend.example .env

# Editar variáveis de ambiente
nano .env
```

### **3. Execução com Docker**
```bash
# Construir e iniciar containers
docker-compose up --build

# Executar em background
docker-compose up -d

# Parar containers
docker-compose down
```

### **4. Execução Local (Desenvolvimento)**
```bash
# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar banco
python manage.py makemigrations
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Executar servidor
python manage.py runserver
```

## 🔧 **CONFIGURAÇÃO**

### **Variáveis de Ambiente**
```bash
# Django
SECRET_KEY=sua_chave_secreta
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Firebase
FIREBASE_API_KEY=sua_api_key
FIREBASE_AUTH_DOMAIN=seu_dominio
FIREBASE_PROJECT_ID=seu_projeto

# Banco de dados
DB_PASSWORD=sua_senha_banco

# Celery
CELERY_BROKER_URL=redis://localhost:6379/0
```

## 📡 **API ENDPOINTS**

### **Dados ENEM**
```
GET    /api/enem-data/           # Listar dados
POST   /api/enem-data/           # Criar registro
GET    /api/enem-data/{id}/      # Detalhes do registro
PUT    /api/enem-data/{id}/      # Atualizar registro
DELETE /api/enem-data/{id}/      # Deletar registro
GET    /api/enem-data/stats/     # Estatísticas
GET    /api/enem-data/export/    # Exportar dados
```

### **Uploads**
```
POST   /api/uploads/             # Upload de arquivo
GET    /api/uploads/             # Listar uploads
GET    /api/uploads/{id}/        # Detalhes do upload
GET    /api/uploads/{id}/status/ # Status do processamento
```

### **Escolas**
```
GET    /api/escolas/             # Listar escolas
GET    /api/escolas/{id}/        # Detalhes da escola
GET    /api/escolas/top_performers/ # Top escolas
```

### **Analytics**
```
GET    /api/analytics/dashboard/     # Estatísticas do dashboard
GET    /api/analytics/comparative/   # Análise comparativa
GET    /api/analytics/trends/        # Análise de tendências
```

## 📁 **ESTRUTURA DE DADOS**

### **Modelo EnemData**
```python
{
    'inscricao': '2023000001',
    'nome': 'João Silva',
    'escola': 'Colégio São Paulo',
    'cidade': 'São Paulo',
    'estado': 'SP',
    'ano': 2023,
    'nota_cn': 750.50,  # Ciências da Natureza
    'nota_ch': 680.25,  # Ciências Humanas
    'nota_mt': 820.75,  # Matemática
    'nota_lc': 720.30,  # Linguagens e Códigos
    'nota_red': 850.00, # Redação
}
```

## 🔍 **TESTES**

### **Upload de Arquivo**
```bash
# Usar o arquivo de exemplo
curl -X POST \
  http://localhost:8000/api/uploads/ \
  -H 'Authorization: Bearer seu_token' \
  -F 'arquivo=@upload/enem/exemplo_enem.csv'
```

### **Verificar Estatísticas**
```bash
curl -X GET \
  http://localhost:8000/api/enem-data/stats/ \
  -H 'Authorization: Bearer seu_token'
```

## 🐳 **DOCKER**

### **Comandos Úteis**
```bash
# Ver logs
docker-compose logs backend

# Executar comandos Django
docker-compose exec backend python manage.py migrate

# Acessar shell Django
docker-compose exec backend python manage.py shell

# Backup do banco
docker-compose exec db pg_dump -U sapiensbi_user sapiensbi_enem > backup.sql
```

### **Volumes**
- `./media` - Arquivos de upload
- `./staticfiles` - Arquivos estáticos
- `./logs` - Logs da aplicação
- `postgres_data` - Dados do PostgreSQL

## 🔧 **DESENVOLVIMENTO**

### **Estrutura de Apps**
```
enem_data/
├── models.py      # Modelos de dados
├── views.py       # Views da API
├── serializers.py # Serializers
├── admin.py       # Interface admin
└── utils.py       # Utilitários

analytics/
├── views.py       # Views de analytics
└── urls.py        # URLs de analytics
```

### **Adicionar Novos Endpoints**
1. Criar view em `views.py`
2. Adicionar serializer se necessário
3. Registrar URL em `urls.py`
4. Testar endpoint

## 📊 **MONITORAMENTO**

### **Logs**
- Arquivos de log em `./logs/`
- Logs do Docker: `docker-compose logs`

### **Métricas**
- Status dos uploads
- Tempo de processamento
- Erros de validação
- Performance da API

## 🚀 **DEPLOY**

### **Produção**
1. Configurar `DEBUG=False`
2. Gerar nova `SECRET_KEY`
3. Configurar `ALLOWED_HOSTS`
4. Usar PostgreSQL externo
5. Configurar SSL/TLS

### **VPS**
```bash
# Clonar repositório
git clone seu-repositorio

# Configurar ambiente
cp env.backend.example .env
nano .env

# Executar
docker-compose up -d

# Configurar Nginx (opcional)
sudo nano /etc/nginx/sites-available/sapiensbi
sudo ln -s /etc/nginx/sites-available/sapiensbi /etc/nginx/sites-enabled/
sudo systemctl reload nginx
```

## 📝 **NOTAS**

- **Arquivos temporários**: São processados e deletados após importação
- **Dados persistentes**: Ficam salvos no banco de dados
- **Performance**: Processamento em lotes de 1000 registros
- **Segurança**: Validação rigorosa de uploads
- **Escalabilidade**: Arquitetura preparada para crescimento

## 🤝 **CONTRIBUIÇÃO**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **LICENÇA**

Este projeto está sob a licença MIT. 