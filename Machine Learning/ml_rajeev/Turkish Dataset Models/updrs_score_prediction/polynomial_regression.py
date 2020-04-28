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

#create poly matrix
from sklearn.preprocessing import PolynomialFeatures
poly_reg = PolynomialFeatures(degree = 3) # chose the maximum degree
X_poly_train = poly_reg.fit_transform(X_train) # created the poly matrix


# Fitting Linear Regression to the dataset
from sklearn.linear_model import LinearRegression
lin_reg = LinearRegression()
lin_reg.fit(X_poly_train, y_train) #fit poly matrix to regressor

#make predictions
y_pred_train = lin_reg.predict(poly_reg.fit_transform(X_train)) #returns a vector of predictions for X_test 
y_pred = lin_reg.predict(poly_reg.fit_transform(X_test))
#module evaluation
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train))

print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )