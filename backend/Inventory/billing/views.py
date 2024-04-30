from django.http import HttpResponse,JsonResponse,FileResponse
from rest_framework import status,serializers
from products.serializers import ProductSerializer 
from customers.serializers import CustomerSerializer
from .models import Products,Customer
from .serializers import *
from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from decimal import *

import reportlab,io
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
from reportlab.lib.pagesizes import letter
from reportlab.platypus import Table,TableStyle
from reportlab.lib import colors
# Create your views here.

@api_view(['GET'])
def products(request):
    #Check for out of stock products
    if request.method == 'GET':
        prod = Products.objects.filter(Quantity__gt = 0).filter(Expiry_Date__gte = date.today())
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
        finalOutput = {}
        c = Customer.objects.get(pk=request.data['Customer_id'])
        finalOutput.update({"Customer_Name":c.Name})
        finalOutput.update({"Date":date.today})
        # finalOutput.update({"Bought_Products":[]})

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
            instance = serializer.save()
            # When you call serializer.save(), it returns the saved object instance.
            finalOutput.update({"Bill_id":instance.id})
            if not order_products(instance,request.data['Bought_Products']):
                return Response({"Error":"In Products Data"},status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        #else
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

def order_products(model_object,products_info):
    flag = True
    ID = model_object.id
    for product in products_info:
        qty = product['Quantity']
        prod_id = product['Product_id']
        order_products = {}
        order_products.update({"Order":ID,"Product":prod_id,"Quantity":qty})
        serializer = OrderProductsSerializer(data = order_products)
        if serializer.is_valid():
            serializer.save()
            # return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            flag = False
            break
    return flag

@api_view(['GET'])
# def generate_pdf(self,request,queryset):
def generate_pdf(request):
    buf = io.BytesIO()
    #create a canvas
    c = canvas.Canvas(buf,pagesize=letter,bottomup=0)
    #Create a text object
    textob =  c.beginText()
    textob.setTextOrigin(inch,inch)
    textob.setFont("Helvetica",14)

    #Add some lines of text
    lines = [
        "This is line 1",
        "This is line 2",
        "This is line 3",
    ]

    for line in lines:
        textob.textLine(line)
    
    c.drawText(textob)
    c.showPage()
    c.save()    
    buf.seek(0)

    return FileResponse(buf,as_attachment=True,filename='invoice.pdf')
    # pass
    
