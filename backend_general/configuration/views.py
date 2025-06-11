from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from .models import UtilisateurConfiguration
from .serializers import UtilisateurConfigurationSerializer

class UtilisateurConfigurationViewSet(viewsets.ModelViewSet):
    queryset = UtilisateurConfiguration.objects.all()
    serializer_class = UtilisateurConfigurationSerializer
    # ❌ Supprimer perform_create et perform_update : gérés par serializer

@api_view(['POST'])
def login_custom_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = UtilisateurConfiguration.objects.get(nom=username)
        if check_password(password, user.mot_de_passe):
            return Response({
                'message': 'Login successful',
                'user': {
                    'nom': user.nom,
                    'email': user.email,
                    'role': user.role,
                    'telephone': user.telephone,
                    'modules': user.modules,
                }
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)
    except UtilisateurConfiguration.DoesNotExist:
        return Response({'message': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
