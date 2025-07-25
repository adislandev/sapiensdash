"""
Modelos para dados do ENEM.
"""
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone


class EnemData(models.Model):
    """
    Modelo principal para armazenar dados do ENEM.
    """
    # Informações básicas do candidato
    inscricao = models.CharField(max_length=20, unique=True, verbose_name="Inscrição")
    nome = models.CharField(max_length=200, verbose_name="Nome")
    escola = models.CharField(max_length=200, blank=True, null=True, verbose_name="Escola")
    cidade = models.CharField(max_length=100, blank=True, null=True, verbose_name="Cidade")
    estado = models.CharField(max_length=2, blank=True, null=True, verbose_name="Estado")
    ano = models.IntegerField(verbose_name="Ano do ENEM")
    
    # Notas por área
    nota_cn = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(1000)],
        verbose_name="Nota Ciências da Natureza"
    )
    nota_ch = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(1000)],
        verbose_name="Nota Ciências Humanas"
    )
    nota_mt = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(1000)],
        verbose_name="Nota Matemática"
    )
    nota_lc = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(1000)],
        verbose_name="Nota Linguagens e Códigos"
    )
    nota_red = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        validators=[MinValueValidator(0), MaxValueValidator(1000)],
        verbose_name="Nota Redação"
    )
    
    # Metadados
    data_importacao = models.DateTimeField(auto_now_add=True, verbose_name="Data de Importação")
    fonte_dados = models.CharField(max_length=100, default="Upload manual", verbose_name="Fonte dos Dados")
    status_processamento = models.CharField(
        max_length=20,
        choices=[
            ('pendente', 'Pendente'),
            ('processado', 'Processado'),
            ('erro', 'Erro'),
        ],
        default='processado',
        verbose_name="Status de Processamento"
    )
    
    class Meta:
        verbose_name = "Dado ENEM"
        verbose_name_plural = "Dados ENEM"
        ordering = ['-ano', 'nome']
        indexes = [
            models.Index(fields=['ano']),
            models.Index(fields=['estado']),
            models.Index(fields=['escola']),
            models.Index(fields=['data_importacao']),
        ]
    
    def __str__(self):
        return f"{self.nome} - {self.ano} ({self.inscricao})"
    
    @property
    def media_geral(self):
        """Calcula a média geral das notas."""
        notas = [self.nota_cn, self.nota_ch, self.nota_mt, self.nota_lc, self.nota_red]
        notas_validas = [n for n in notas if n is not None]
        return sum(notas_validas) / len(notas_validas) if notas_validas else None
    
    @property
    def total_notas(self):
        """Retorna o número de notas válidas."""
        notas = [self.nota_cn, self.nota_ch, self.nota_mt, self.nota_lc, self.nota_red]
        return len([n for n in notas if n is not None])


class DataUpload(models.Model):
    """
    Modelo para rastrear uploads de arquivos.
    """
    arquivo = models.FileField(upload_to='uploads/enem/', verbose_name="Arquivo")
    nome_arquivo = models.CharField(max_length=255, verbose_name="Nome do Arquivo")
    tamanho_arquivo = models.BigIntegerField(verbose_name="Tamanho do Arquivo (bytes)")
    tipo_arquivo = models.CharField(max_length=10, verbose_name="Tipo do Arquivo")
    
    # Metadados do processamento
    data_upload = models.DateTimeField(auto_now_add=True, verbose_name="Data do Upload")
    status_processamento = models.CharField(
        max_length=20,
        choices=[
            ('pendente', 'Pendente'),
            ('processando', 'Processando'),
            ('concluido', 'Concluído'),
            ('erro', 'Erro'),
        ],
        default='pendente',
        verbose_name="Status de Processamento"
    )
    
    # Resultados do processamento
    total_registros = models.IntegerField(default=0, verbose_name="Total de Registros")
    registros_processados = models.IntegerField(default=0, verbose_name="Registros Processados")
    registros_com_erro = models.IntegerField(default=0, verbose_name="Registros com Erro")
    
    # Logs de processamento
    log_processamento = models.TextField(blank=True, null=True, verbose_name="Log de Processamento")
    erro_processamento = models.TextField(blank=True, null=True, verbose_name="Erro de Processamento")
    
    class Meta:
        verbose_name = "Upload de Dados"
        verbose_name_plural = "Uploads de Dados"
        ordering = ['-data_upload']
    
    def __str__(self):
        return f"{self.nome_arquivo} - {self.data_upload.strftime('%d/%m/%Y %H:%M')}"
    
    @property
    def percentual_processado(self):
        """Calcula o percentual de processamento."""
        if self.total_registros == 0:
            return 0
        return (self.registros_processados / self.total_registros) * 100


class Escola(models.Model):
    """
    Modelo para armazenar informações das escolas.
    """
    nome = models.CharField(max_length=200, verbose_name="Nome da Escola")
    cidade = models.CharField(max_length=100, verbose_name="Cidade")
    estado = models.CharField(max_length=2, verbose_name="Estado")
    codigo_inep = models.CharField(max_length=20, blank=True, null=True, verbose_name="Código INEP")
    
    # Estatísticas calculadas
    total_alunos = models.IntegerField(default=0, verbose_name="Total de Alunos")
    media_geral = models.DecimalField(
        max_digits=5, 
        decimal_places=2, 
        blank=True, 
        null=True,
        verbose_name="Média Geral"
    )
    ultima_atualizacao = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")
    
    class Meta:
        verbose_name = "Escola"
        verbose_name_plural = "Escolas"
        unique_together = ['nome', 'cidade', 'estado']
        ordering = ['nome']
    
    def __str__(self):
        return f"{self.nome} - {self.cidade}/{self.estado}" 