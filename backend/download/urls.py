

from django.urls import path
from download.views import DownloadTableView

urlpatterns = [
    path('', DownloadTableView.as_view(), name = "download_table"),

    # path('', TableDownloadView.as_view(), name='table-download'),
    # path('<int:file_id>/', DownloadFileView.as_view(), name='download-file'),
]
