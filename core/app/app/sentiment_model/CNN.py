import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import neattext.functions as nfx
import os
import tensorflow as tf
from tensorflow import keras
import time
import nltk

train_df = pd.read_csv('data/train.csv')
val_df = pd.read_csv('data/val.csv')
test_df = pd.read_csv('data/test.csv')

train_text = train_df.text.to_numpy()
train_labels = train_df.label.to_numpy()
val_text = val_df.text.to_numpy()
val_labels = val_df.label.to_numpy()
test_text = test_df.text.to_numpy()
test_labels = test_df.label.to_numpy()

labels_dict = {'sadness': 0, 'joy': 1, 'love': 2, 'anger': 3, 'fear': 4, 'surprise': 5}
train_labels = np.array([labels_dict[label] for label in train_labels])
val_labels = np.array([labels_dict[label] for label in val_labels])
test_labels = np.array([labels_dict[label] for label in test_labels])

#unique words
from collections import Counter
def counter_word(text_col):
    count = Counter()
    for text in text_col.values:
        for word in text.split():
            count[word] += 1
    return count

num_unique_words = len(counter_word(train_df.text))

#tokenize
tokenizer = tf.keras.preprocessing.text.Tokenizer(num_words=num_unique_words) #num_words = max number of words to keep, based on word frequency
tokenizer.fit_on_texts(train_text) #fit only on train
word_index = tokenizer.word_index #dictionary of words and their index

train_index_sequences = tokenizer.texts_to_sequences(train_text)
val_index_sequences = tokenizer.texts_to_sequences(val_text)
test_index_sequences = tokenizer.texts_to_sequences(test_text)

#padding
max_length = 40
train_padded = tf.keras.preprocessing.sequence.pad_sequences(train_index_sequences, maxlen=max_length, padding='post', truncating='post')
val_padded = tf.keras.preprocessing.sequence.pad_sequences(val_index_sequences, maxlen=max_length, padding='post', truncating='post')
test_padded = tf.keras.preprocessing.sequence.pad_sequences(test_index_sequences, maxlen=max_length, padding='post', truncating='post')

# Create a 1D CNN model
model = keras.models.Sequential()
model.add(keras.layers.Embedding(num_unique_words, 32, input_length=max_length))
model.add(keras.layers.Conv1D(128, 5, activation='relu'))  # 128 filters with kernel size 5
model.add(keras.layers.GlobalMaxPooling1D())
model.add(keras.layers.Dense(64, activation='relu'))
model.add(keras.layers.Dense(6, activation='softmax'))
model.summary()

# loss, optimizer, metrics
loss = keras.losses.SparseCategoricalCrossentropy()
optim = keras.optimizers.Adam(learning_rate=0.001)
metrics = ['accuracy']
model.compile(loss=loss, optimizer=optim, metrics=metrics)
model.fit(train_padded, train_labels, epochs=20, verbose=2, validation_data=(val_padded, val_labels))

# Evaluate on the test set
predictions = model.predict(test_padded)
predicted_class_indices = np.argmax(predictions, axis=1)
reverse_labels_dict = {v: k for k, v in labels_dict.items()}
predicted_labels = [reverse_labels_dict[idx] for idx in predicted_class_indices]
predicted_labels = np.array([labels_dict[label] for label in predicted_labels])

# Print test results
print(test_text[10:20])
print(test_labels[10:20])
print(predicted_labels[10:20])




# ['i don t feel particularly agitated'
#  'i feel beautifully emotional knowing that these women of whom i knew just a handful were holding me and my baba on our journey'
#  'i pay attention it deepens into a feeling of being invaded and helpless'
#  'i just feel extremely comfortable with the group of people that i dont even need to hide myself'
#  'i find myself in the odd position of feeling supportive of'
#  'i was feeling as heartbroken as im sure katniss was'
#  'i feel a little mellow today'
#  'i feel like my only role now would be to tear your sails with my pessimism and discontent'
#  'i feel just bcoz a fight we get mad to each other n u wanna make a publicity n let the world knows about our fight'
#  'i feel like reds and purples are just so rich and kind of perfect']
# [4 0 4 1 2 0 1 0 3 1]
# [3 0 0 1 2 0 1 0 3 1]