from django.urls import path
from . import views

urlpatterns = [
    path('dashboard/', views.dashboard_stats, name='dashboard_stats'),
    path('comparative/', views.comparative_analysis, name='comparative_analysis'),
    path('trends/', views.trend_analysis, name='trend_analysis'),
] 