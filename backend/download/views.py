from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from download.models import DownloadTableModel
from table.models import TableModel
from table.serializers import TableModelSerializer

from download.utils.createDockFile.create import DocxGenerator  # Импортируйте вашу функцию для создания документа
from download.serializers import DataSerializer
from rest_framework.permissions import AllowAny




from django.http import HttpResponse
import uuid
import os

class DownloadTableView(APIView):
    permission_classes = [AllowAny]

    def post(self, requests, *args, **kwargs):
        
        
       

        serializer = DataSerializer(data=requests.data)
        if serializer.is_valid():
            data = serializer.validated_data['data']
            
            # Генерация уникального имени для файла
            filename = f"table_{uuid.uuid4().hex}.docx"
            
            # Создание документа
            docx_generator = DocxGenerator(data, filename)
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

# class TableListView(APIView):
#     def get(self, request):
#         data = TableModel.objects.select_related('for_user').all()
#         serializer = TableModelSerializer(data, many=True)
#         return Response({"title": "Скачать таблицу ?", "data": serializer.data})

# class TableDownloadView(APIView):
#     def post(self, request):
#         data = TableModel.objects.select_related('for_user').all()
#         result = createDocxFile(data)
#         file_id = result.pk

#         # Возвращаем URL для скачивания
#         download_url = request.build_absolute_uri(f'/api/download/{file_id}/')
#         return Response({"download_url": download_url}, status=status.HTTP_201_CREATED)

# class DownloadFileView(APIView):
#     def get(self, request, file_id):
#         file_instance = get_object_or_404(DownloadTableModel, pk=file_id)
#         response = HttpResponse(file_instance.file_table, content_type='application/octet-stream')
#         response['Content-Disposition'] = f'attachment; filename="{file_instance.name}"'
#         file_instance.delete()
#         return response