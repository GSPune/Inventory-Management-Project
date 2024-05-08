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

import requests,reportlab,io,json
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
        products = {}
        products.update({"Data":serializer.data})
        #return JsonResponse(serializer.data,safe=False)
        return Response(products,status=status.HTTP_200_OK)

@api_view(['GET'])
def customers(request):
    if request.method == 'GET':
        customers = Customer.objects.all() #database-abstraction API that lets you create, retrieve, update and delete objects
        serializer = CustomerSerializer(customers,many=True)
        #return JsonResponse(serializer.data,safe=False)
        list_customers = {}
        list_customers.update({"Data":serializer.data})
        return Response(list_customers,status=status.HTTP_200_OK)

# A QuerySet represents a collection of objects from your database. It can have zero, one or many filters.
# Filters narrow down the query results based on the given parameters. 
   
# get() is a method that doesn't return a queryset...Returns the object matching the given lookup parameters
@api_view(['POST']) 
def sales_bill(request):
    if request.method == 'POST':
        #Build the response to the sent..should contain order/bill details/summary
        finalOutput = {}
        c = Customer.objects.get(pk=request.data['Customer_id'])
        finalOutput.update({"Customer_Name":str(c.Name)})
        finalOutput.update({"Date":str(date.today())})
        Prod_List = []

        total_amt = 0.00000
        # Decimal(total_amt)
        count = 0
        # print(request.data['Bought_Products']) ... list of dictionaries
        for product in request.data['Bought_Products']:
            prow = {}
            #print(product)...this is a dict
            qty = product['Quantity']
            ID = product['Product_id']
            prev = Products.objects.get(pk = ID)
            prow.update({"Product_Name":prev.Product_name})
            prow.update({"Quantity":qty})
            curr = prev.Quantity
            #Updating the quantities in the products table!
            Products.objects.filter(pk = ID).update(Quantity = curr - qty)
            # prev.update(Quantity = curr - qty) ..won't work as AttributeError: 'Products' object has no attribute 'update'

            count = count + 1
            price = Products.objects.get(pk = ID).Product_price
            prow.update({"Price":price})
            val = price * qty
            prow.update({"Amount":val})
            total_amt = Decimal(total_amt) + val
            Prod_List.append(prow)

        finalOutput.update({"Total":total_amt})
        finalOutput.update({"Summary":Prod_List})
        order_summary = {}
        order_summary.update({"Customer":request.data['Customer_id'],"Total":round(total_amt,3),"Items_Bought":count})
        serializer = OrdersInSerializer(data = order_summary)
        if serializer.is_valid():
            instance = serializer.save()
            # When you call serializer.save(), it returns the saved object instance.
            finalOutput.update({"Bill_id":instance.id})
            # finalOutput = json.dumps(finalOutput)
            if not order_products(instance,request.data['Bought_Products']):
                return Response({"Error":"In Products Data"},status=status.HTTP_400_BAD_REQUEST)
            # return Response(serializer.data,status=status.HTTP_201_CREATED)
            # url = 'http://127.0.0.1:8000/v1/billing/generate-pdf/'
            # api_call = requests.post(url,data=finalOutput) -- How do you send this in the Response()?
            return Response(finalOutput,status=status.HTTP_201_CREATED)
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

@api_view(['POST','GET'])
# def generate_pdf(self,request,queryset):
def generate_pdf(request):
    buf = io.BytesIO()
    #create a canvas
    # The above code creates a canvas object which will generate a PDF file stored in buf in the current
    # working directory. 
    c = canvas.Canvas(buf,pagesize=letter,bottomup=0)
    #Create a text object
    textob =  c.beginText()
    textob.setTextOrigin(inch,inch)
    textob.setFont("Helvetica",14)

    #Add some lines of text
    # lines = [
    #     "This is line 1",
    #     "This is line 2",
    #     "This is line 3",
    # ]

    for line in request.data.values():
        textob.textLine(line)
    
    c.drawText(textob)
    c.showPage()
    c.save()    
    buf.seek(0)

    return FileResponse(buf,as_attachment=True,filename='invoice.pdf')
    # pass
    
