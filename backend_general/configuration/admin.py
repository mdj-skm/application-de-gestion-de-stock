from django.contrib import admin
from .models import UtilisateurConfiguration

@admin.register(UtilisateurConfiguration)
class UtilisateurConfigurationAdmin(admin.ModelAdmin):
    list_display = ('nom', 'email', 'role', 'telephone')
    search_fields = ('nom', 'email', 'role')
    list_filter = ('role',)
