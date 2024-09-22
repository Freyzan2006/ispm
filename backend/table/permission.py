from rest_framework.permissions import BasePermission

class ReadOnly(BasePermission):
    """
    Разрешение, которое позволяет доступ только для чтения (GET запросы).
    """
    def has_permission(self, request, view):
        # Разрешить доступ только для GET запросов
        if request.method in ['GET', 'HEAD', 'OPTIONS']:
            return True
        # Для всех остальных запросов требуется аутентификация
        return request.user and request.user.is_authenticated