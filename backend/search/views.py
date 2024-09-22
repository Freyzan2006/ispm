
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


from table.models import TableModel
from table.serializers import TableModelSerializer
from user.models import UserModel

from django.db.models import Q

# from django.contrib.auth.models import User

from table.pagination import TablePagination


import json

from django.db.models.query import QuerySet

class SearchListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = TablePagination

    def get_queryset(self):
        
        
        # user = self.request.user
        search_name = self.request.query_params.get('searchName', '').strip()
        search_public_type = self.request.query_params.get("searchPublicType", '').strip()
        search_user = self.request.query_params.get("searchUser", '').strip()
        search_date = self.request.query_params.get('searchDate', '').strip()
        
        search_coauthor_first_name = self.request.query_params.get('searchCoauthorFirstName', '').strip()
        search_coauthor_last_name = self.request.query_params.get('searchCoauthorLastName', '').strip()
        search_coauthor_patronymic = self.request.query_params.get('searchCoauthorPatronymic', '').strip()

        # print(f"First name: {search_coauthor_first_name}")
        # print(f"Last name: {search_coauthor_last_name}")
        # print(f"Patronymic: {search_coauthor_patronymic}")
        
        query = Q()

        # Добавляем фильтры только если значения не пустые
        if search_name:
            query &= Q(name__icontains=search_name)
        if search_public_type and int(search_date) > 0:
            try:
                public_type_id = int(search_public_type)
                query &= Q(Type=public_type_id)  # Фильтрация по ID
            except ValueError:
                pass
        if search_user and int(search_date) > 0:
            try:
                for_user = int(search_user)
                query &= Q(for_user=for_user)  # Используем user_id для фильтрации по ID
            except ValueError:
                pass
        if search_date and int(search_date) > 0:
            query &= Q(data__icontains=search_date)  # Замените на точное условие, если нужно

       
        
        queryset = TableModel.objects.filter(query).order_by('-id')

        # Фильтрация на уровне Python
        if search_coauthor_first_name or search_coauthor_last_name or search_coauthor_patronymic:
            def author_matches(author, first_name, last_name, patronymic):
                return (not first_name or author.get('first_name') == first_name) and \
                       (not last_name or author.get('last_name') == last_name) and \
                       (not patronymic or author.get('patronymic') == patronymic)

            def matches_record(record):
                try:
                    authors = json.loads(record.authors)
                except json.JSONDecodeError:
                    return False
                return any(author_matches(author, search_coauthor_first_name, search_coauthor_last_name, search_coauthor_patronymic) for author in authors)

            # Используем list comprehension для фильтрации
            filtered_records = [record for record in queryset if matches_record(record)]

            # Возвращаем QuerySet с отфильтрованными записями
            return TableModel.objects.filter(id__in=[record.id for record in filtered_records])

        return queryset
        
        
     
      
        # print(TableModel.objects.filter(query).order_by('-id'))
        # return TableModel.objects.filter(query).order_by('-id')
        
        
        