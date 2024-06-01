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
    buffer = io.BytesIO()
    #create a canvas
    # The above code creates a canvas object which will generate a PDF file stored in buf in the current
    # working directory. 
    c = canvas.Canvas(buffer,pagesize=letter,bottomup=0)
    #Create a text object
    textob =  c.beginText()
    # textob.setTextOrigin(3*inch,1*inch)
    textob.setFont("Helvetica-Bold",18)

    page_width = 8.5 * inch
    text = "INVENTO XYZ"
    text_width = len(text) * 18  # Assuming font size 14
    x_center = ((page_width - text_width) / 2) - 12
    textob.setTextOrigin(x_center, inch)

    # Add some lines of text
    lines = [
        "           INVENTO XYZ",
        "    Kalyani Nagar,Pune,MH",
        # "This is line 3",
    ]

    for l in lines:
        textob.textLine(l)

    textob.setFont("Helvetica",14)
    textob.textLine("")
    textob.setTextOrigin(1*inch,textob.getY())


    data = []
    for k,v in request.data.items():
        if (k != "Summary"):
            textob.textLine(k+": "+str(v))
            textob.textLine("")
        else:
            for item in v:
                drow = []
                for val in item.values():
                    drow.append(str(val))
                data.append(drow)
            # textob.textLine(v)
    data.append(['Product Name','Quantity','Price','Amount'])
    # print(data)

    table = Table(data,colWidths=[120, 120, 120, 120])

    table.setStyle(TableStyle([
    ('BACKGROUND', (0, -1), (-1, -1), colors.gray),  # Header row background color
    ('TEXTCOLOR', (0, -1), (-1, -1), colors.whitesmoke),  # Header text color
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),  # Center-align all cells
    ('BOTTOMPADDING', (0, 0), (-1, -1), 15),  # Center-align all cells
    ('INNERGRID', (0, 0), (-1, -1), 0.25, colors.black),  # Grid lines
    ('BOX', (0, 0), (-1, -1), 0.5, colors.black),  # Cell borders
]))

    textob.textLine("")
    # Draw the table on the canvas
    table.wrapOn(c, 2*inch, inch)  # Set the table width and height
    table.drawOn(c, textob.getX(), textob.getY())  # Set the position (x, y) on the canvas

    c.drawText(textob)
    c.showPage()
    c.save()    
    buffer.seek(0)

    return FileResponse(buffer,as_attachment=True,filename='invoice.pdf')
    # pass

    
# sudo service mysql start
# python3 manage.py runserver 0:8000