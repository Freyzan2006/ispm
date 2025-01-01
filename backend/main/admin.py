

from django.contrib import admin
from table.models import PublicationType, TableModel


class AuthorAdmin(admin.ModelAdmin):
    pass


admin.site.register(PublicationType, AuthorAdmin)
admin.site.register(TableModel, AuthorAdmin)
