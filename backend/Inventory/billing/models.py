from django.db import models
from suppliers.models import Supplier
from customers.models import *
from products.models import *

# Create your models here... To be further refined/updated
class Orders_In(models.Model):
    Date = models.DateField(auto_now=True)
    Customer_id = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="Buyer")

class Order_Products(models.Model):
    Order_id = models.ForeignKey(Orders_In,on_delete=models.CASCADE,related_name="which_orders")
    Product_id = models.ForeignKey(Products,on_delete=models.CASCADE)
    Quantity = models.IntegerField()