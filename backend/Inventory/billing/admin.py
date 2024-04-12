from django.contrib import admin
from .models import *
# Register your models here.


class Orders_In_Admin(admin.ModelAdmin):
    list_display = ("Customer_id","Date")
# Register your models here.
admin.site.register(Orders_In,Orders_In_Admin)

class Order_Products_Admin(admin.ModelAdmin):
    list_display = ("Order_id","Product_id","Quantity")
# Register your models here.
admin.site.register(Order_Products,Order_Products_Admin)