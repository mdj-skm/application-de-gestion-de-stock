from django.urls import path
from .views import FournisseurListCreateView, FournisseurRetrieveUpdateDestroyView

urlpatterns = [
    path('', FournisseurListCreateView.as_view(), name='liste_fournisseurs'),
    path('<int:pk>/', FournisseurRetrieveUpdateDestroyView.as_view(), name='detail_fournisseur'),
]
