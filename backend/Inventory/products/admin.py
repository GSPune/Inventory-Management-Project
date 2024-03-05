from django.contrib import admin
from .models import Products

class Products_Admin(admin.ModelAdmin):
    list_display = ("id", "Product_name", "Product_price", "Quantity","Units","Expiry_Date","Date")
# Register your models here.
admin.site.register(Products,Products_Admin)