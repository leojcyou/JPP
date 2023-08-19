from parser_helpers import expand_contractions, separateIntoSentences 
from text_classifier import get_response, getAllClassifications

def main():
    text = '''
        Hi, my name is Richard Miao! I am testing; I hate this.
        I love someone's cat! Today just isn't it...
    '''

    modifiedPara = expand_contractions(text)
    sentencesList = separateIntoSentences(modifiedPara)

    categoriesList = getAllClassifications(sentencesList)

    print("sentences: ", sentencesList)
    print("categories: ", categoriesList)

if __name__ == '__main__':
    main()