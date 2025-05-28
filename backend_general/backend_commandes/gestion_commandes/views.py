# gestion_commandes/views.py

from rest_framework import generics
from .models import Commande
from .serializers import CommandeSerializer

class CommandeCreateView(generics.CreateAPIView):
    queryset = Commande.objects.all()
    serializer_class = CommandeSerializer
