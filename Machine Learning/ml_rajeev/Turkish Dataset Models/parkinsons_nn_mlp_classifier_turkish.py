# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import tensorflow as tf


# Importing the dataset.
dataset = pd.read_csv('Parkinsons Train Data.csv')
X = dataset.iloc[:, 1: 25].values #matrix of independent features 1:26 gives 70% accuracy
y = dataset.iloc[:, 27].values #dependent variable

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

#Doing logistic regression 
# Fitting Logistic Regression to the Training set
from sklearn.neural_network import MLPClassifier
classifier = MLPClassifier(hidden_layer_sizes = (200,200,200), max_iter = 500) #LR object - pseudo random
classifier.fit(X_train, y_train) #fit classifier object to training set so classifier learns co relation between X-train an Y-train

# Predicting the Test set results
y_pred = classifier.predict(X_test)

#Evaluating the model
# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix,accuracy_score
cm = confusion_matrix(y_test, y_pred) #(real values, predicted values)
accuracy_score(y_test,y_pred)
print("Accuracy_score for Nerual Network(Turkish data set) ", accuracy_score(y_test, y_pred))

"""
[correct,incorrect]
[incorrect,correct]
"""




