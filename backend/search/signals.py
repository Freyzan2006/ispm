# signals.py
# from django.db.models.signals import post_save
# from django.dispatch import receiver
# from django_elasticsearch_dsl.registries import registry
# from table.models import TableModel

# @receiver(post_save, sender=TableModel)
# def index_table_model(sender, instance, **kwargs):
#     try:
#         instance.update()
#         print(f"Документ с id {instance.id} был успешно проиндексирован.")
#     except Exception as e:
#         print(f"Ошибка при индексации документа с id {instance.id}: {e}")