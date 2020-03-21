from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import serializers

import logging
import json
logger = logging.getLogger()

class UserSignup(APIView):

    permission_classes = [AllowAny] 

    def post(self, request):

        data = request.data
        if set(['name', 'email', 'password', 'workplace']) != set(data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        workplace_name = data["workplace"]
        data.update({"workplace":{"name":workplace_name}})
        serialized = serializers.UserSerializer(data=data, context={'request':request})

        if serialized.is_valid():
            serialized.save()
            return Response({"result":"success"}, status=status.HTTP_201_CREATED)
        else:
            logging.error(serialized.errors)
            if serialized.errors.get("workplace") and serialized.errors.get("email"):
                return Response({"result":"workplace email exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            elif serialized.errors.get("workplace"):
                return Response({"result":"workplace exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            elif serialized.errors.get("email"):
                return Response({"result":"email exists"}, status=status.HTTP_406_NOT_ACCEPTABLE)
            else:
                return Response(status=status.HTTP_400_BAD_REQUEST)

class GoogleLogin(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        data = request.data
        print(data)

class GetUserWorkplaces(APIView):

    def post(self, request):
        
        if not request.GET.get("workplace"):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        