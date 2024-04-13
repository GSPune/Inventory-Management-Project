from django.http import HttpResponse,JsonResponse
from rest_framework import status,serializers
from products.serializers import ProductSerializer 
from customers.serializers import CustomerSerializer
from .models import Products,Customer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
# Create your views here.

@api_view(['GET'])
def products(request):
    #Check for out of stock products
    if request.method == 'GET':
        prod = Products.objects.filter(Quantity__gt = 0)
        serializer = ProductSerializer(prod,many=True)
        #return JsonResponse(serializer.data,safe=False)
        return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['GET'])
def customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all() #database-abstraction API that lets you create, retrieve, update and delete objects
        serializer = CustomerSerializer(customers,many=True)
        #return JsonResponse(serializer.data,safe=False)
        return Response(serializer.data,status=status.HTTP_200_OK)