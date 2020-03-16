from rest_framework import serializers
from . import models

class WorkplaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.Workplace
        fields = (
            "id",
            "name"
        )
