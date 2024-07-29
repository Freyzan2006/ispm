


from rest_framework import generics
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

# from rest_framework.response import Response
# from rest_framework import status

from user.serializers import UserSerializer

from django.contrib.auth.models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            # добавьте другие поля, которые хотите вернуть
        }) 