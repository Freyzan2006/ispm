

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

from django.db.models.signals import post_save
from django.dispatch import receiver

from django.db.models.signals import post_save, post_delete

import logging

from search.documents import TableModelDocument

from elasticsearch.helpers import BulkIndexError

logger = logging.getLogger(__name__)

class TableListCreateAPIView(generics.ListCreateAPIView):
    queryset = TableModel.objects.all().order_by('id') 
    serializer_class = TableModelSerializer
    permission_classes = [ReadOnly] 
    pagination_class = TablePagination
    
    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            self.perform_create(serializer)
            # Удаляем или обновляем кэш
            # cache_key = f"table_list"
            # cache.delete(cache_key)  # Или обновите с новыми данными
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except BulkIndexError as e:
            # Логируем ошибки индексации
            print(f"BulkIndexError: {e.errors}")
            return Response({"error": e.errors}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            # Логируем все остальные ошибки
            print(f"Error occurred: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
    
    # def create(self, request, *args, **kwargs):
    #     response = super().create(request, *args, **kwargs)
    #     if response.status_code == status.HTTP_201_CREATED:
    #         obj_id = response.data.get('id')
    #         obj_instance = TableModel.objects.get(id=obj_id)
    #         try:
    #             es.index(index='tablemodel', id=str(obj_instance.id), body=obj_to_dict(obj_instance))
    #         except e:
    #             logger.error("Failed to index document: %s", e)
    #             # Дополнительно можно отправить ответ клиенту или выполнить другую логику
    #     return response


class TableDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TableModel.objects.all()
    serializer_class = TableModelSerializer
    permission_classes = [ReadOnly, IsAuthenticated]
    
    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    # def perform_update(self, serializer):
    #     super().perform_update(serializer)
    #     # Инвалидация кэша
    #     cache_key = f"table_list"
    #     cache.delete(cache_key)

    # def perform_destroy(self, instance):
    #     super().perform_destroy(instance)
    #     # Инвалидация кэша
    #     cache_key = f"table_list"
    #     cache.delete(cache_key)


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

    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))  
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)
    
    def get_queryset(self):
        for_user = self.request.query_params.get('for_user').strip()
        
        if for_user:
            queryset = TableModel.objects.filter(for_user=for_user).order_by('-id')
        else:
            queryset = TableModel.objects.all()

        return queryset

from rest_framework.generics import get_object_or_404
class TableDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))    
    def delete(self, request, pk, format=None):
        my_model = get_object_or_404(TableModel, pk=pk)  # Получаем объект
        if my_model.owner != request.user:
            return Response({'detail': 'У вас нет прав на удаление этой записи.'}, status=status.HTTP_403_FORBIDDEN)
        my_model.delete()

     

        return Response(status=status.HTTP_204_NO_CONTENT)








