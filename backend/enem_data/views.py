from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Avg, Count, Q
from django.http import JsonResponse
import pandas as pd
import os

from .models import EnemData, DataUpload, Escola
from .serializers import (
    EnemDataSerializer, EnemDataListSerializer, DataUploadSerializer,
    DataUploadCreateSerializer, EscolaSerializer, EnemDataStatsSerializer
)
from .utils import process_enem_file


class EnemDataViewSet(viewsets.ModelViewSet):
    """ViewSet para dados do ENEM."""
    queryset = EnemData.objects.all()
    serializer_class = EnemDataSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['ano', 'estado', 'escola', 'status_processamento']
    search_fields = ['nome', 'inscricao', 'escola', 'cidade']
    ordering_fields = ['nome', 'ano', 'media_geral', 'data_importacao']
    ordering = ['-ano', 'nome']
    
    def get_serializer_class(self):
        if self.action == 'list':
            return EnemDataListSerializer
        return EnemDataSerializer
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Retorna estatísticas dos dados ENEM."""
        queryset = self.get_queryset()
        
        # Estatísticas básicas
        total_registros = queryset.count()
        total_escolas = queryset.values('escola').distinct().count()
        total_estados = queryset.values('estado').distinct().count()
        anos_disponiveis = list(queryset.values_list('ano', flat=True).distinct().order_by('ano'))
        
        # Médias por área
        medias = queryset.aggregate(
            media_cn=Avg('nota_cn'),
            media_ch=Avg('nota_ch'),
            media_mt=Avg('nota_mt'),
            media_lc=Avg('nota_lc'),
            media_red=Avg('nota_red')
        )
        
        # Média geral
        media_geral_geral = queryset.aggregate(
            media_geral=Avg(
                (Q('nota_cn') + Q('nota_ch') + Q('nota_mt') + Q('nota_lc') + Q('nota_red')) / 5
            )
        )['media_geral']
        
        # Top escolas
        top_escolas = queryset.values('escola').annotate(
            media=Avg('nota_cn') + Avg('nota_ch') + Avg('nota_mt') + Avg('nota_lc') + Avg('nota_red') / 5,
            total_alunos=Count('id')
        ).filter(escola__isnull=False).order_by('-media')[:10]
        
        # Distribuição por estado
        distribuicao_estados = dict(
            queryset.values('estado').annotate(
                total=Count('id')
            ).values_list('estado', 'total')
        )
        
        stats_data = {
            'total_registros': total_registros,
            'total_escolas': total_escolas,
            'total_estados': total_estados,
            'anos_disponiveis': anos_disponiveis,
            'media_geral_geral': media_geral_geral or 0,
            'media_cn': medias['media_cn'] or 0,
            'media_ch': medias['media_ch'] or 0,
            'media_mt': medias['media_mt'] or 0,
            'media_lc': medias['media_lc'] or 0,
            'media_red': medias['media_red'] or 0,
            'top_escolas': list(top_escolas),
            'distribuicao_estados': distribuicao_estados,
        }
        
        serializer = EnemDataStatsSerializer(stats_data)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def export(self, request):
        """Exporta dados para CSV."""
        queryset = self.get_queryset()
        
        # Filtrar por parâmetros da query
        ano = request.query_params.get('ano')
        estado = request.query_params.get('estado')
        
        if ano:
            queryset = queryset.filter(ano=ano)
        if estado:
            queryset = queryset.filter(estado=estado)
        
        # Converter para DataFrame
        data = list(queryset.values())
        df = pd.DataFrame(data)
        
        # Salvar como CSV
        filename = f"enem_data_{ano or 'all'}_{estado or 'all'}.csv"
        filepath = os.path.join('media', 'exports', filename)
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        df.to_csv(filepath, index=False)
        
        return JsonResponse({
            'message': 'Dados exportados com sucesso',
            'filename': filename,
            'download_url': f'/media/exports/{filename}'
        })


class DataUploadViewSet(viewsets.ModelViewSet):
    """ViewSet para uploads de dados."""
    queryset = DataUpload.objects.all()
    serializer_class = DataUploadSerializer
    permission_classes = [IsAuthenticated]
    ordering = ['-data_upload']
    
    def get_serializer_class(self):
        if self.action == 'create':
            return DataUploadCreateSerializer
        return DataUploadSerializer
    
    def create(self, request, *args, **kwargs):
        """Cria um novo upload e inicia o processamento."""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Criar o objeto de upload
        upload = serializer.save()
        
        # Configurar metadados do arquivo
        upload.nome_arquivo = upload.arquivo.name.split('/')[-1]
        upload.tamanho_arquivo = upload.arquivo.size
        upload.tipo_arquivo = upload.arquivo.name.split('.')[-1].upper()
        upload.save()
        
        # Iniciar processamento em background
        try:
            process_enem_file(upload.id)
            upload.status_processamento = 'concluido'
        except Exception as e:
            upload.status_processamento = 'erro'
            upload.erro_processamento = str(e)
        
        upload.save()
        
        return Response(
            DataUploadSerializer(upload).data,
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=True, methods=['get'])
    def status(self, request, pk=None):
        """Retorna o status do processamento."""
        upload = self.get_object()
        return Response({
            'id': upload.id,
            'status': upload.status_processamento,
            'progress': upload.percentual_processado,
            'total_registros': upload.total_registros,
            'registros_processados': upload.registros_processados,
            'registros_com_erro': upload.registros_com_erro,
        })


class EscolaViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet para escolas."""
    queryset = Escola.objects.all()
    serializer_class = EscolaSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['estado']
    search_fields = ['nome', 'cidade']
    ordering_fields = ['nome', 'media_geral', 'total_alunos']
    ordering = ['nome']
    
    @action(detail=False, methods=['get'])
    def top_performers(self, request):
        """Retorna as escolas com melhor desempenho."""
        top_escolas = self.get_queryset().filter(
            media_geral__isnull=False
        ).order_by('-media_geral')[:20]
        
        serializer = self.get_serializer(top_escolas, many=True)
        return Response(serializer.data) 