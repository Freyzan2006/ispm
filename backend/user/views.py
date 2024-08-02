


from rest_framework import generics
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response

# from rest_framework.response import Response
# from rest_framework import status

from django.contrib.auth.models import User

from user.serializers import UserSerializer




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

# from user.models import UserModel

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        print("Response data:", response.data)  # Добавьте отладочную информацию
        return response
