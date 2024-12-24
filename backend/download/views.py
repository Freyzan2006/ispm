from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from download.models import DownloadTableModel
from table.models import TableModel
from table.serializers import TableModelSerializer

from download.utils.Generator.DocxGenerator import DocxGenerator  # Импортируйте вашу функцию для создания документа
from download.serializers import DataSerializer
from rest_framework.permissions import AllowAny


from django.contrib.auth.models import User

from django.http import HttpResponse
import uuid
import os

class DownloadTableView(APIView):
    permission_classes = [AllowAny]

    def post(self, requests, *args, **kwargs):
        
        
       

        serializer = DataSerializer(data=requests.data)
        if serializer.is_valid():
            data = serializer.validated_data['data']
            print()
            # user = User.objects.get()
            # Генерация уникального имени для файла
            filename = f"table_{uuid.uuid4().hex}.docx"
            
            # Создание документ
            docx_generator = DocxGenerator(data, filename, requests.user)
            docx_generator.create_docx()
            
            # Отправка файла клиенту
            response = HttpResponse(open(filename, 'rb').read(), content_type='application/vnd.openxmlformats-officedocument.wordprocessingml.document')
            response['Content-Disposition'] = f'attachment; filename="{filename}"'
            
            # Удаление файла после отправки
            os.remove(filename)
            
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, requests):
        return Response({"title": "Download", "data": "ggg"}, status=status.HTTP_200_OK)

