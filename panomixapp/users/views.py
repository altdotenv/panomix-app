from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

from . import serializers, models

import logging
import json
import requests

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

class GoogleSignup(APIView):

    permission_classes = [AllowAny] 

    def post(self, request):

        if set(['workplace', 'result']) != set(request.data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        result = request.data.get("result")
        workplace = request.data.get("workplace")
        payload = {'access_token': result["accessToken"]}
        r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(r.text)

        if "error" in data:
            content = {'message': 'wrong google token / this google token is already expired.'}
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)

        data = {
            "name": data["name"],
            "email": data["email"],
            "workplace": {"name":workplace},
            "password": models.User.objects.make_random_password()
        }
        serialized = serializers.UserSerializer(data=data, context={'request':request})

        if serialized.is_valid():
            user = serialized.save()
            token = RefreshToken.for_user(user)
            response = {}
            response['email'] = user.email
            response['access_token'] = str(token.access_token)
            response['refresh_token'] = str(token)
            response['workplace'] = workplace
            return Response(response, status=status.HTTP_201_CREATED)
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

        if set(['workplace', 'result']) != set(request.data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        result = request.data.get("result")
        workplace = request.data.get("workplace")
        payload = {'access_token': result["accessToken"]}
        r = requests.get('https://www.googleapis.com/oauth2/v2/userinfo', params=payload)
        data = json.loads(r.text)

        if "error" in data:
            content = {'message': 'Wrong Token'}
            return Response(content, status=status.HTTP_401_UNAUTHORIZED)
        try:
            user = models.User.objects.filter(email=data["email"], userworkplace__workplace__name=workplace)
            user = user[0]
        except IndexError:
            return Response({"message" : "Unauthorized User"}, status=status.HTTP_401_UNAUTHORIZED)

        token = RefreshToken.for_user(user)
        response = {}
        response['email'] = user.email
        response['access_token'] = str(token.access_token)
        response['refresh_token'] = str(token)
        response['workplace'] = workplace
        return Response(response, status=status.HTTP_200_OK)


class GetUserWorkplaces(APIView):

    def post(self, request):
        
        if not request.GET.get("workplace"):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        