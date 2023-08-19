import cohere
co = cohere.Client('Biq6EEDJ1nEmcC9nEv4kqkX7gPGzYwerONOrorAq') # This is your trial API key

def get_response(text: str):
    response = co.generate(
    model='command',
    prompt=f'I have these 6 categories: Career, Academic, Love, Self-Growth, Mental Health, Friendships. \n\nWhich category does this text belong to: \"{text}\"?\n\n',
    max_tokens=300,
    temperature=0.9,
    k=0,
    stop_sequences=[],
    return_likelihoods='NONE')

    return response.generations[0].text

print(get_response("My life sucks. I am so sad."))
