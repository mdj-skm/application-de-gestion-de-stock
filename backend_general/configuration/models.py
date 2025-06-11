from django.db import models
from django.contrib.auth.hashers import make_password, check_password

class UtilisateurConfiguration(models.Model):
    nom = models.CharField(max_length=150, unique=True)
    mot_de_passe = models.CharField(max_length=128)  # Stockage du hash
    email = models.EmailField()
    role = models.CharField(max_length=50)
    telephone = models.CharField(max_length=20)
    modules = models.JSONField(default=list)  # Liste des modules

    def set_password(self, raw_password):
        self.mot_de_passe = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.mot_de_passe)

    def __str__(self):
        return self.nom
