from django.contrib import admin
from .models import Products

class Products_Admin(admin.ModelAdmin):
    list_display = ("id", "Product_name", "Product_price", "Quantity","Units","Category","Expiry_Date","Date")
    actions = ["update_products"]
    #change/update feature already available in Django Admin
    @admin.action(description="Update products")
    def update_products(self, request, queryset):
        pass
        # print (request)
        # queryset.update(Product_price=?)

# Register your models here.
admin.site.register(Products,Products_Admin)