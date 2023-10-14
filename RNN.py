import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import os
import tensorflow as tf
from tensorflow import keras

# Load and preprocess the data
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

# Preprocess text data
tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(train_text)
train_sequences = tokenizer.texts_to_sequences(train_text)
val_sequences = tokenizer.texts_to_sequences(val_text)
test_sequences = tokenizer.texts_to_sequences(test_text)

max_length = 40
train_padded = tf.keras.preprocessing.sequence.pad_sequences(train_sequences, maxlen=max_length, padding='post', truncating='post')
val_padded = tf.keras.preprocessing.sequence.pad_sequences(val_sequences, maxlen=max_length, padding='post', truncating='post')
test_padded = tf.keras.preprocessing.sequence.pad_sequences(test_sequences, maxlen=max_length, padding='post', truncating='post')

# Create a Simple RNN model
model = keras.models.Sequential()
model.add(keras.layers.Embedding(input_dim=len(tokenizer.word_index)+1, output_dim=32, input_length=max_length))
model.add(keras.layers.SimpleRNN(64, dropout=0.1))  # Use Simple RNN layer
model.add(keras.layers.Dense(6, activation='softmax'))
model.summary()

# Compile and train the Simple RNN model
loss = keras.losses.SparseCategoricalCrossentropy()
optim = keras.optimizers.Adam(learning_rate=0.001)
metrics = ['accuracy']
model.compile(loss=loss, optimizer=optim, metrics=metrics)
model.fit(train_padded, train_labels, epochs=20, verbose=2, validation_data=(val_padded, val_labels))

# Predicting on test data
predictions = model.predict(test_padded)
predicted_class_indices = np.argmax(predictions, axis=1)
reverse_labels_dict = {v: k for k, v in labels_dict.items()}
predicted_labels = [reverse_labels_dict[idx] for idx in predicted_class_indices]
predicted_labels = np.array([labels_dict[label] for label in predicted_labels])

print(test_text[10:20])
print(test_labels[10:20])
print(predicted_labels[10:20])
