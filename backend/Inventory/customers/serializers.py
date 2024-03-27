from rest_framework import serializers
from django.contrib.auth.models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta(object):
        # model = Customer
        fields = ['id','username','is_superuser','email']
        #fields = ['id','username','password','email']
        #fields = ['all']

    def create(self,validate_data):
        pass
        # return Customer.objects.create(**validate_data)