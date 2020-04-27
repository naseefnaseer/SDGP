# -*- coding: utf-8 -*-
"""
Created on Sun Apr 26 21:03:32 2020

@author: Asus
"""
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd


# Importing the dataset.
dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 27].values #matrix of independent features
y = dataset.iloc[:, 27].values #dependent variable

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 1)

# Feature Scaling
from sklearn.preprocessing import StandardScaler, MinMaxScaler #use min max scalar
sc = StandardScaler()
mm = MinMaxScaler()
X_train = sc.fit_transform(X_train)

import joblib
modelANN = joblib.load('ann_regression_model.pkl')
#testing the test dataset
pred_data = pd.read_csv('Parkinsons Test Data.csv', header=0)
X_predTest = pred_data.iloc[:, :].values

#scale using sc
X_predTest =  sc.transform(X_predTest)

#predict the test set
y_pred_test_set = modelANN.predict(X_predTest)



