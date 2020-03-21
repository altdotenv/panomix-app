from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models, serializers

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