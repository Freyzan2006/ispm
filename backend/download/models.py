import os
from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
from django.conf import settings


class DownloadTableModel(models.Model):
    name = models.CharField(max_length = 100)
    file_table = models.FileField(upload_to = 'temp/')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Файл docx'
        verbose_name_plural = 'Файлы docx'



@receiver(post_delete, sender=DownloadTableModel)
def delete_related_file(sender, instance, **kwargs):
    # Удаляем связанный файл из каталога MEDIA_ROOT
    if instance.file_table:
        file_path = os.path.join(settings.MEDIA_ROOT, str(instance.file_table))
        if os.path.exists(file_path):
            os.remove(file_path)