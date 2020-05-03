# -*- coding: utf-8 -*-
# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import xgboost as xgb


dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 26].values #matrix of independent features 1:26 gives 70% accuracy
y = dataset.iloc[:, 27].values #dependent variable


# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.25, random_state = 123)


# Feature Scaling - done so all features are given equal weight to avoid one feature dominating others
from sklearn.preprocessing import StandardScaler, MinMaxScaler
sc = StandardScaler() #standardize the feature by setting it to the z-score
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

# Fitting XGBoost to the Training set
from xgboost import XGBRegressor, XGBRFRegressor

xg_reg =XGBRegressor(objective ='reg:squarederror', colsample_bytree = 0.3, learning_rate = 0.1,
                max_depth = 2, alpha = 10, n_estimators = 20)
xg_reg.fit(X_train, y_train)

# Predicting the Test set results
y_pred = xg_reg.predict(X_test)
y_pred_train = xg_reg.predict(X_train)
#module evaluation
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train ))

print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )
