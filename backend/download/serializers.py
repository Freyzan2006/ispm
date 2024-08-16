from rest_framework import serializers

from rest_framework import serializers

class DataSerializer(serializers.Serializer):
    data = serializers.ListField(child=serializers.DictField())