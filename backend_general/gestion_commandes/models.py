# gestion_commandes/models.py

from django.db import models

class Commande(models.Model):
    numero_commande = models.CharField(max_length=100)
    produit = models.CharField(max_length=100)
    categorie = models.CharField(max_length=100)
    quantite = models.IntegerField()
    prix_unitaire = models.IntegerField()
    prix_total = models.IntegerField()
    date_commande = models.DateTimeField()
