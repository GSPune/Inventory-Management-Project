from django.urls import path
from . import views

urlpatterns = [
    path('new-bill/',views.sales_bill),
    path('get-products/',views.products),
    path('get-customers/',views.customers),
    path("generate-pdf/", views.generate_pdf, name="generate-pdf"),
]