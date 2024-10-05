


from rest_framework.pagination import PageNumberPagination

class TablePagination(PageNumberPagination):
    page_size = 2  # Количество элементов на странице
    page_size_query_param = 'page_size'  # Параметр запроса для изменения количества элементов на странице
    max_page_size = 100  # Максимально допустимое количество элементов на странице

    # def paginate_queryset(self, queryset, request, view=None):
    #     print(f"Request page size: {request.query_params.get(self.page_size_query_param)}")
    #     return super().paginate_queryset(queryset, request, view)