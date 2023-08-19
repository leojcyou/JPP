from .parser_helpers import expand_contractions, separateIntoSentences 
from .text_classifier import get_response, getAllClassifications

def classifyIntoCategories(text):
    #TODO: text should be pulled from front end, so for now, this is just for testing
    # text = '''
    #     Hi, my name is Richard Miao! I am testing.
    #     I love someone's cat! Today just isn't it...
    # '''

    modifiedPara = expand_contractions(text)
    sentences, parsedSentences = separateIntoSentences(modifiedPara)
    categoriesList = getAllClassifications(parsedSentences)

    return sentences, parsedSentences, categoriesList