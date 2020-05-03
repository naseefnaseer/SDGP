# Support Vector Machine (SVM)

# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

dataset = pd.read_csv('Train Data with UPDRS_Only Vowels.csv')
X = dataset.iloc[:, 1: 26].values #matrix of independent features 1:26 gives 70% accuracy
y = dataset.iloc[:, 27].values #dependent variable



# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 0)


# Feature Scaling - done so all features are given equal weight to avoid one feature dominating others
from sklearn.preprocessing import StandardScaler
sc = StandardScaler() #standardize the feature by setting it to the z-score
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Fitting SVM to the Training set
from sklearn.svm import SVC
classifier = SVC(kernel = 'linear', random_state = 0)
classifier.fit(X_train, y_train)

# Predicting the Test set results
y_pred = classifier.predict(X_test)
y_pred_train = classifier.predict(X_train)

#Evaluating the model
# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix,accuracy_score
cm = confusion_matrix(y_test, y_pred) #(real values, predicted values)
cm2 =  confusion_matrix(y_train, y_pred_train)
print("Testing accuracy for SVM(Turkish data) ", accuracy_score(y_test, y_pred)) ##0.66 without cross validation
print("Training accuracy for SVM(Turkish data) ", accuracy_score(y_train, y_pred_train)) ##0.66 without cross validation

# Applying k-Fold Cross Validation
from sklearn.model_selection import cross_val_score
accuracies = cross_val_score(estimator = classifier, X = X_train, y = y_train, cv = 10)#cv = number of folds that splits training set into
accuracies.mean()
accuracies.std()
