from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from . import models, serializers

class CheckWorkplace(APIView):

    def get(self, request, workplace):

        if not workplace:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        try:
            found_workplace = models.Workplace.objects.get(name=workplace)
        except models.Workplace.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serialized = serializers.WorkplaceSerializer(found_workplace)

        return Response(serialized.data, status=status.HTTP_200_OK)
