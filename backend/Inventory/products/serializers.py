from rest_framework import serializers
from .models import*

class ProductSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Products
        fields = ['Product_name','Product_price','Quantity','Units','Expiry_Date']
        #fields = ['id','username','password','email']

    def create(self,validate_data):
        return Products.objects.create(**validate_data)