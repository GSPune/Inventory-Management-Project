from django.db import models

# Create your models here.
class Products(models.Model):
    Product_name = models.CharField(max_length=64)
    Product_price = models.DecimalField(max_digits=19, decimal_places=5)
    Quantity = models.IntegerField()
    Units = models.CharField(max_length=64)
    Expiry_Date = models.DateField()
    Date = models.DateField(auto_now=True)
    #Category = models.CharField(max_length=64) ...got to delete DB entries before running

    def __str__(self):
        return f"{self.id}: {self.Product_name} , {self.Product_price} , {self.Quantity}"