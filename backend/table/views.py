

from rest_framework import generics
from table.models import TableModel, PublicationType
from table.serializers import TableModelSerializer, PublicationTypeSerializer



# class TableView(APIView):
#     def get(self, request):
#         data = [{"name": "Hello world !"}]
#         return Response(data)


class TableListCreateAPIView(generics.ListCreateAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer

class TableDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer


class PublicationTypeCreateAPIView(generics.ListCreateAPIView):
    queryset = PublicationType.objects.all()
    serializer_class = PublicationTypeSerializer
