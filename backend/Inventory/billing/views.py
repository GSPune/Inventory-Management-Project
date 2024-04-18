from django.http import HttpResponse,JsonResponse
from rest_framework import status,serializers
from products.serializers import ProductSerializer 
from customers.serializers import CustomerSerializer
from .models import Products,Customer
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from decimal import *
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

# A QuerySet represents a collection of objects from your database. It can have zero, one or many filters.
# Filters narrow down the query results based on the given parameters.    
@api_view(['POST'])
def sales_bill(request):
    if request.method == 'POST':
        total_amt = 0.00000
        # Decimal(total_amt)
        count = 0
        # print(request.data['Bought_Products']) ... list of dictionaries
        for product in request.data['Bought_Products']:
            #print(product)...this is a dict
            qty = product['Quantity']
            ID = product['Product_id']
            prev = Products.objects.get(pk = ID)
            curr = prev.Quantity
            #Updating the quantities in the products table!
            Products.objects.filter(pk = ID).update(Quantity = curr - qty)
            # prev.update(Quantity = curr - qty) ..won't work as AttributeError: 'Products' object has no attribute 'update'

            count = count + 1
            price = Products.objects.get(pk = ID).Product_price
            val = price * qty
            total_amt = Decimal(total_amt) + val

        order_summary = {}
        order_summary.update({"Customer":request.data['Customer_id'],"Total":round(total_amt,3),"Items_Bought":count})
        serializer = OrdersInSerializer(data = order_summary)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        #else
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


    
