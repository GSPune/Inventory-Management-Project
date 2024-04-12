from rest_framework import serializers
from .models import Supplier

class SupplierSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Supplier
        fields = '__all__'
        # fields = ['id','Name', 'Email', 'Mobile']
       

    def create(self,validate_data):
        return Supplier.objects.create(**validate_data)