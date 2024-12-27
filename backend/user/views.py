


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




# class UserView(APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         return Response({
#             'id': user.id,
#             'username': user.username,
#             'is_staff': user.is_staff,  # Добавлено для проверки, является ли пользователь администратором
#             'is_superuser': user.is_superuser  # Добавлено для проверки, является ли пользователь суперпользователем
#             # добавьте другие поля, которые хотите вернуть
#         }) 

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        cache_key = f"user_data_{user.id}"  
        cached_data = cache.get(cache_key)

        if cached_data:
            print("Данные взяты из кеша")
            return Response(cached_data)

        print("Данные отсутствуют в кеше, формируем заново")
        user_data = {
            'id': user.id,
            'username': user.username,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        }

        cache.set(cache_key, user_data, timeout=TIME_SAVE_IN_CACHE)
        return Response(user_data)


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

# class CustomTokenRefreshView(TokenRefreshView):
#     def post(self, request, *args, **kwargs):
#         response = super().post(request, *args, **kwargs)
#         refresh_token = request.data.get('refresh')
#         if refresh_token:
#             try:
#                 token = RefreshToken(refresh_token)
#                 response.set_cookie(
#                     'refresh_token',
#                     refresh_token,
#                     max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
#                     httponly=True,
#                     secure=True,
#                     samesite='None'
#                 )
#             except Exception as e:
#                 return JsonResponse({'detail': str(e)}, status=400)
#         return response



class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.data.get('refresh')
        if not refresh_token:
            return JsonResponse({'detail': 'Refresh token not provided'}, status=400)

        try:
            token = RefreshToken(refresh_token)
            user_id = str(token["user_id"])

            # Проверяем, есть ли токены в Redis
            cached_access_token = cache.get(f'access_token_{user_id}')
            cached_refresh_token = cache.get(f'refresh_token_{user_id}')

            if cached_access_token and cached_refresh_token == refresh_token:
                # Возвращаем токены из кеша
                return JsonResponse({
                    'access': cached_access_token,
                    'refresh': cached_refresh_token,
                })

            # Генерация нового access_token
            response = super().post(request, *args, **kwargs)

            # Сохраняем токены в Redis с TTL
            cache.set(
                f'access_token_{user_id}',
                response.data['access'],
                timeout=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds(),
            )
            cache.set(
                f'refresh_token_{user_id}',
                refresh_token,
                timeout=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),
            )

            # Устанавливаем refresh_token в cookies
            response.set_cookie(
                'refresh_token',
                refresh_token,
                max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds(),
                httponly=True,
                secure=True,
                samesite='None',
            )
            return response
        except Exception as e:
            return JsonResponse({'detail': str(e)}, status=400)