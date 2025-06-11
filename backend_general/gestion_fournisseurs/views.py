

from rest_framework import generics
from .models import Fournisseur
from .serializers import FournisseurSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Créer ou lister les fournisseurs
class FournisseurListCreateView(generics.ListCreateAPIView):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

# Afficher, modifier ou supprimer un fournisseur spécifique
class FournisseurRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fournisseur.objects.all()
    serializer_class = FournisseurSerializer

@api_view(['PUT'])
def livrer_produit(request, fournisseur_id):
    try:
        fournisseur = Fournisseur.objects.get(id=fournisseur_id)
    except Fournisseur.DoesNotExist:
        return Response({'message': 'Fournisseur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

    quantite_livree = request.data.get('quantite_livree')

    if quantite_livree is None:
        return Response({'message': 'Quantité livrée manquante'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        quantite_livree = int(quantite_livree)
    except ValueError:
        return Response({'message': 'Quantité invalide'}, status=status.HTTP_400_BAD_REQUEST)

    if quantite_livree > fournisseur.quantite_restante:
        return Response({'message': 'Quantité livrée supérieure au stock restant'}, status=status.HTTP_400_BAD_REQUEST)

    fournisseur.quantite_restante -= quantite_livree
    fournisseur.save()

    return Response({'message': 'Stock mis à jour', 'quantite_restante': fournisseur.quantite_restante}, status=status.HTTP_200_OK)