
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


from table.models import TableModel
from table.serializers import TableModelSerializer
from user.models import UserModel

from django.db.models import Q


from table.pagination import TablePagination


import json

from django.db.models.query import QuerySet


from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from config.cache import TIME_SAVE_IN_CACHE



import logging

logger = logging.getLogger(__name__)




class SearchListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    pagination_class = TablePagination

    def get_queryset(self):
        # Получаем параметры запроса
        search_name = self.request.query_params.get('searchName', '').strip()
        search_public_type = self.request.query_params.get("searchPublicType", '').strip()
        search_user = self.request.query_params.get("searchUser", '').strip()
        search_date = self.request.query_params.get('searchDate', '').strip()
        search_coauthor_first_name = self.request.query_params.get('searchCoauthorFirstName', '').strip()
        search_coauthor_last_name = self.request.query_params.get('searchCoauthorLastName', '').strip()
        search_coauthor_patronymic = self.request.query_params.get('searchCoauthorPatronymic', '').strip()

        # Создание уникального ключа для кэша
        cache_key = f'search_queryset__{search_name}_{search_public_type}_{search_user}_{search_date}_{search_coauthor_first_name}_{search_coauthor_last_name}_{search_coauthor_patronymic}'
        print("-------------------------------------------------")
        

        
        # Проверяем кэш
        cached_queryset = cache.get(cache_key)
 
        if cached_queryset is not None:
            logger.info(f"Кэш найден для ключа: {cache_key}")
            return cached_queryset
      
        

        query = Q()
        if search_name:
            query &= Q(name__icontains=search_name)
        if search_public_type:
            query &= Q(Type=int(search_public_type))
        if search_user:
            query &= Q(for_user=int(search_user))
        if search_date:
            query &= Q(data__icontains=search_date)

        queryset = TableModel.objects.filter(query).order_by('-id')

        # Фильтрация на уровне Python
        if search_coauthor_first_name or search_coauthor_last_name or search_coauthor_patronymic:
            filtered_records = [
                record for record in queryset 
                if self.author_matches(record, search_coauthor_first_name, search_coauthor_last_name, search_coauthor_patronymic)
            ]
            queryset = TableModel.objects.filter(id__in=[record.id for record in filtered_records])

        # Сохраняем результат в кэш
        cache.set(cache_key,  queryset, timeout=TIME_SAVE_IN_CACHE)  
        print(f"Кэш сохранён для ключа: {cache_key}, данные: {queryset}")
        return queryset

    def author_matches(self, record, first_name, last_name, patronymic):
        try:
            authors = json.loads(record.authors)
        except json.JSONDecodeError:
            return False
        return any(
            (not first_name or author.get('first_name') == first_name) and
            (not last_name or author.get('last_name') == last_name) and
            (not patronymic or author.get('patronymic') == patronymic) for author in authors
        )
        
        
     
      
     
        
        
        