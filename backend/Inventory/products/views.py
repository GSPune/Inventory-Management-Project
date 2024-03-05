from django.http import HttpResponse,JsonResponse
from rest_framework import status,serializers
from .serializers import ProductSerializer 
from .models import Products
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication

# Create your views here.
@api_view(['POST'])
def add_api(request):
    if request.method == 'POST':
        serializer = ProductSerializer(data = request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data,status=status.HTTP_201_CREATED)#return success message
    #else
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def list_api(request):
    pass