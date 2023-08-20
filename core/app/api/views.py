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

    # for i in range(len(sentences) - 1):
    #     try:
    #         if (categoriesList[i] == categoriesList[i + 1]):
    #             sentences[i] += " " + sentences[i + 1]
    #             parsedSentences[i] += " " + parsedSentences[i + 1]

    #             sentences.pop(i + 1)
    #             parsedSentences.pop(i + 1)
    #             categoriesList.pop(i + 1)

    #     except:
    #         break
    
    # print("after combination: ")
    print("sentences are", sentences)
    print("parsedSentences are", parsedSentences)
    print("categoriesList is", categoriesList)

    model = tf.keras.models.load_model("C:/Users/qianx/Desktop/Coding/OLD_JPP/core/app/app/sentiment_model/model.keras")
    model.summary()

    classes = ['Sadness', 'Joy', 'Love', 'Anger', 'Fear', 'Surprise']
    processedParsedSentences = [] # np.array([[   1 ,  39 , 100 ,  59   , 7 ,  14 , 493  ,  4 ,  14, 3495,  552 ,  31 ,  59 ,  60, 127,  147,   75, 1479,    3 ,  21 ,1254 ,   0 ,   0 ,   0,    0,    0 ,   0,    0 ,0 ,   0,    0 ,   0 ,   0,    0,    0,    0,    0,    0,    0,    0]])
    predictionsList = []    

    processedParsedSentences = preprocessForML(parsedSentences)

    predictions = model.predict(processedParsedSentences)
    predicted_class_indices = np.argmax(predictions, axis=1)
    
    for each in predicted_class_indices:
        print("prediction is", classes[each])
        predictionsList.append(classes[each])

    for i in range(len(sentences) - 1):
        try:
            if (categoriesList[i] == categoriesList[i + 1] and predictionsList[i] == predictionsList[i + 1]):
                sentences[i] += " " + sentences[i + 1]
                parsedSentences[i] += " " + parsedSentences[i + 1]

                sentences.pop(i + 1)
                parsedSentences.pop(i + 1)
                categoriesList.pop(i + 1)
                predictionsList.pop(i + 1)

        except:
            break

    ret = []

    for i in range(len(sentences)):
        ret.append({
            "text": sentences[i],
            "sentiment": predictionsList[i],
            "category": categoriesList[i]
        })

    return JsonResponse({ "data": ret })