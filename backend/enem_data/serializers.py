from rest_framework import serializers
from .models import EnemData, DataUpload, Escola


class EnemDataSerializer(serializers.ModelSerializer):
    """Serializer para dados do ENEM."""
    media_geral = serializers.ReadOnlyField()
    total_notas = serializers.ReadOnlyField()
    
    class Meta:
        model = EnemData
        fields = [
            'id', 'inscricao', 'nome', 'escola', 'cidade', 'estado', 'ano',
            'nota_cn', 'nota_ch', 'nota_mt', 'nota_lc', 'nota_red',
            'media_geral', 'total_notas', 'data_importacao', 'fonte_dados'
        ]
        read_only_fields = ['id', 'data_importacao', 'media_geral', 'total_notas']


class EnemDataListSerializer(serializers.ModelSerializer):
    """Serializer para listagem de dados ENEM."""
    media_geral = serializers.ReadOnlyField()
    
    class Meta:
        model = EnemData
        fields = [
            'id', 'nome', 'escola', 'estado', 'ano', 'media_geral'
        ]


class DataUploadSerializer(serializers.ModelSerializer):
    """Serializer para uploads de dados."""
    percentual_processado = serializers.ReadOnlyField()
    
    class Meta:
        model = DataUpload
        fields = [
            'id', 'arquivo', 'nome_arquivo', 'tamanho_arquivo', 'tipo_arquivo',
            'status_processamento', 'total_registros', 'registros_processados',
            'registros_com_erro', 'percentual_processado', 'data_upload'
        ]
        read_only_fields = [
            'id', 'nome_arquivo', 'tamanho_arquivo', 'tipo_arquivo',
            'status_processamento', 'total_registros', 'registros_processados',
            'registros_com_erro', 'percentual_processado', 'data_upload'
        ]


class DataUploadCreateSerializer(serializers.ModelSerializer):
    """Serializer para criação de uploads."""
    
    class Meta:
        model = DataUpload
        fields = ['arquivo']
    
    def validate_arquivo(self, value):
        """Valida o arquivo enviado."""
        # Verificar extensão
        allowed_extensions = ['.csv', '.xls', '.xlsx']
        file_extension = value.name.lower()
        
        if not any(file_extension.endswith(ext) for ext in allowed_extensions):
            raise serializers.ValidationError(
                "Apenas arquivos CSV, XLS e XLSX são permitidos."
            )
        
        # Verificar tamanho (10MB)
        if value.size > 10 * 1024 * 1024:
            raise serializers.ValidationError(
                "O arquivo deve ter no máximo 10MB."
            )
        
        return value


class EscolaSerializer(serializers.ModelSerializer):
    """Serializer para escolas."""
    
    class Meta:
        model = Escola
        fields = [
            'id', 'nome', 'cidade', 'estado', 'codigo_inep',
            'total_alunos', 'media_geral', 'ultima_atualizacao'
        ]
        read_only_fields = ['id', 'total_alunos', 'media_geral', 'ultima_atualizacao']


class EnemDataStatsSerializer(serializers.Serializer):
    """Serializer para estatísticas dos dados ENEM."""
    total_registros = serializers.IntegerField()
    total_escolas = serializers.IntegerField()
    total_estados = serializers.IntegerField()
    anos_disponiveis = serializers.ListField(child=serializers.IntegerField())
    media_geral_geral = serializers.FloatField()
    
    # Estatísticas por área
    media_cn = serializers.FloatField()
    media_ch = serializers.FloatField()
    media_mt = serializers.FloatField()
    media_lc = serializers.FloatField()
    media_red = serializers.FloatField()
    
    # Top escolas
    top_escolas = serializers.ListField()
    
    # Distribuição por estado
    distribuicao_estados = serializers.DictField() 