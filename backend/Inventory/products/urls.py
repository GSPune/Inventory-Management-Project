from django.urls import path
from . import views

urlpatterns = [
    path('add/',views.add_api),
    path('view/',views.list_api),
    path('update/',views.update_api),
    path('delete/',views.delete_api),
    path('stock_alerts/expired',views.expired),
    path('stock_alerts/out',views.out),
]