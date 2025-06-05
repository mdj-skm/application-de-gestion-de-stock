from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CommandeSerializer

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
