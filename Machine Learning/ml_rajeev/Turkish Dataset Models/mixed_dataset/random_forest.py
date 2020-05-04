# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import model_selection
import joblib

#load datasets
data = pd.read_csv('Sri Lankan Voice Recordings.csv', header = 0)
testData = pd.read_csv('Sri Lankan Dataset - Finalised.csv')

#Extracting values into variables
X = data.iloc[:, 1:24].values
y = data.iloc[:, -1].values
X_test= testData.iloc[:, 1: 24].values
y_test =  testData.iloc[:, -1].values

#scale matrix of indipendent variables for train and test data
sc = StandardScaler()
X = sc.fit_transform(X) #scale X
X_test = sc.transform(X_test) #scale X_test

from sklearn.ensemble import RandomForestClassifier
classifier = RandomForestClassifier(n_estimators = 20, min_samples_split =  2, min_samples_leaf = 1, max_depth = 19, criterion =  'gini',bootstrap = True) #cv = leave one out
#classifier = RandomForestClassifier(n_estimators = 4, min_samples_split =  5, min_samples_leaf = 5, max_depth = 10, criterion =  'gini',bootstrap = True) #cv = 10
#classifier = RandomForestClassifier(n_estimators = 10, min_samples_split =  9, min_samples_leaf = 2, max_depth = 7, criterion =  'entropy',bootstrap = False) #cv = 5

classifier.fit(X, y)

y_pred = classifier.predict(X_test)

#Model evaluation
leave_one_out = model_selection.LeaveOneOut()
from sklearn.model_selection import cross_val_score
from sklearn.metrics import confusion_matrix,accuracy_score

accuracies = cross_val_score(estimator = classifier, X = X, y = y, cv = leave_one_out)
print("Training Accuracy = {:.2f} %".format(accuracies.mean()*100))

cm = confusion_matrix(y_test, y_pred) #(real values, predicted values)
print("Testing accuracy = {:.2f} %".format( accuracy_score(y_test, y_pred) * 100))

print ("TN =", cm[0][0] , "TP =", cm[1][1])
print ("FP =", cm[0][1] , "FN =", cm[1][0])

joblib.dump(classifier, 'model_random_forest.pkl')

