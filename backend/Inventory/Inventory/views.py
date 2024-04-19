from .serializers import UserSerializer
from django.http import HttpResponse,JsonResponse
from rest_framework import status,serializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.shortcuts import get_object_or_404
from django.core.mail import send_mail
from rest_framework.authentication import SessionAuthentication
from django.core.exceptions import ObjectDoesNotExist
import base64

@api_view(['POST'])
def login(request):
    authentication_classes = (SessionAuthentication,)
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"Details":"Not Found."},status=status.HTTP_404_NOT_FOUND)
    #token
    #login(request, user)
    serializer = UserSerializer(instance=user)
    return JsonResponse(serializer.data)
    #return Response(serializer.data)


@api_view(['POST'])
def sendemail(request):
    #email = request.data.get('email')
    email = request.data['email']
    send_mail(
    "New Cashier Registration",
    "",
    "settings.EMAIL_HOST_USER",
    [email],
    fail_silently=False,
    html_message= "Here is the link to the sign up page.Email address should already be auto-filled!<br>"
    "<a href=\"http://127.0.0.1:3000/register?email="+str(base64.urlsafe_b64encode(email.encode()),encoding='utf-8')+"\">Click Here!</a>"
    )
    return Response({"Success":"True"},status=status.HTTP_200_OK)

'''Base64 is a binary to a text encoding scheme that represents binary data in an ASCII string 
format — essential for carrying data stored in binary across channels.'''

@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        #testing whether request.data is a dict..Yes
        #print(request.data) -- Decoding Parameter
        request.data['email'] = str(base64.urlsafe_b64decode(request.data['email'].encode()),encoding='utf-8')
        #print(request.data['username'])
        serializer = UserSerializer(data = request.data)
        #print(request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username = request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        return Response({"Registered":"Successfully","id":serializer.data['id'],"username":serializer.data['username']},status=status.HTTP_201_CREATED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST','GET'])
def list_cashiers(request):
    if request.method == 'GET':
        cashiers = User.objects.filter(is_superuser = 0)
        serializer = UserSerializer(cashiers,many=True)
        #return JsonResponse(serializer.data,safe=False)
        return Response(serializer.data,status=status.HTTP_200_OK)

@api_view(['DELETE'])
def delete_api(request):
    if request.method == 'DELETE':
        try:
            u = User.objects.get(id = request.data['id'])
        except KeyError or ObjectDoesNotExist:
            print("Either the user or entry doesn't exist.")
            return Response({"Invalid":"ID"},status=status.HTTP_404_NOT_FOUND)  
        #Ensure that admin is not deleted!
        if u.is_superuser == 0:
            u.delete()
        else:
            return Response({"Invalid":"ID"},status=status.HTTP_404_NOT_FOUND)
        return Response({"Deleted":"Successfully"},status=status.HTTP_204_NO_CONTENT)#return success message
    
@api_view(['PUT'])
def update_api(request):
    if request.method == 'PUT':
        prod = User.objects.get(id = request.data['id'])
        serializer = UserSerializer(prod,data = request.data,partial = True)
    if serializer.is_valid():
        serializer.save()
        return Response({"Updated":"Successfully"},status=status.HTTP_201_CREATED)#return success message
    #else
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
'''
username = request.data['username']
password = request.data['password']

# Check if username and password are correct, returning User object if so
user = authenticate(request, username=username, password=password)

if user:
    login(request, user)
    serializer = UserSerializer(instance=user)
    return Response({serializer.data})
else:
    return Response({"Details":"Not Found."},status=status.HTTP_404_NOT_FOUND)
'''