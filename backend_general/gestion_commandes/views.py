from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommandeSerializer

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Commande
from gestion_fournisseurs.models import Fournisseur
from django.http import JsonResponse

class CommandeCreateView(APIView):
    def post(self, request):
        print("Données reçues :", request.data)
        serializer = CommandeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            print("Commande enregistrée avec succès")
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("Erreurs de validation :", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Exemple Django view pour livrer une commande
@api_view(['PUT'])
def livrer_commande(request, numero_commande):
    try:
        commande = Commande.objects.get(numero_commande=numero_commande)
        commande.statut = 'Livrée'
        commande.save()
        return Response({'message': 'Commande livrée avec succès.'}, status=200)
    except Commande.DoesNotExist:
        return Response({'message': 'Commande non trouvée.'}, status=404)


    

