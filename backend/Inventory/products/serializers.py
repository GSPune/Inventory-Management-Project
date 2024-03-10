from rest_framework import serializers
from .models import Products

class ProductSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = Products
        fields = ['id','Product_name','Product_price','Quantity','Units','Expiry_Date','Category','Date']
        #fields = ['id','username','password','email']

    #For Adding new Prodcuts
    def create(self,validate_data):
        return Products.objects.create(**validate_data)
    
    def update(self,instance,validated_data):
        instance.Product_name = validated_data.get('Product_name',instance.Product_name)
        instance.Product_price = validated_data.get('Product_price',instance.Product_price)
        instance.Quantity = validated_data.get('Quantity',instance.Quantity)
        instance.Expiry_Date = validated_data.get('Expiry_Date',instance.Expiry_Date)
        instance.Units = validated_data.get('Units',instance.Units)
        instance.Category = validated_data.get('Category',instance.Category)
        instance.save()
        return instance
    