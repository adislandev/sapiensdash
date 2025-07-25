"""
Exemplo de Backend Django com Firebase Authentication
Este arquivo demonstra como implementar a validação de token Firebase no Django
"""

import os
import firebase_admin
from firebase_admin import auth, credentials
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
import json

# Configuração do Firebase Admin SDK
# Substitua pelo caminho do seu arquivo de credenciais
SERVICE_ACCOUNT_KEY_PATH = "path/to/your/serviceAccountKey.json"

def initialize_firebase():
    """Inicializa o Firebase Admin SDK"""
    try:
        if not firebase_admin._apps:
            cred = credentials.Certificate(SERVICE_ACCOUNT_KEY_PATH)
            firebase_admin.initialize_app(cred)
        return True
    except Exception as e:
        print(f"Erro ao inicializar Firebase: {e}")
        return False

def verify_firebase_token(request):
    """Verifica o token Firebase do header Authorization"""
    auth_header = request.headers.get('Authorization')
    
    if not auth_header or not auth_header.startswith('Bearer '):
        return None, "Token não fornecido"
    
    token = auth_header.split('Bearer ')[1]
    
    try:
        # Verificar token com Firebase
        decoded_token = auth.verify_id_token(token)
        return decoded_token, None
    except Exception as e:
        return None, f"Token inválido: {str(e)}"

@csrf_exempt
@require_http_methods(["GET"])
def user_data_view(request):
    """Endpoint para obter dados do usuário autenticado"""
    # Inicializar Firebase
    if not initialize_firebase():
        return JsonResponse({
            'error': 'Erro na configuração do Firebase'
        }, status=500)
    
    # Verificar token
    decoded_token, error = verify_firebase_token(request)
    if error:
        return JsonResponse({'error': error}, status=401)
    
    # Retornar dados do usuário
    user_data = {
        'success': True,
        'data': {
            'uid': decoded_token['uid'],
            'email': decoded_token.get('email'),
            'name': decoded_token.get('name'),
            'picture': decoded_token.get('picture'),
            'email_verified': decoded_token.get('email_verified', False),
            'message': 'Token válido! Usuário autenticado com sucesso.'
        }
    }
    
    return JsonResponse(user_data)

@csrf_exempt
@require_http_methods(["POST"])
def upload_notas_view(request):
    """Endpoint para upload de arquivo CSV de notas"""
    # Inicializar Firebase
    if not initialize_firebase():
        return JsonResponse({
            'error': 'Erro na configuração do Firebase'
        }, status=500)
    
    # Verificar token
    decoded_token, error = verify_firebase_token(request)
    if error:
        return JsonResponse({'error': error}, status=401)
    
    # Verificar se arquivo foi enviado
    if 'file' not in request.FILES:
        return JsonResponse({
            'error': 'Nenhum arquivo enviado'
        }, status=400)
    
    file = request.FILES['file']
    
    # Verificar tipo de arquivo
    if not file.name.endswith('.csv'):
        return JsonResponse({
            'error': 'Apenas arquivos CSV são aceitos'
        }, status=400)
    
    try:
        # Aqui você processaria o arquivo CSV
        # Por exemplo, usando pandas:
        # import pandas as pd
        # df = pd.read_csv(file)
        
        return JsonResponse({
            'success': True,
            'message': f'Arquivo {file.name} processado com sucesso',
            'user_id': decoded_token['uid'],
            'file_size': file.size,
            'rows_processed': 0  # Substitua pelo número real de linhas processadas
        })
        
    except Exception as e:
        return JsonResponse({
            'error': f'Erro ao processar arquivo: {str(e)}'
        }, status=500)

@csrf_exempt
@require_http_methods(["GET"])
def notas_view(request):
    """Endpoint para obter dados das notas"""
    # Inicializar Firebase
    if not initialize_firebase():
        return JsonResponse({
            'error': 'Erro na configuração do Firebase'
        }, status=500)
    
    # Verificar token
    decoded_token, error = verify_firebase_token(request)
    if error:
        return JsonResponse({'error': error}, status=401)
    
    # Aqui você retornaria os dados das notas do banco de dados
    # Por enquanto, retornamos dados de exemplo
    notas_data = {
        'success': True,
        'data': {
            'total_notas': 0,
            'notas': [],
            'message': 'Dados das notas carregados com sucesso'
        }
    }
    
    return JsonResponse(notas_data)

@csrf_exempt
@require_http_methods(["DELETE"])
def delete_notas_view(request):
    """Endpoint para deletar todas as notas"""
    # Inicializar Firebase
    if not initialize_firebase():
        return JsonResponse({
            'error': 'Erro na configuração do Firebase'
        }, status=500)
    
    # Verificar token
    decoded_token, error = verify_firebase_token(request)
    if error:
        return JsonResponse({'error': error}, status=401)
    
    try:
        # Aqui você deletaria os dados do banco de dados
        # Por exemplo:
        # Nota.objects.filter(user_id=decoded_token['uid']).delete()
        
        return JsonResponse({
            'success': True,
            'message': 'Todas as notas foram deletadas com sucesso'
        })
        
    except Exception as e:
        return JsonResponse({
            'error': f'Erro ao deletar notas: {str(e)}'
        }, status=500)

# Configuração das URLs (adicione ao urls.py do seu projeto Django)
"""
from django.urls import path
from . import django_backend_example

urlpatterns = [
    path('api/user-data/', django_backend_example.user_data_view, name='user_data'),
    path('api/upload-notas/', django_backend_example.upload_notas_view, name='upload_notas'),
    path('api/notas/', django_backend_example.notas_view, name='notas'),
    path('api/notas/', django_backend_example.delete_notas_view, name='delete_notas'),
]
"""

# Configuração do CORS (adicione ao settings.py)
"""
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

# Configuração CORS para desenvolvimento
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]
""" 