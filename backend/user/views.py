


from rest_framework import generics
from rest_framework.permissions import AllowAny

# from rest_framework.response import Response
# from rest_framework import status

from user.serializers import UserSerializer

from django.contrib.auth.models import User


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]