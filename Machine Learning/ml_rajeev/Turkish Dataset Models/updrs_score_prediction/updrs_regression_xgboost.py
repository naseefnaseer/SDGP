# -*- coding: utf-8 -*-
# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import xgboost as xgb


dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 26].values #matrix of independent features 1:26 gives 70% accuracy
y = dataset.iloc[:, 27].values #dependent variable

data_dmatrix = xgb.DMatrix(data=X,label=y)

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 123)


# Feature Scaling - done so all features are given equal weight to avoid one feature dominating others
from sklearn.preprocessing import StandardScaler
sc = StandardScaler() #standardize the feature by setting it to the z-score
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Fitting XGBoost to the Training set
from xgboost import XGBRegressor, XGBRFRegressor
data_dmatrix = xgb.DMatrix(data=X_train,label=y_train)

xg_reg = xgb.XGBRegressor(objective ='reg:linear', colsample_bytree = 0.3, learning_rate = 0.1,
                max_depth = 5, alpha = 10, n_estimators = 10)
xg_reg.fit(X_train, y_train)

# Predicting the Test set results
y_pred = xg_reg.predict(X_test)

# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix
#cm = confusion_matrix(y_test, y_pred)

# Applying k-Fold Cross Validation
from sklearn.model_selection import cross_val_score
accuracies = cross_val_score(estimator = xg_reg, X = X_train, y = y_train, cv = 10)
accuracies.mean()
accuracies.std()