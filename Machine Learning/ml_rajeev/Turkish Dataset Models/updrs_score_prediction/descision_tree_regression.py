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

# Feature Scaling - needed for SVR 
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
sc_y = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

#y_train = sc_y.fit_transform(y_train.reshape(-1, 1))
#y_test = sc_y.fit_transform(y_test.reshape(-1, 1))



# Fitting Decision Tree Regression to the dataset
from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators = 300, random_state = 0) # n_estimator = no of trees, #random_state = 
regressor.fit(X, y)

# Predicting a new result
y_pred = regressor.predict(X_test)
y_pred_train =regressor.predict(X_train)

np.set_printoptions(precision=0)
#print(np.concatenate((y_pred_real.reshape(len(y_pred), 1),y_test.reshape(len(y_test), 1)),1 ))


#module evaluation
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train))

print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )
