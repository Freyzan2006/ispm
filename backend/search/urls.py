
from django.urls import path

from search.views import SearchListAPIView

urlpatterns = [
    path("", SearchListAPIView.as_view(), name = "search")
]
