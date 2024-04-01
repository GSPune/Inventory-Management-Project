from django.shortcuts import render
from rest_framework import status,serializers
from .serializers import CustomerSerializer 
# from datetime import date
from .models import Customer
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

# Create your views here.
@api_view(['POST'])
def add_customer(request):
    if request.method == 'POST':
        #Customer (De)serializer converts json data to a (python) model instance
        serializer = CustomerSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"Added":"Successfully","id":serializer.data['id'],"name":serializer.data['Name']}
                        ,status=status.HTTP_201_CREATED)#return success message
    #else
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
