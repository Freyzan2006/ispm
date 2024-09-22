import django_filters
from table.models import TableModel

class TableModelFilter(django_filters.FilterSet):
    co_authors_last_name = django_filters.CharFilter(field_name='authors', lookup_expr='contains')
    co_authors_first_name = django_filters.CharFilter(field_name='authors', lookup_expr='contains')

    class Meta:
        model = TableModel
        fields = ['co_authors_last_name', 'co_authors_first_name']