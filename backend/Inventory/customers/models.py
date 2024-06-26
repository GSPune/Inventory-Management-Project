from django.db import models

# Create your models here.
class Customer(models.Model):
    Name = models.CharField(max_length=64)
    # Email = models.EmailField(max_length=254, **options)
    Email = models.EmailField(max_length=254,blank=True,null=True)
    Mobile = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.id}: Name : {self.Name} ,Email : {self.Email}"