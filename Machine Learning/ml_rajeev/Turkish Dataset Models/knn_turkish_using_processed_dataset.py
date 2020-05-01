# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

#trainData = pd.read_csv('Parkinsons Processed Training.csv') #training dataset - 520 pwp, 520 healthy
trainData = pd.read_csv('Parkinsons Processed Training - Only Vowels.csv') #trining data - only vowels 60pwp, 60healthy
testData = pd.read_csv('Parkinsons Processed Test.csv')  # 168 recordings of pwp patients - only vowels
sriLankanData = pd.read_csv('Sri Lankan Dataset - with healthy.csv') # 90 recordings of pwp patients - only vowels

#Extracting values into variables
X = trainData.iloc[:, 1: 24].values #matrix of independent features
y = trainData.iloc[:, 28].values #dependent variable
X_SriLankan = sriLankanData.iloc[:, 1: 24].values


from sklearn.preprocessing import StandardScaler, MinMaxScaler 
sc_processed = StandardScaler()
sc = StandardScaler()
X = sc.fit_transform(X)
X_SriLankan = sc.transform(X_SriLankan)


from sklearn.neighbors import KNeighborsClassifier
classifier = KNeighborsClassifier(n_neighbors = 10)
classifier.fit(X, y)
y_pred = classifier.predict(X_SriLankan)

from sklearn.model_selection import cross_val_score

accuracies = cross_val_score(estimator = classifier, X = X, y = y, cv = 10)
print("Accuracy: {:.2f} %".format(accuracies.mean()*100))
print("Standard Deviation: {:.2f} %".format(accuracies.std()*100))

#save the model
from sklearn.externals import joblib
joblib.dump(classifier, 'model_knn_24_features_only_vowel_training.pkl')



'''
X_processed = train_processed.iloc[:, 1: 24].values
X_SriLankan_processed = sriLankanDataProcessed.iloc[:, 1: 24].values
y_processed = train_processed.iloc[:, 28].values

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

X_train_processed = sc_processed.fit_transform(X_processed)
X_SriLankan_processed = sc_processed.transform(X_SriLankan_processed)
'''