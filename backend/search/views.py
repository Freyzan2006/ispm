
from table.pagination import TablePagination

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
# from rest_framework.permissions import ReadOnly
from table.permission import ReadOnly
from table.models import TableModel
from table.serializers import TableModelSerializer
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from config.cache import TIME_SAVE_IN_CACHE

class SearchAPIView(APIView):
    serializer_class = TableModelSerializer
    pagination_class = TablePagination
    permission_classes = [ReadOnly]


    @method_decorator(cache_page(TIME_SAVE_IN_CACHE))
    def get(self, request):
        # Получение параметров из запроса
        search_params = {
            'name': request.query_params.get('searchName', '').strip(),
            'title': request.query_params.get('searchTitle', '').strip(),
            'Type': request.query_params.get('searchPublicType', '').strip(),
            'date': request.query_params.get('searchDate', '').strip(),
            'user': request.query_params.get('searchUser', '').strip(),
            'coauthor_first_name': request.query_params.get('searchCoauthorFirstName', '').strip(),
            'coauthor_last_name': request.query_params.get('searchCoauthorLastName', '').strip(),
            'coauthor_patronymic': request.query_params.get('searchCoauthorPatronymic', '').strip(),
        }

        # Начальный queryset
        queryset = TableModel.objects.all()

        # Применение фильтров по параметрам
        if search_params['name']:
            queryset = queryset.filter(name__icontains=search_params['name'])
        if search_params['title']:
            queryset = queryset.filter(title__icontains=search_params['title'])
        if search_params['Type']:
            queryset = queryset.filter(Type__icontains=search_params['Type'])
        if search_params['date']:
            queryset = queryset.filter(data__icontains=search_params['date'])
        if search_params['user']:
            queryset = queryset.filter(for_user__icontains=search_params['user'])

        # Поиск по авторам
        if search_params['coauthor_first_name']:
            queryset = queryset.filter(authors__icontains=search_params['coauthor_first_name'])
        if search_params['coauthor_last_name']:
            queryset = queryset.filter(authors__icontains=search_params['coauthor_last_name'])
        if search_params['coauthor_patronymic']:
            queryset = queryset.filter(authors__icontains=search_params['coauthor_patronymic'])

        # Пагинация
        paginator = self.pagination_class()
        paginated_queryset = paginator.paginate_queryset(queryset, request)

        # Сериализация
        serializer = self.serializer_class(paginated_queryset, many=True)

        return paginator.get_paginated_response(serializer.data)

























# from rest_framework.views import APIView
# from rest_framework.response import Response

# from django.utils.decorators import method_decorator
# from django.views.decorators.cache import cache_page

# from table.models import TableModel
# from table.serializers import TableModelSerializer
# from table.pagination import TablePagination
# from table.permission import ReadOnly

# from search.documents import TableModelDocument

# from config.cache import TIME_SAVE_IN_CACHE

# class SearchAPIView(APIView):
#     serializer_class = TableModelSerializer
#     pagination_class = TablePagination
#     permission_classes = [ReadOnly]

    
#     @method_decorator(cache_page(TIME_SAVE_IN_CACHE))
#     def get(self, request):
              
#         # Получение параметров из запрос
#         search_params = {
#             'name': request.query_params.get('searchName', '').strip(),
#             'title': request.query_params.get('searchTitle', '').strip(),
#             'Type': request.query_params.get('searchPublicType', '').strip(),
#             'date': request.query_params.get('searchDate', '').strip(),
#             'user': request.query_params.get('searchUser', '').strip(),
#             'coauthor_first_name': request.query_params.get('searchCoauthorFirstName', '').strip(),
#             'coauthor_last_name': request.query_params.get('searchCoauthorLastName', '').strip(),
#             'coauthor_patronymic': request.query_params.get('searchCoauthorPatronymic', '').strip(),
#         }
        
#         if all(not value for value in search_params.values()):
#             queryset = TableModel.objects.all()
#             paginator = self.pagination_class()
#             paginated_queryset = paginator.paginate_queryset(queryset, request)
#             serializer = self.serializer_class(paginated_queryset, many=True)
#             return paginator.get_paginated_response(serializer.data)
        


#         # Создание поискового запроса
#         search = TableModelDocument.search()
        

#         # Построение запросов
#         if search_params['name']:
#             search = search.query('match', name=search_params['name'])
#         if search_params['title']:
#             search = search.query('match', title=search_params['title'])
#         if search_params['Type']:
#             search = search.filter('term', Type=search_params['Type'])
#         if search_params['date']:
#             search = search.filter('term', data=search_params['date'])
#         if search_params['user']:
#             search = search.filter('term', for_user=search_params['user'])
        
#         # Поиск по авторам
#         if search_params['coauthor_first_name'] or search_params['coauthor_last_name'] or search_params['coauthor_patronymic']:
#             author_query = []
#             if search_params['coauthor_first_name']:
#                 author_query.append({"match": {"authors": search_params['coauthor_first_name']}})
#             if search_params['coauthor_last_name']:
#                 author_query.append({"match": {"authors": search_params['coauthor_last_name']}})
#             if search_params['coauthor_patronymic']:
#                 author_query.append({"match": {"authors": search_params['coauthor_patronymic']}})
            
#             for q in author_query:
#                 search = search.query('bool', must=q)

#         # Выполнение поиска
#         response = search.execute()

#         # Извлечение ID результатов
#         ids = [hit.meta.id for hit in response]

#         # Получение записей из базы данных по ID
#         queryset = TableModel.objects.filter(id__in=ids)

#         # Пагинация результатов
#         paginator = self.pagination_class()
#         paginated_queryset = paginator.paginate_queryset(queryset, request)

#         # Сериализация данных
#         serializer = self.serializer_class(paginated_queryset, many=True)

#         return paginator.get_paginated_response(serializer.data)