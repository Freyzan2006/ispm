
from rest_framework.views import APIView
from rest_framework.response import Response

class MainView(APIView):
    def get(self, requests):
        return Response("it's main") 
    



