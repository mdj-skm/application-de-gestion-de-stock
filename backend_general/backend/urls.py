from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/commandes/', include('gestion_commandes.urls')),
    path('api/fournisseurs/', include('gestion_fournisseurs.urls')),
    path('api/clients/', include('gestion_clients.urls')),
]
