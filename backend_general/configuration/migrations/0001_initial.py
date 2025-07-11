# Generated by Django 5.2.1 on 2025-06-09 16:57

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UtilisateurConfiguration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nom', models.CharField(max_length=100)),
                ('mot_de_passe', models.CharField(max_length=128)),
                ('email', models.EmailField(max_length=254)),
                ('role', models.CharField(max_length=50)),
                ('telephone', models.CharField(max_length=20)),
                ('modules', models.JSONField(default=list)),
            ],
        ),
    ]
