# from django_elasticsearch_dsl import Document, fields
# from django_elasticsearch_dsl.registries import registry
# from table.models import TableModel, PublicationType
# from django.contrib.auth.models import User

# from elasticsearch.exceptions import NotFoundError

# docker-compose run web python manage.py search_index --rebuild



# @registry.register_document
# class TableModelDocument(Document):
#     Type = fields.ObjectField(properties={
#         'id': fields.IntegerField(),
#         'title': fields.TextField(),
#     })
    
#     for_user = fields.ObjectField(properties={
#         'id': fields.IntegerField(),
#         'username': fields.TextField(),
#         'email': fields.TextField(),
#     })

#     class Index:
#         # name = 'tablemodel'
#         name = "ispm_search"
#         settings = {
#             "number_of_shards": 1,
#             "number_of_replicas": 0
#         }

#     class Django:
#         model = TableModel
#         fields = [
#             'name',
#             'title',
#             'data',
#             'authors',
#         ]