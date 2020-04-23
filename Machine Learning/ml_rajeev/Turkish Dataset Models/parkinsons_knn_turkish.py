# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
trainDataset = pd.read_csv('Parkinsons Train Data.csv')
testDataset = pd.read_csv('Parkinsons Test Data.csv')

X_train = trainDataset.iloc[:, 1: 23].values #matrix of independent features
y_train = trainDataset.iloc[:, 27].values #dependent variable
X_test = testDataset.iloc[:, 0: 22].values


# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)


# Fitting classifier to the Training set
# Create your classifier here - knn
from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors = 14, metric = 'minkowski', p = 2)
classifier.fit(X_train, y_train)


#Evaluating the model
# Making the Confusion Matrix
y_pred = classifier.predict(X_test)

