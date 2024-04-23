from django.shortcuts import render
from rest_framework import status,serializers
from .serializers import CustomerSerializer 
# from datetime import date
from .models import Customer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
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


@api_view(['GET'])
def list_api(request):
    if request.method == 'GET':
        customers = Customer.objects.all() #database-abstraction API that lets you create, retrieve, update and delete objects
        serializer = CustomerSerializer(customers,many=True)
        #return JsonResponse(serializer.data,safe=False)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
@api_view(['PUT'])
def update_api(request):
    if request.method == 'PUT':
        c = Customer.objects.get(id = request.data['id'])
        serializer = CustomerSerializer(c,data = request.data,partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response({"Updated":"Successfully"},status=status.HTTP_201_CREATED)#return success message
    #else
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_api(request):
    if request.method == 'DELETE':
        try:
            c = Customer.objects.get(id = request.data['id'])
        except KeyError or ObjectDoesNotExist:
            print("Either the customer or entry doesn't exist.")
            return Response({"Invalid":"ID"},status=status.HTTP_404_NOT_FOUND)
        
        c.delete()
        return Response({"Deleted":"Successfully"},status=status.HTTP_204_NO_CONTENT)#return success message
         