from rest_framework import serializers
from .models import Fournisseur

class FournisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fournisseur
        fields = '__all__'

    def create(self, validated_data):
        fournisseur = Fournisseur(**validated_data)
        fournisseur.quantite_restante = fournisseur.quantite
        fournisseur.save()
        return fournisseur
