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

# class Author(models.Model):
#     first_name = models.CharField(max_length=100)
#     last_name = models.CharField(max_length=100)
#     patronymic = models.CharField(max_length=100, blank=True, null=True)  # Отчество не обязательно

#     def __str__(self):
#         return f"{self.first_name} {self.last_name}"

#     class Meta:
#         verbose_name = 'Автор'
#         verbose_name_plural = 'Авторы'

import json

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
    # authors = models.JSONField(default=list, blank=True)
    
    authors = models.TextField(default='[]', blank=True)

    # def get_authors(self):
    #     return json.loads(self.authors)

    # def set_authors(self, authors):
    #     self.authors = json.dumps(authors)
    
    # authors = models.ManyToManyField(Author, through='TableModelAuthor', blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


    class Meta:
        verbose_name = 'Запись'
        verbose_name_plural = 'Таблицы'


# class TableModelAuthor(models.Model):
#     table_model = models.ForeignKey(TableModel, on_delete=models.CASCADE)
#     author = models.ForeignKey(Author, on_delete=models.CASCADE)
#     added_on = models.DateTimeField(auto_now_add=True)  # Дата добавления соавтора к записи

#     class Meta:
#         verbose_name = 'Запись-Автор'
#         verbose_name_plural = 'Записи-Авторы'