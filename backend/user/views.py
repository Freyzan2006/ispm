


from rest_framework import generics
from rest_framework.permissions import AllowAny

from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response


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
            'is_staff': user.is_staff,  # Добавлено для проверки, является ли пользователь администратором
            'is_superuser': user.is_superuser  # Добавлено для проверки, является ли пользователь суперпользователем
            # добавьте другие поля, которые хотите вернуть
        }) 


from django.core.cache import cache
from django.views.decorators.cache import cache_page
from config.cache import TIME_SAVE_IN_CACHE
from django.utils.decorators import method_decorator

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    @method_decorator(cache_page(TIME_SAVE_IN_CACHE)) 
    def get(self, request, *args, **kwargs):
        response = super().get(request, *args, **kwargs)
        return response


from django.conf import settings
from django.http import JsonResponse
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        refresh_token = request.data.get('refresh')
        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                response.set_cookie(
                    'refresh_token',
                    refresh_token,
                    max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    httponly=True,
                    secure=True,
                    samesite='None'
                )
            except Exception as e:
                return JsonResponse({'detail': str(e)}, status=400)
        return response