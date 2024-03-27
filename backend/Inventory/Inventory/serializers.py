#DRF’s Serializers convert model instances to Python
#dictionaires, which can then be rendered in various API appropriate formats - like JSON

'''A ModelSerializer is a subclass of the Serializer class that provides a shortcut for 
  creating serializers that deal with model instances and querysets. It is a great tool 
  for generating JSON output directly from the database model, and 
  for creating new model instances from JSON input.

  The Meta class within the serializer class specifies the model to be serialized &
  the fields to be included in the serialized output.'''

from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ['id','username','is_superuser','email']
        #fields = ['id','username','password','email']
        #fields = ['all']

    def create(self,validate_data):
        return User.objects.create(**validate_data)




