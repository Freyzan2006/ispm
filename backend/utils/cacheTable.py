from django.core.cache import cache

def invalidate_view_cache(view_name: str, *args, **kwargs):
    """
    Инвалидирует кэш для конкретного view, используя его ключ.
    """
    from django.urls import reverse
    # Генерация ключа кэша, соответствующего cache_page
    url = reverse(view_name, args=args, kwargs=kwargs)
    cache_key = f"views.decorators.cache.cache_page.{url}"
    cache.delete(cache_key)