from django.urls import path
from .views import CommandeCreateView

urlpatterns = [
    path('', CommandeCreateView.as_view(), name='creer_commande'),  # par ex. /api/commandes/ 
]
