from django.urls import path
from .views import FournisseurListCreateView, FournisseurRetrieveUpdateDestroyView
from .views import livrer_produit


urlpatterns = [
    path('', FournisseurListCreateView.as_view(), name='liste_fournisseurs'),
    path('<int:pk>/', FournisseurRetrieveUpdateDestroyView.as_view(), name='detail_fournisseur'),
    path('livrer/<int:fournisseur_id>/', livrer_produit, name='livrer_produit'),
]

