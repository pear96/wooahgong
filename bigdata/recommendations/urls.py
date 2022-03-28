from django.urls import path
from . import views

app_name = 'recommendations'
urlpatterns = [
    path('forme/', views.forme, name='forme'),
    path('trend/', views.trend, name="trend")
]
