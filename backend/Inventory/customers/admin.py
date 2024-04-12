from django.contrib import admin
from .models import Customer

class Customer_Admin(admin.ModelAdmin):
    list_display = ("id", "Name", "Email", "Mobile")
# Register your models here.
admin.site.register(Customer,Customer_Admin)
