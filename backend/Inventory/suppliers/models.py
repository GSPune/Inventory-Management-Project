from django.db import models
from django.contrib.auth.models import User

#changing the User table email field
User._meta.get_field('email')._unique = True
#delete the duplicate email entries first before migration!!!

# Create your models here.
class Supplier(models.Model):
    Name = models.CharField(max_length=64)
    # Email = models.EmailField(max_length=254, **options)
    Email = models.EmailField(max_length=254,unique=True)
    Mobile = models.CharField(max_length=12)

    def __str__(self):
        return f"{self.id}: Name : {self.Name} ,Email : {self.Email}"