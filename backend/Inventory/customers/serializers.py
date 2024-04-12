from rest_framework import serializers
from .models import Customer

class CustomerSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Customer
        fields = '__all__'
        # fields = ['id','Name', 'Email', 'Mobile']
       

    def create(self,validate_data):
        return Customer.objects.create(**validate_data)