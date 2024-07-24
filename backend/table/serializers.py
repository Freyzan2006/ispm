from rest_framework import serializers
from table.models import TableModel, PublicationType


class PublicationTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicationType
        fields = '__all__'

class TableModelSerializer(serializers.ModelSerializer):
    Type = serializers.PrimaryKeyRelatedField(queryset=PublicationType.objects.all())

    class Meta:
        model = TableModel
        fields = '__all__'