from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json

@api_view(['POST'])
def classify(request):
    print("request is", request.body)
    print("request is", json.loads(request.body)["userName"])


    person = {'name':'Dennies', 'age' : 20}
    print("success")
    return Response(person)