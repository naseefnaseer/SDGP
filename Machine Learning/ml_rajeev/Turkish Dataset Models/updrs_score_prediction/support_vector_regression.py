import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset.
dataset = pd.read_csv('Train Data with UPDRS_Only Vowels.csv')
X = dataset.iloc[:, 1: 26].values #matrix of independent features
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

y_train = sc_y.fit_transform(y_train.reshape(-1, 1))
y_test = sc_y.fit_transform(y_test.reshape(-1, 1))


# Fitting Multiple SVR to the Training set
from sklearn.svm import  SVR
svr = SVR(kernel = 'linear', C = 1.0, gamma = 1.0) # linear or rbf kernel
'''
'''
svr.fit(X_train, y_train) #trains the machine 

# Predicting the Test set results
y_pred = svr.predict(X_test) #returns a vector of predictions for X_test 

# Predicting the Training set results
y_pred_train = svr.predict(X_train)

#convert all array back to original scale
y_pred_real = sc_y.inverse_transform(y_pred)
y_pred_train_real = sc_y.inverse_transform(y_pred_train)
y_train = sc_y.inverse_transform(y_train)
y_test = sc_y.inverse_transform(y_test) 

np.set_printoptions(precision=0)
print(np.concatenate((y_pred_real.reshape(len(y_pred), 1),y_test.reshape(len(y_test), 1)),1 ))


#module evaluation
from sklearn.metrics import mean_squared_error
rmse = np.sqrt(mean_squared_error(y_test, y_pred_real))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train_real ))

print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )
