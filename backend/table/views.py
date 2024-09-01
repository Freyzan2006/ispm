

from rest_framework import generics
from table.models import TableModel, PublicationType
from table.serializers import TableModelSerializer, PublicationTypeSerializer, TableUserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import AllowAny

# class TableView(APIView):
#     def get(self, request):
#         data = [{"name": "Hello world !"}]
#         return Response(data)
from rest_framework.permissions import IsAuthenticated
from table.pagination import TablePagination

class TableListCreateAPIView(generics.ListCreateAPIView):
    queryset = TableModel.objects.all().order_by('id') 
    serializer_class = TableModelSerializer
    permission_classes = [AllowAny] 
    pagination_class = TablePagination


class TableDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer


class PublicationTypeCreateAPIView(generics.ListCreateAPIView):
    queryset = PublicationType.objects.all()
    serializer_class = PublicationTypeSerializer
    permission_classes = [AllowAny]


class TableListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TablePagination

    def get_queryset(self):

        
        user = self.request.user
        for_user = self.request.query_params.get('for_user')

        print(for_user)
        if for_user:
            return TableModel.objects.filter(for_user=for_user)
        return TableModel.objects.all()


class TableDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        my_model = self.get_object(pk)
        # Проверка на соответствие владельцу (если необходимо)
        if my_model.owner != request.user:
            return Response({'detail': 'У вас нет прав на удаление этой записи.'}, status=status.HTTP_403_FORBIDDEN)
        my_model.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)