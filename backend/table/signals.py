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



@receiver(post_save, sender=TableModel)
def update_cache_on_save(sender, instance, created, **kwargs):
    cache_key = f"product_{instance.id}"
    # Если объект только что создан, добавляем в кэш
    if created:
        cache.set(cache_key, instance, timeout=3600)
    else:
        # Если объект обновлен, пересохраняем в кэш
        cache.set(cache_key, instance, timeout=3600)

@receiver(post_delete, sender=TableModel)
def delete_cache_on_delete(sender, instance, **kwargs):
    cache_key = f"product_{instance.id}"
    # Удаляем кэш при удалении объекта
    cache.delete(cache_key)