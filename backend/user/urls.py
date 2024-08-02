
from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from user.views import RegisterView, UserView, UserListView

urlpatterns = [
    path("", UserView.as_view(), name = "user_view"),

    path("allUsers/", UserListView.as_view(), name = "all_users"),

    path("register/", RegisterView.as_view(), name = "register"),
    path("token/", TokenObtainPairView.as_view(), name = "token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name = "token_refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name = "token_verify"),
]