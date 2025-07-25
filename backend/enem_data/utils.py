"""
Utilitários para processamento de dados ENEM.
"""
import pandas as pd
import numpy as np
from decimal import Decimal
from django.db import transaction
from .models import EnemData, DataUpload, Escola


def process_enem_file(upload_id):
    """
    Processa um arquivo de dados ENEM.
    """
    upload = DataUpload.objects.get(id=upload_id)
    upload.status_processamento = 'processando'
    upload.save()
    
    try:
        # Ler o arquivo
        file_path = upload.arquivo.path
        file_extension = file_path.split('.')[-1].lower()
        
        if file_extension == 'csv':
            df = pd.read_csv(file_path, encoding='utf-8')
        elif file_extension in ['xls', 'xlsx']:
            df = pd.read_excel(file_path)
        else:
            raise ValueError(f"Formato de arquivo não suportado: {file_extension}")
        
        # Normalizar nomes das colunas
        df.columns = df.columns.str.lower().str.strip()
        
        # Mapear colunas esperadas
        column_mapping = {
            'inscricao': ['inscricao', 'inscrição', 'insc'],
            'nome': ['nome', 'nome_candidato', 'candidato'],
            'escola': ['escola', 'nome_escola', 'instituicao'],
            'cidade': ['cidade', 'municipio', 'município'],
            'estado': ['estado', 'uf', 'sigla_estado'],
            'ano': ['ano', 'ano_enem', 'edicao'],
            'nota_cn': ['nota_cn', 'cn', 'ciencias_natureza', 'ciências_natureza'],
            'nota_ch': ['nota_ch', 'ch', 'ciencias_humanas', 'ciências_humanas'],
            'nota_mt': ['nota_mt', 'mt', 'matematica', 'matemática'],
            'nota_lc': ['nota_lc', 'lc', 'linguagens', 'linguagens_codigos'],
            'nota_red': ['nota_red', 'redacao', 'redação', 'red'],
        }
        
        # Mapear colunas encontradas
        mapped_columns = {}
        for target_col, possible_names in column_mapping.items():
            for col_name in possible_names:
                if col_name in df.columns:
                    mapped_columns[target_col] = col_name
                    break
        
        # Verificar colunas obrigatórias
        required_columns = ['inscricao', 'nome', 'ano']
        missing_columns = [col for col in required_columns if col not in mapped_columns]
        
        if missing_columns:
            raise ValueError(f"Colunas obrigatórias não encontradas: {missing_columns}")
        
        # Renomear colunas
        df_renamed = df.rename(columns={v: k for k, v in mapped_columns.items()})
        
        # Limpar dados
        df_clean = clean_enem_data(df_renamed)
        
        # Processar em lotes
        total_registros = len(df_clean)
        upload.total_registros = total_registros
        upload.save()
        
        registros_processados = 0
        registros_com_erro = 0
        
        # Processar em lotes de 1000
        batch_size = 1000
        for i in range(0, total_registros, batch_size):
            batch = df_clean.iloc[i:i+batch_size]
            
            with transaction.atomic():
                for _, row in batch.iterrows():
                    try:
                        # Criar ou atualizar registro
                        enem_data, created = EnemData.objects.update_or_create(
                            inscricao=str(row['inscricao']),
                            defaults={
                                'nome': str(row['nome']),
                                'escola': str(row.get('escola', '')) if pd.notna(row.get('escola')) else None,
                                'cidade': str(row.get('cidade', '')) if pd.notna(row.get('cidade')) else None,
                                'estado': str(row.get('estado', '')) if pd.notna(row.get('estado')) else None,
                                'ano': int(row['ano']),
                                'nota_cn': Decimal(str(row.get('nota_cn', 0))) if pd.notna(row.get('nota_cn')) else None,
                                'nota_ch': Decimal(str(row.get('nota_ch', 0))) if pd.notna(row.get('nota_ch')) else None,
                                'nota_mt': Decimal(str(row.get('nota_mt', 0))) if pd.notna(row.get('nota_mt')) else None,
                                'nota_lc': Decimal(str(row.get('nota_lc', 0))) if pd.notna(row.get('nota_lc')) else None,
                                'nota_red': Decimal(str(row.get('nota_red', 0))) if pd.notna(row.get('nota_red')) else None,
                                'fonte_dados': f"Upload: {upload.nome_arquivo}",
                                'status_processamento': 'processado',
                            }
                        )
                        registros_processados += 1
                        
                    except Exception as e:
                        registros_com_erro += 1
                        print(f"Erro ao processar registro: {e}")
            
            # Atualizar progresso
            upload.registros_processados = registros_processados
            upload.registros_com_erro = registros_com_erro
            upload.save()
        
        # Atualizar estatísticas das escolas
        update_school_statistics()
        
        upload.status_processamento = 'concluido'
        upload.log_processamento = f"Processamento concluído: {registros_processados} registros processados, {registros_com_erro} com erro"
        upload.save()
        
    except Exception as e:
        upload.status_processamento = 'erro'
        upload.erro_processamento = str(e)
        upload.save()
        raise


def clean_enem_data(df):
    """
    Limpa e valida dados do ENEM.
    """
    # Remover linhas duplicadas
    df = df.drop_duplicates(subset=['inscricao'])
    
    # Limpar strings
    string_columns = ['nome', 'escola', 'cidade', 'estado']
    for col in string_columns:
        if col in df.columns:
            df[col] = df[col].astype(str).str.strip().str.title()
    
    # Validar notas (entre 0 e 1000)
    nota_columns = ['nota_cn', 'nota_ch', 'nota_mt', 'nota_lc', 'nota_red']
    for col in nota_columns:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')
            df[col] = df[col].clip(0, 1000)
    
    # Validar ano
    if 'ano' in df.columns:
        df['ano'] = pd.to_numeric(df['ano'], errors='coerce')
        df = df[df['ano'].between(1998, 2030)]  # Anos válidos do ENEM
    
    # Remover linhas com dados essenciais faltando
    df = df.dropna(subset=['inscricao', 'nome', 'ano'])
    
    return df


def update_school_statistics():
    """
    Atualiza estatísticas das escolas.
    """
    from django.db.models import Avg, Count
    
    # Buscar todas as escolas únicas
    escolas_data = EnemData.objects.values('escola', 'cidade', 'estado').filter(
        escola__isnull=False
    ).distinct()
    
    for escola_info in escolas_data:
        escola_nome = escola_info['escola']
        cidade = escola_info['cidade']
        estado = escola_info['estado']
        
        # Calcular estatísticas
        dados_escola = EnemData.objects.filter(
            escola=escola_nome,
            cidade=cidade,
            estado=estado
        )
        
        total_alunos = dados_escola.count()
        media_geral = dados_escola.aggregate(
            media=Avg('nota_cn') + Avg('nota_ch') + Avg('nota_mt') + Avg('nota_lc') + Avg('nota_red') / 5
        )['media']
        
        # Criar ou atualizar escola
        escola, created = Escola.objects.update_or_create(
            nome=escola_nome,
            cidade=cidade,
            estado=estado,
            defaults={
                'total_alunos': total_alunos,
                'media_geral': media_geral,
            }
        ) 