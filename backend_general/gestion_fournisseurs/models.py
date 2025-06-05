from django.db import models

class Fournisseur(models.Model):
    nom = models.CharField(max_length=100)
    entreprise = models.CharField(max_length=100)
    produit = models.CharField(max_length=100)
    quantite = models.IntegerField()
    email = models.EmailField()
    numero = models.CharField(max_length=20)
    date = models.DateField()

    def __str__(self):
        return self.nom
