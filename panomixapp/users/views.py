from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.http import HttpResponse
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.shortcuts import redirect
from . import serializers, models, tokens

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
            "password": models.User.objects.make_random_password(),
            "is_active": True
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
            return Response(content, status=status.HTTP_400_BAD_REQUEST)

        user = models.User.objects.filter(email=data["email"], userworkplace__workplace__name=workplace)

        # 이미 존재하는 유저
        if user:
            user = user[0]
            if user.is_active:
                token = RefreshToken.for_user(user)
                response = {
                    "email": user.email,
                    "access_token": str(token.access_token),
                    "refresh_token": str(token),
                    "workplace": workplace
                }
                return Response(response, status=status.HTTP_200_OK)
            # 호스트가 accept하지 않은 유저
            else:
                response = {
                    "email": user.email
                }
                return Response(response, status=status.HTTP_202_ACCEPTED)
        # 처음 로그인하는 유저 workplace에 저장 되어있지 않다. host가 accept해야 is_active = True
        else:
            data = {
                "name": data["name"],
                "email": data["email"],
                "workplace": {"name":workplace},
                "password": models.User.objects.make_random_password(),
                "is_active": False
            }
            serialized = serializers.LoginUserSerializer(data=data, context={'request':request})
            #유저 저장하지만 아직 Host에 의해 Accept되지 않음
            if serialized.is_valid():
                user = serialized.save()
                response = {}
                response['email'] = user.email
                return Response(response, status=status.HTTP_201_CREATED)
            else:
                logging.error(serialized.errors)
                return Response(status=status.HTTP_400_BAD_REQUEST)


class SendEmailToHost(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        print(request.data)

        if set(['workplace', 'email']) != set(request.data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            admin_user = models.User.objects.filter(userworkplace__workplace__name=request.data['workplace'], userworkplace__is_admin=True)
            admin_user = admin_user[0]
        except IndexError:
            return Response({"message" : "Workplace Host not Exist."}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = models.User.objects.filter(email=request.data["email"])
            user = user[0]
        except IndexError:
            return Response({"message" : "User not exist"}, status=status.HTTP_400_BAD_REQUEST)

        # current_site = get_current_site(request)
        subject = "Panomix Request Mail"
        context = {
            "user_email": request.data['email'],
            'domain': request.META["HTTP_HOST"],
            'uid':urlsafe_base64_encode(force_bytes(user.pk)),
            'token': tokens.account_activation_token.make_token(user)
        }
        html_message = render_to_string('email/request_to_host.html', context)
        to_email = admin_user.email
        
        send_mail(subject, html_message, "info@panomix.io", [to_email], fail_silently=False, html_message=html_message)

        return Response(status=status.HTTP_200_OK)

class ActivateUser(APIView):

    permission_classes = [AllowAny]

    def get(self, request, uid=None, token=None):
        
        if not uid or not token:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = force_text(urlsafe_base64_decode(uid))
            user = models.User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, models.User.DoesNotExist):
            user = None
        if user is not None and tokens.account_activation_token.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect("/login/success")
        else:
            return HttpResponse('Activation link is invalid!')