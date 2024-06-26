"""
URL configuration for Inventory project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include,re_path
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from . import views

urlpatterns = [
    path('admin/', admin.site.urls), #admin inbuilt
    path('v1/products/',include("products.urls")),
    path('v1/customers/',include("customers.urls")),
    path('v1/suppliers/',include("suppliers.urls")),
    path('v1/billing/',include("billing.urls")),
    path('v1/login/',views.login),
    path('v1/addcashier/',views.sendemail),
    path('v1/signup/',views.register),#add cashiers!
    path('v1/listcashiers/',views.list_cashiers),
    path('v1/deletecashiers/',views.delete_api),
    path('v1/updatecashiers/',views.update_api),
]
