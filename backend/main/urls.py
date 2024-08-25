

from main.views import MainView
from django.contrib import admin

from django.urls import path, include


urlpatterns = [
    path('', MainView.as_view(), name='main'),
    
    
    path('admin/', admin.site.urls),
    
   
    
]
