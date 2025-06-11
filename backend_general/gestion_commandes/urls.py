from django.urls import path
from .views import CommandeCreateView
from .views import livrer_commande

urlpatterns = [
    path('', CommandeCreateView.as_view(), name='creer_commande'),  # par ex. /api/commandes/ 
    path('livrer_commande/<str:numero_commande>/', livrer_commande, name='livrer_commande'),
]

