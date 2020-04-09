from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction

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

class CreateWorkplaceExistingUser(serializers.ModelSerializer):

    class Meta:
        model = models.Workplace
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        workplace = models.Workplace.objects.create(validated_data)
        user = self.context["request"].user
        models.UserWorkPlace(user=user, workplace=workplace, is_admin=True).save()
        return user