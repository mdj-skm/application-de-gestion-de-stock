from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import UtilisateurConfiguration  # adapte ce chemin selon ton projet


class UtilisateurConfigurationSerializer(serializers.ModelSerializer):
    motDePasse = serializers.CharField(source='mot_de_passe', write_only=True)

    class Meta:
        model = UtilisateurConfiguration
        fields = ['id', 'nom', 'motDePasse', 'email', 'role', 'telephone', 'modules']
        extra_kwargs = {
            'motDePasse': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['mot_de_passe'] = make_password(validated_data['mot_de_passe'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'mot_de_passe' in validated_data:
            validated_data['mot_de_passe'] = make_password(validated_data['mot_de_passe'])
        return super().update(instance, validated_data)


REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
