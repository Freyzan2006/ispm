from rest_framework import serializers

class MyDataSerializer(serializers.Serializer):
    name = serializers.CharField()