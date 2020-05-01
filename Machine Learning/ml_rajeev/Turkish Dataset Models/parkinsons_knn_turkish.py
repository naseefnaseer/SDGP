# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset
trainDataset = pd.read_csv('Parkinsons Train Data.csv')
testDataset = pd.read_csv('Parkinsons Test Data.csv')
#sriLankanData = pd.read_csv('Sri Lankan Dataset unoptimized.csv')
sriLankanData = pd.read_csv('Sri Lankan Dataset.csv')


X = trainDataset.iloc[:, 1: 26].values #matrix of independent features
y = trainDataset.iloc[:, 27].values #dependent variable
X_SriLankan = sriLankanData.iloc[:, 1: 26].values

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 123)


# Feature Scaling
from sklearn.preprocessing import StandardScaler, MinMaxScaler 
sc_processed = StandardScaler()
sc = StandardScaler()
#mm = MinMaxScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)
X_SriLankan = sc.transform(X_SriLankan)

# Fitting classifier to the Training set
# Create your classifier here - knn
from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors = 10)
classifier.fit(X_train, y_train)


#Evaluating the model
# Making the Confusion Matrix
y_pred = classifier.predict(X_test)
y_pred_train = classifier.predict(X_train)
y_pred_sriLankan = classifier.predict(X_SriLankan)

#Evaluating the model
# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix,accuracy_score
cm = confusion_matrix(y_test, y_pred) #(real values, predicted values)
cm2 =  confusion_matrix(y_train, y_pred_train)
print("Testing accuracy for KNN(Turkish data) ", accuracy_score(y_test, y_pred)) ##0.66 without cross validation
print("Training accuracy for KNN(Turkish data) ", accuracy_score(y_train, y_pred_train)) ##0.66 without cross validation
