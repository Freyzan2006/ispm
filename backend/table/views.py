

from rest_framework import generics
from table.models import TableModel, PublicationType
from table.serializers import TableModelSerializer, PublicationTypeSerializer, TableUserSerializer

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import AllowAny


from rest_framework.permissions import IsAuthenticated
from table.pagination import TablePagination

from table.permission import ReadOnly


from django.core.cache import cache
from django.views.decorators.cache import cache_page
from config.cache import TIME_SAVE_IN_CACHE
from django.utils.decorators import method_decorator

class TableListCreateAPIView(generics.ListCreateAPIView):
    queryset = TableModel.objects.all().order_by('id') 
    serializer_class = TableModelSerializer
    permission_classes = [ReadOnly] 
    pagination_class = TablePagination
    
    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class TableDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer
    permission_classes = [IsAuthenticated]
    
    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class PublicationTypeCreateAPIView(generics.ListCreateAPIView):
    queryset = PublicationType.objects.all()
    serializer_class = PublicationTypeSerializer
    permission_classes = [AllowAny]
    
    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)


class TableListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = TablePagination

    def get_queryset(self):

        
        user = self.request.user
        for_user = self.request.query_params.get('for_user')

        # Попробуем получить данные из кэша
        cache_key = f'table_list_{user.id}_{for_user}'
        cached_data = cache.get(cache_key)
        
        if cached_data:
            return cached_data
 
        if for_user:
            queryset = TableModel.objects.filter(for_user=for_user).order_by('-id')
        else:
            queryset = TableModel.objects.all()

        # Сохраняем результат запроса в кэше на 15 минут
        cache.set(cache_key, queryset, timeout = TIME_SAVE_IN_CACHE)

        return queryset


class TableDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk, format=None):
        my_model = self.get_object(pk)
        # Проверка на соответствие владельцу (если необходимо)
        if my_model.owner != request.user:
            return Response({'detail': 'У вас нет прав на удаление этой записи.'}, status=status.HTTP_403_FORBIDDEN)
        my_model.delete()
        
        cache_key = f'table_list_{request.user.id}'
        cache.delete(cache_key)
        
        return Response(status=status.HTTP_204_NO_CONTENT)





# from table.serializers import AuthorSerializer, TableModelSerializer
# from rest_framework import viewsets

# class AuthorView(viewsets.ModelViewSet):
#     queryset = Author.objects.all()
#     serializer_class = AuthorSerializer
#     permission_classes = [AllowAny]



