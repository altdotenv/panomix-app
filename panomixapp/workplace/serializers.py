from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from . import models

class WorkplaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Workplace
        fields = (
            "id",
            "name"
        )
        extra_kwargs = {
            'name': {'validators': []},
        }
