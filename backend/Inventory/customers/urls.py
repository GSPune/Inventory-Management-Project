from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.add_customer),
    path('list/',views.list_api)
]