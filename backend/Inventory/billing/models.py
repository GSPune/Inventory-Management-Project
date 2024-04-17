from django.db import models
from suppliers.models import Supplier
from customers.models import *
from products.models import *

# Create your models here... To be further refined/updated
class Orders_In(models.Model):
    Timestamp = models.DateTimeField(auto_now_add=True)
    Customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="Buyer")
    Total = models.DecimalField(max_digits=19, decimal_places=3,null=True,blank=True)
    Items_Bought = models.IntegerField()


    def __str__(self):
        return f"{self.id}: Date:{self.Timestamp},Customer:{self.Customer},Total Amount:{self.Total},Unique Items:{self.Items_Bought}"

class Order_Products(models.Model):
    Order = models.ForeignKey(Orders_In,on_delete=models.CASCADE,related_name="which_products")
    Product = models.ForeignKey(Products,on_delete=models.CASCADE,related_name="which_order")
    Quantity = models.IntegerField()

    def __str__(self):
        return f"{self.id}: Order Id:{self.Order},Product:{self.Product},Quantity:{self.Quantity}"

