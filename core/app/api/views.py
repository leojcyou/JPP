from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse

@api_view(['GET'])
def classify(request):
    person = {'name':'Dennies', 'age' : 20}
    print("success")
    return Response(person)