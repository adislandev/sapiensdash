from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.db.models import Avg, Count, Q
from enem_data.models import EnemData, Escola


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def dashboard_stats(request):
    """Estatísticas para o dashboard."""
    # Estatísticas gerais
    total_registros = EnemData.objects.count()
    total_escolas = EnemData.objects.values('escola').distinct().count()
    total_estados = EnemData.objects.values('estado').distinct().count()
    
    # Médias por área
    medias = EnemData.objects.aggregate(
        media_cn=Avg('nota_cn'),
        media_ch=Avg('nota_ch'),
        media_mt=Avg('nota_mt'),
        media_lc=Avg('nota_lc'),
        media_red=Avg('nota_red')
    )
    
    # Top 5 escolas
    top_escolas = EnemData.objects.values('escola').annotate(
        media_geral=Avg('nota_cn') + Avg('nota_ch') + Avg('nota_mt') + Avg('nota_lc') + Avg('nota_red') / 5,
        total_alunos=Count('id')
    ).filter(escola__isnull=False).order_by('-media_geral')[:5]
    
    # Distribuição por estado
    distribuicao_estados = EnemData.objects.values('estado').annotate(
        total=Count('id')
    ).order_by('-total')[:10]
    
    return Response({
        'total_registros': total_registros,
        'total_escolas': total_escolas,
        'total_estados': total_estados,
        'medias_areas': medias,
        'top_escolas': list(top_escolas),
        'distribuicao_estados': list(distribuicao_estados),
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def comparative_analysis(request):
    """Análise comparativa entre escolas/estados."""
    escola1 = request.GET.get('escola1')
    escola2 = request.GET.get('escola2')
    estado1 = request.GET.get('estado1')
    estado2 = request.GET.get('estado2')
    ano = request.GET.get('ano')
    
    # Filtrar por ano se especificado
    queryset = EnemData.objects.all()
    if ano:
        queryset = queryset.filter(ano=ano)
    
    # Comparação entre escolas
    if escola1 and escola2:
        dados_escola1 = queryset.filter(escola=escola1)
        dados_escola2 = queryset.filter(escola=escola2)
        
        medias_escola1 = dados_escola1.aggregate(
            media_cn=Avg('nota_cn'),
            media_ch=Avg('nota_ch'),
            media_mt=Avg('nota_mt'),
            media_lc=Avg('nota_lc'),
            media_red=Avg('nota_red')
        )
        
        medias_escola2 = dados_escola2.aggregate(
            media_cn=Avg('nota_cn'),
            media_ch=Avg('nota_ch'),
            media_mt=Avg('nota_mt'),
            media_lc=Avg('nota_lc'),
            media_red=Avg('nota_red')
        )
        
        return Response({
            'tipo_comparacao': 'escolas',
            'escola1': {
                'nome': escola1,
                'total_alunos': dados_escola1.count(),
                'medias': medias_escola1
            },
            'escola2': {
                'nome': escola2,
                'total_alunos': dados_escola2.count(),
                'medias': medias_escola2
            }
        })
    
    # Comparação entre estados
    elif estado1 and estado2:
        dados_estado1 = queryset.filter(estado=estado1)
        dados_estado2 = queryset.filter(estado=estado2)
        
        medias_estado1 = dados_estado1.aggregate(
            media_cn=Avg('nota_cn'),
            media_ch=Avg('nota_ch'),
            media_mt=Avg('nota_mt'),
            media_lc=Avg('nota_lc'),
            media_red=Avg('nota_red')
        )
        
        medias_estado2 = dados_estado2.aggregate(
            media_cn=Avg('nota_cn'),
            media_ch=Avg('nota_ch'),
            media_mt=Avg('nota_mt'),
            media_lc=Avg('nota_lc'),
            media_red=Avg('nota_red')
        )
        
        return Response({
            'tipo_comparacao': 'estados',
            'estado1': {
                'nome': estado1,
                'total_alunos': dados_estado1.count(),
                'medias': medias_estado1
            },
            'estado2': {
                'nome': estado2,
                'total_alunos': dados_estado2.count(),
                'medias': medias_estado2
            }
        })
    
    return Response({'error': 'Especifique escolas ou estados para comparação'}, status=400)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trend_analysis(request):
    """Análise de tendências ao longo dos anos."""
    escola = request.GET.get('escola')
    estado = request.GET.get('estado')
    
    queryset = EnemData.objects.all()
    
    if escola:
        queryset = queryset.filter(escola=escola)
    elif estado:
        queryset = queryset.filter(estado=estado)
    
    # Tendências por ano
    tendencias = queryset.values('ano').annotate(
        media_cn=Avg('nota_cn'),
        media_ch=Avg('nota_ch'),
        media_mt=Avg('nota_mt'),
        media_lc=Avg('nota_lc'),
        media_red=Avg('nota_red'),
        total_alunos=Count('id')
    ).order_by('ano')
    
    return Response({
        'filtro': escola or estado,
        'tipo_filtro': 'escola' if escola else 'estado',
        'tendencias': list(tendencias)
    }) 