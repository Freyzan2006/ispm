

from rest_framework import generics
from table.models import TableModel, PublicationType
from table.serializers import TableModelSerializer, PublicationTypeSerializer, TableUserSerializer



# class TableView(APIView):
#     def get(self, request):
#         data = [{"name": "Hello world !"}]
#         return Response(data)
from rest_framework.permissions import IsAuthenticated

class TableListCreateAPIView(generics.ListCreateAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer
    permission_classes = [IsAuthenticated] 


class TableDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer


class PublicationTypeCreateAPIView(generics.ListCreateAPIView):
    queryset = PublicationType.objects.all()
    serializer_class = PublicationTypeSerializer


class TableListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        
        user = self.request.user
        for_user = self.request.query_params.get('for_user')

        print(for_user)
        if for_user:
            return TableModel.objects.filter(for_user=for_user)
        return TableModel.objects.all()