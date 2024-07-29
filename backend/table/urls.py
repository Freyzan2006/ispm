
from django.urls import path
from table.views import TableListCreateAPIView, TableDetailAPIView, PublicationTypeCreateAPIView, TableListAPIView

urlpatterns = [
    path('', TableListCreateAPIView.as_view(), name='table-list-create'),
    # path('', TableListAPIView.as_view(), name='table-list-create'),


    path('<int:pk>/', TableDetailAPIView.as_view(), name='table-detail'),

    path("publicType/", PublicationTypeCreateAPIView.as_view(), name = "public-type"),


    path("tableUser", TableListAPIView.as_view(), name = "table-user")
    
]