
from django.urls import path
from table.views import TableListCreateAPIView, TableDetailAPIView, PublicationTypeCreateAPIView, TableListAPIView, TableDeleteAPIView
# from table.views import AuthorView

urlpatterns = [
    path('', TableListCreateAPIView.as_view(), name='table-list-create'),
  


    path('<int:pk>/', TableDetailAPIView.as_view(), name='table-detail'),

    path("publicType/", PublicationTypeCreateAPIView.as_view(), name = "public-type"),


    path("tableUser/", TableListAPIView.as_view(), name = "table-user"),

    path("delete/<int:pk>/", TableDeleteAPIView.as_view(), name = "delete-table"),
    
    # path("authors/", AuthorView.as_view({"get": "list"}), name = "соавторы")
    
]