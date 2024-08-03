
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


from table.models import TableModel
from table.serializers import TableModelSerializer
from user.models import UserModel

from django.db.models import Q

# from django.contrib.auth.models import User

from table.pagination import TablePagination

class SearchListAPIView(generics.ListAPIView):
    serializer_class = TableModelSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = TablePagination

    def get_queryset(self):
        
        
        # user = self.request.user
        search_name = self.request.query_params.get('searchName', '').strip()
        search_date = self.request.query_params.get('searchDate', '').strip()
        search_coauthor = self.request.query_params.get('searchCoauthor', '').strip()

        query = Q()

        # Добавляем фильтры только если значения не пустые
        if search_name:
            query &= Q(name__icontains=search_name)
        if search_date:
            query &= Q(data__icontains=search_date)  # Замените на точное условие, если нужно
        if search_coauthor:
            query &= Q(Co_authors__icontains=search_coauthor)

        # Применяем фильтры к запросу
        return TableModel.objects.filter(query)