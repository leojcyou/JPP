import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score

# Load and preprocess your data
train_df = pd.read_csv('data/train.csv')
test_df = pd.read_csv('data/test.csv')

train_text = train_df.text.to_numpy()
train_labels = train_df.label.to_numpy()
test_text = test_df.text.to_numpy()
test_labels = test_df.label.to_numpy()

# Create a TF-IDF representation of the text data
vectorizer = TfidfVectorizer(max_features=5000)  # You can adjust max_features as needed
train_vectors = vectorizer.fit_transform(train_text)
test_vectors = vectorizer.transform(test_text)

# Split the data into training and validation sets
train_vectors, val_vectors, train_labels, val_labels = train_test_split(
    train_vectors, train_labels, test_size=0.2, random_state=42
)

# Initialize the SVM classifier
svm_classifier = SVC(kernel='linear', C=1)

# Train the SVM classifier
svm_classifier.fit(train_vectors, train_labels)

# Make predictions on the validation set
val_predictions = svm_classifier.predict(val_vectors)

# Calculate and print accuracy
val_accuracy = accuracy_score(val_labels, val_predictions)
print(f"Validation Accuracy: {val_accuracy:.4f}")

# Make predictions on the test set
test_predictions = svm_classifier.predict(test_vectors)

# Calculate and print accuracy
test_accuracy = accuracy_score(test_labels, test_predictions)
print(f"Test Accuracy: {test_accuracy:.4f}")
print(test_predictions)