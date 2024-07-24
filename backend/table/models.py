from django.db import models
from django.contrib.auth.models import User

import datetime

class PublicationType(models.Model):
    title = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = 'Тип публикации'
        verbose_name_plural = 'Типы публикации'


class TableModel(models.Model):
    for_user = models.ForeignKey(User, on_delete=models.CASCADE)

    name = models.CharField(max_length = 255)
    Type = models.ForeignKey(PublicationType, on_delete = models.CASCADE)
    title = models.CharField(max_length = 255)
    data = models.IntegerField(choices = [(year, year) for year in range(1950, datetime.date.today().year + 1)])
    tom = models.IntegerField()
    issue = models.IntegerField()
    page_start = models.IntegerField()
    page_end = models.IntegerField()
    pages = models.IntegerField()
    Co_authors = models.CharField(max_length = 500)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Таблицы'