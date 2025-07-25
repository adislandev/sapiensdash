from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EnemDataViewSet, DataUploadViewSet, EscolaViewSet

router = DefaultRouter()
router.register(r'enem-data', EnemDataViewSet)
router.register(r'uploads', DataUploadViewSet)
router.register(r'escolas', EscolaViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 