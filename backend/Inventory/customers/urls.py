from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.add_customer),
    path('list/',views.list_api),
    path('update/',views.update_api),
    path('delete/',views.delete_api),
]