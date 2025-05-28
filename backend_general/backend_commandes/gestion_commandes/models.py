# gestion_commandes/models.py

from django.db import models

class Commande(models.Model):
    numero_commande = models.CharField(max_length=20, unique=True)
    produit = models.CharField(max_length=100)
    categorie = models.CharField(max_length=50)
    quantite = models.IntegerField()
    prix_unitaire = models.FloatField()
    prix_total = models.FloatField()
    date = models.CharField(max_length=100)

    def __str__(self):
        return self.numero_commande
