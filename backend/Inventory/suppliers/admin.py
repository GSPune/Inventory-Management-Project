from django.contrib import admin
from .models import Supplier

class Supplier_Admin(admin.ModelAdmin):
    list_display = ("id", "Name", "Email", "Mobile")
# Register your models here.
admin.site.register(Supplier,Supplier_Admin)
