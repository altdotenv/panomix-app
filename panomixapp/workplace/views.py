from django.conf import settings
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models, serializers

import requests
import json

class CheckWorkplace(APIView):

    permission_classes = [AllowAny] 

    def get(self, request, workplace):

        if not workplace:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        found_workplace = models.Workplace.objects.filter(name=workplace)

        serialized = serializers.WorkplaceSerializer(found_workplace, many=True)
        if serialized.data:
            return Response(serialized.data[0], status=status.HTTP_200_OK)
        
        return Response(status=status.HTTP_404_NOT_FOUND)


class ConnectSlack(APIView):

    def post(self, request):

        if set(['workplace', 'code']) != set(request.data.keys()):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        payload = {
            'client_id': settings.SLACK_CLIENT_ID,
            'client_secret': settings.SLACK_CLIENT_SECRET,
            'code': request.data["code"]
        }
        r = requests.get('https://slack.com/api/oauth.access', params=payload)
        data = json.loads(r.text)
        print(data)

        if data.get('ok') == True:
            return Response(status=status.HTTP_200_OK)
