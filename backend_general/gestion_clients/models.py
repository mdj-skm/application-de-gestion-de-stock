from django.db import models

class Client(models.Model):
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    telephone = models.CharField(max_length=20)
    adresse = models.TextField()
    email = models.EmailField(blank=True, null=True)
    profession = models.CharField(max_length=100, blank=True, null=True)
    sexe = models.CharField(max_length=10, choices=[('Homme', 'Homme'), ('Femme', 'Femme')])
    dateInscription = models.DateField()
    produitsAchetes = models.TextField(blank=True, null=True)
    montantTotal = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    nomVendeur = models.CharField(max_length=100)
    modePaiement = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.nom} {self.prenom}"
