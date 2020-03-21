from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.db import transaction

from panomixapp.workplace import models as workplace_models
from panomixapp.workplace import serializers as workplace_serializers
from . import models

class UserSerializer(serializers.ModelSerializer):

    workplace = workplace_serializers.WorkplaceSerializer()

    name = serializers.CharField(required=True, write_only=True)
    email = serializers.EmailField(validators=[UniqueValidator(queryset=models.User.objects.all())])
    password = serializers.CharField(required=True, write_only=True)


    class Meta:
        model = models.User
        fields = "__all__"

    @transaction.atomic
    def create(self, validated_data):
        print(validated_data)
        workplace_data = validated_data.pop("workplace")
        print(validated_data)
        
        user = models.User.objects.create(**validated_data)
        workplace = workplace_models.Workplace.objects.create(**workplace_data)
        workplace_models.UserWorkPlace(user=user, workplace=workplace, is_admin=True).save()
        workplace.save()
        user.save()
        return user
        