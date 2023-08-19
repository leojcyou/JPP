import re
import contractions

# Gets rid of sentence contractions
def expand_contractions(sentence):
    expanded_sentence = contractions.fix(sentence)
    return expanded_sentence

# Separate into sentences (with requirements)
def separateIntoSentences(paragraph: str, max_words_per_sentence=40):
    sentence_pattern = r'[.;!?]+' # Regex that separates sentences by . or ; or ! or ?

    sentences = re.split(sentence_pattern, paragraph)

    sentences = [sentence.strip() for sentence in sentences if sentence.strip()]

    new_sentences = []
    for sentence in sentences:
        sentence = re.sub(r'[^a-zA-Z\' ]+', ' ', sentence) # Replace non-letter characters with spaces

        words = sentence.split()

        # Handle apostrophes by splitting words
        processed_words = []
        for word in words:
            if "'" in word:
                parts = word.split("'")
                processed_words.extend(parts)
            else:
                processed_words.append(word)

        # Join words
        processed_sentence = ' '.join(processed_words[:max_words_per_sentence])
        new_sentences.append(processed_sentence)

    return new_sentences