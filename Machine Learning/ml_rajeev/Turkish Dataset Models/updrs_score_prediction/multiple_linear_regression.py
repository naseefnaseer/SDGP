# -*- coding: utf-8 -*-

#No need feature scaling since co-efficients compensate for that
# y = b0 + b1x1 + b2x2 + b3x3 + ...


import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset.
dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 27].values #matrix of independent features
y = dataset.iloc[:, 27].values #dependent variable

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 0)

# Fitting Multiple Linear Regression to the Training set
from sklearn.linear_model import LinearRegression
regressor = LinearRegression()
regressor.fit(X_train, y_train) #trains the machine 

# Predicting the Test set results
y_pred = regressor.predict(X_test) #returns a vector of predictions for X_test 

# Predicting the Training set results
y_pred_train = regressor.predict(X_train)
np.set_printoptions(precision=0)
print(np.concatenate((y_pred.reshape(len(y_pred), 1),y_test.reshape(len(y_test), 1)),1 ))


#module evaluation
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train ))

print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )
