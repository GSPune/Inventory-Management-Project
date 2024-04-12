from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.add_api),
    path('view/',views.list_api),
    path('update/',views.update_api),
    path('delete/',views.delete_api),
    path('alerts/expired',views.expired),
    path('alerts/out',views.out),
    path('alerts/low',views.low)
]