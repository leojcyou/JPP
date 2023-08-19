from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import JsonResponse
import json
import tensorflow as tf
import numpy as np

from .backend_helper.classify_main import classifyIntoCategories
from .backend_helper.parser_helpers import preprocessForML

@api_view(['POST'])
def classify(request):
    paragraph = json.loads(request.body)["text"]
    sentences, parsedSentences, categoriesList = classifyIntoCategories(paragraph)

    for i in range(len(sentences) - 1):
        try:
            if (categoriesList[i] == categoriesList[i + 1]):
                sentences[i] += " " + sentences[i + 1]
                parsedSentences[i] += " " + parsedSentences[i + 1]

                sentences.pop(i + 1)
                parsedSentences.pop(i + 1)
                categoriesList.pop(i + 1)

        except:
            break
    
    print("after combination: ")
    print("sentences are", sentences)
    print("parsedSentences are", parsedSentences)
    print("categoriesList is", categoriesList)

    model = tf.keras.models.load_model("model.keras")
    model.summary()

    classes = ['sadness', 'joy', 'love', 'anger', 'fear', 'surprise']
    processedParsedSentences = [] # np.array([[   1 ,  39 , 100 ,  59   , 7 ,  14 , 493  ,  4 ,  14, 3495,  552 ,  31 ,  59 ,  60, 127,  147,   75, 1479,    3 ,  21 ,1254 ,   0 ,   0 ,   0,    0,    0 ,   0,    0 ,0 ,   0,    0 ,   0 ,   0,    0,    0,    0,    0,    0,    0,    0]])
    predictions = []    

    processedParsedSentences = preprocessForML(parsedSentences)

    for each in processedParsedSentences:
        currPredictions = model.predict(each)
        currPrediction = classes[np.argmax(currPredictions[0])]

        print("for", each, "pred is", currPrediction)

    predictions.append(currPrediction)

    person = {'name': 'Dennies', 'age': 20}
    print("success")
    return JsonResponse(person)