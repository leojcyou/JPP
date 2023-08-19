import cohere
co = cohere.Client('Biq6EEDJ1nEmcC9nEv4kqkX7gPGzYwerONOrorAq') # This is your trial API key

def get_response(text: str):
    response = co.generate(
    model='command',
    prompt=f'''I have these 6 categories: Career, Academic, Love, Self-Growth, Mental Health, Friendships. \n
                \Classify this sentence by outputting only one category name, nothing else: \"{text}\"?\n\n
            ''',
    max_tokens=2,
    temperature=0.9,
    k=0,
    stop_sequences=[],
    return_likelihoods='NONE')

    return response.generations[0].text

def getAllClassifications(sentences: list):
    classifications = []

    for sentence in sentences:
        resp = get_response(sentence)
        classifications.append(get_response(resp))
    
    return classifications

