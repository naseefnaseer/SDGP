# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset.
dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 27].values #matrix of independent features
y = dataset.iloc[:, 27].values #dependent variable
y = y.reshape(y.shape[0], 1)

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.20, random_state = 12)

# Feature Scaling
from sklearn.preprocessing import StandardScaler, MinMaxScaler #use min max scalar
sc = StandardScaler()
mm = MinMaxScaler()
X_train = mm.fit_transform(X_train)
X_test = mm.transform(X_test) # need to call fit transfrom first to use transform


# Importing the Keras libraries and packages
import keras # open source toolkit for building deep learning models
from keras.models import Sequential #initializes ANN
from keras.layers import Dense #builds layers on ANN - returns a layer
from keras.optimizers import Adam

# Initialising the ANN
classifier = Sequential() #ANN object that acts as a classifier

# Adding the input layer and the first hidden layer - Dense() adds the first hidden layer in which we specify the num of inputs nodes which are for the input layer
classifier.add(Dense(output_dim = 13, kernel_initializer='he_uniform', activation = 'relu', input_dim = 26))
#Dense( #output_dim = No.of nodes in hidden layer (here its 25+1/2=13) - avg of input and output nodes if not doing k fold, 
        #init = initialize the weights using the uniform function ,
        #activation = activation function used in hidden layer , relu = rectifier function 
        #input_dim = no. of nodes in the input layer - this creates the input layer, only need this for the first hidden layer)
        
# Adding the second hidden layer
classifier.add(Dense(output_dim = 13, init = 'uniform', activation = 'relu'))
#classifier.add(Dense(output_dim = 5, init = 'uniform', activation = 'relu'))

# Adding the output layer
classifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'linear')) #change the activation function to linear

# Compiling the ANN - adding stochastic gradient descent to the ANN
classifier.compile("adam", loss="mse", metrics = ["mse"])
#.compile(#optimizer = algorithm to find the optimal set of weights in the ANN, adam = a stochastic gradient descent algorithm)
          #loss = loss function within the adam algorithm, binary_crossentropy since the dependent var is binary
          #metrics = criteria used to evaluate the model

# Fitting the ANN to the Training set
classifier.fit(X_train, y_train, batch_size = 3, nb_epoch = 200)
#.fit(#X_train = matrix of features
      #y_train = dependent var
      #batch_size = no of observations per one weight update
      #nb_epoch = number of times entire dataset is trained)

#Making the predictions and evaluating the model

from sklearn.metrics import mean_squared_error
# Predicting the Test set results
y_pred = classifier.predict(X_test) #returns a probability between 0 and 1
y_pred_train = classifier.predict(X_train)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
rmse_train = np.sqrt(mean_squared_error(y_train, y_pred_train ))
print("RMSE(Root mean square error) for testing set = ", rmse )
print("RMSE(Root mean square error) for training set = ", rmse_train )


#testing the test dataset
pred_data = pd.read_csv('Parkinsons Test Data.csv', header=0)
X_predTest = pred_data.iloc[:, :].values

#scale using sc
X_predTest = mm.transform(X_predTest)

#predict the test set
y_pred_test_set = classifier.predict(X_predTest)



import joblib
joblib.dump(classifier, 'ann_regression_model.pkl')
print("Model dumped!")

