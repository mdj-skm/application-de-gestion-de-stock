from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/commandes/', include('gestion_commandes.urls')),  # ici on inclut l'app gestion_commandes
]
