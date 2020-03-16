from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer

# User = get_user_model()


# class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
#     serializer_class = UserSerializer
#     queryset = User.objects.all()
#     lookup_field = "username"

#     def get_queryset(self, *args, **kwargs):
#         return self.queryset.filter(id=self.request.user.id)

#     @action(detail=False, methods=["GET"])
#     def me(self, request):
#         serializer = UserSerializer(request.user, context={"request": request})
#         return Response(status=status.HTTP_200_OK, data=serializer.data)

class UserCreateWorkplace(APIView):

    pass

class GetUserWorkplaces(APIView):

    def post(self, request):
        
        if not request.GET.get("workplace"):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        