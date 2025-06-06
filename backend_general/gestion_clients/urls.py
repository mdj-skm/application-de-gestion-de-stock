from django.urls import path
from . import views

urlpatterns = [
    path('', views.client_list),                     # plus de "clients/"
    path('<int:id>/', views.client_detail),
]
