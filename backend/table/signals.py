from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.core.cache import cache
from table.models import TableModel

from utils.cacheTable import invalidate_view_cache

@receiver(post_save, sender=TableModel)
@receiver(post_delete, sender=TableModel)
def invalidate_cache(sender, **kwargs):
    """
    Инвалидирует кэш таблицы при сохранении или удалении записей.
    """
    invalidate_view_cache("table-list-create")