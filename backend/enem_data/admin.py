from django.contrib import admin
from .models import EnemData, DataUpload, Escola


@admin.register(EnemData)
class EnemDataAdmin(admin.ModelAdmin):
    list_display = ['nome', 'inscricao', 'ano', 'escola', 'estado', 'media_geral', 'data_importacao']
    list_filter = ['ano', 'estado', 'status_processamento', 'data_importacao']
    search_fields = ['nome', 'inscricao', 'escola', 'cidade']
    readonly_fields = ['data_importacao', 'media_geral', 'total_notas']
    ordering = ['-ano', 'nome']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('inscricao', 'nome', 'ano')
        }),
        ('Localização', {
            'fields': ('escola', 'cidade', 'estado')
        }),
        ('Notas', {
            'fields': ('nota_cn', 'nota_ch', 'nota_mt', 'nota_lc', 'nota_red')
        }),
        ('Metadados', {
            'fields': ('fonte_dados', 'status_processamento', 'data_importacao'),
            'classes': ('collapse',)
        }),
    )


@admin.register(DataUpload)
class DataUploadAdmin(admin.ModelAdmin):
    list_display = ['nome_arquivo', 'tipo_arquivo', 'status_processamento', 'total_registros', 'registros_processados', 'data_upload']
    list_filter = ['status_processamento', 'tipo_arquivo', 'data_upload']
    readonly_fields = ['nome_arquivo', 'tamanho_arquivo', 'tipo_arquivo', 'data_upload', 'percentual_processado']
    ordering = ['-data_upload']
    
    fieldsets = (
        ('Informações do Arquivo', {
            'fields': ('arquivo', 'nome_arquivo', 'tamanho_arquivo', 'tipo_arquivo')
        }),
        ('Processamento', {
            'fields': ('status_processamento', 'total_registros', 'registros_processados', 'registros_com_erro', 'percentual_processado')
        }),
        ('Logs', {
            'fields': ('log_processamento', 'erro_processamento'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Escola)
class EscolaAdmin(admin.ModelAdmin):
    list_display = ['nome', 'cidade', 'estado', 'total_alunos', 'media_geral', 'ultima_atualizacao']
    list_filter = ['estado', 'ultima_atualizacao']
    search_fields = ['nome', 'cidade', 'codigo_inep']
    readonly_fields = ['total_alunos', 'media_geral', 'ultima_atualizacao']
    ordering = ['nome'] 