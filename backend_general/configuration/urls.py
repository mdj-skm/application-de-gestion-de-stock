from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UtilisateurConfigurationViewSet, login_custom_user

router = DefaultRouter()
router.register(r'utilisateurs', UtilisateurConfigurationViewSet, basename='utilisateur')

urlpatterns = [
    path('', include(router.urls)),
    path('login_custom/', login_custom_user),
    
]
