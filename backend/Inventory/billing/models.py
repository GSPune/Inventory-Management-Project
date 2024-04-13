from django.db import models
from suppliers.models import Supplier
from customers.models import *
from products.models import *

# Create your models here... To be further refined/updated
class Orders_In(models.Model):
    Date = models.DateField(auto_now=True)
    Customer = models.ForeignKey(Customer,on_delete=models.CASCADE,related_name="Buyer")

    def __str__(self):
        return f"{self.id}: Date:{self.Date},Customer:{self.Customer}"

class Order_Products(models.Model):
    Order = models.ForeignKey(Orders_In,on_delete=models.CASCADE,related_name="which_products")
    Product = models.ForeignKey(Products,on_delete=models.CASCADE,related_name="which_order")
    Quantity = models.IntegerField()

    def __str__(self):
        return f"{self.id}: Order Id:{self.Order},Product:{self.Product},Quantity:{self.Quantity}"

