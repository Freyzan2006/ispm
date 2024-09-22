from rest_framework import serializers
from table.models import TableModel, PublicationType


class PublicationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationType
        fields = '__all__'




class TableUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TableModel
        fields = "__all__" 




# class AuthorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Author
#         fields = ['id', 'first_name', 'last_name', 'patronymic']


# class TableModelAuthorSerializer(serializers.ModelSerializer):
#     author = AuthorSerializer()

#     class Meta:
#         model = TableModelAuthor
#         fields = ['author', 'added_on']


class TableModelSerializer(serializers.ModelSerializer):
    Type = serializers.PrimaryKeyRelatedField(queryset=PublicationType.objects.all())
    

    class Meta:
        model = TableModel
        fields = '__all__'