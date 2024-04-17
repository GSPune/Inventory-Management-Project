from django.contrib import admin
from .models import *
# Register your models here.


class Orders_In_Admin(admin.ModelAdmin):
    list_display = ("id","Customer","Timestamp","Items_Bought")
# Register your models here.
admin.site.register(Orders_In,Orders_In_Admin)

class Order_Product_Admin(admin.ModelAdmin):
    list_display = ("id","Order","Product","Quantity")
# Register your models here.
admin.site.register(Order_Products,Order_Product_Admin)