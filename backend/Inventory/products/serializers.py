from rest_framework import serializers
from .models import Products

class ProductSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Products
        fields = ['Product_name','Product_price','Quantity','Units','Expiry_Date']
        #fields = ['id','username','password','email']

    #For Adding new Prodcuts
    def create(self,validate_data):
        return Products.objects.create(**validate_data)