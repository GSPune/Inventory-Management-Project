from django.db import models

# Create your models here.
class Products(models.Model):
    Product_name = models.CharField(max_length=100)
    Product_price = models.DecimalField()
    Quantity = models.IntegerField()
    Expiry_Date = models.DateField()
    Date = models.DateField()