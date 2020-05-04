# -*- coding: utf-8 -*-
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn import model_selection
import joblib

#load datasets
data = pd.read_csv('Sri Lankan Voice Recordings.csv', header = 0) #train data
testData = pd.read_csv('Sri Lankan Dataset - Finalised.csv')    #test data

#Extracting values into variables
X = data.iloc[:, 1:24].values
y = data.iloc[:, -1].values
X_test= testData.iloc[:, 1: 24].values
y_test =  testData.iloc[:, -1].values

#scale matrix of indipendent variables for train and test data
sc = StandardScaler()
X = sc.fit_transform(X) #scale X
X_test = sc.transform(X_test) #scale X_test

#create models for tuned hyper parameters, using k-fold cross validation
from sklearn.tree import DecisionTreeClassifier
classifier = DecisionTreeClassifier(random_state = 20, criterion = 'entropy', max_depth = 5, max_leaf_nodes =  31, min_impurity_decrease =  9.63758389261745e-05, min_samples_split = 8, splitter = 'random') #cv = leave one out
#classifier = DecisionTreeClassifier(random_state = 20, criterion = 'gini', max_depth = 12, max_leaf_nodes =  36, min_impurity_decrease =  7.644295302013423e-05, min_samples_split = 7, splitter = 'random') #cv = 10
#classifier = DecisionTreeClassifier(random_state = 20, criterion = 'entropy', max_depth = 5, max_leaf_nodes =  6, min_impurity_decrease =  1e-05, min_samples_split = 2, splitter = 'best') #cv = 5

classifier.fit(X, y) #fit model with train data
y_pred = classifier.predict(X_test) #make predictions

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

joblib.dump(classifier, 'model_decision_tree.pkl')






