# Importing the libraries
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset.
dataset = pd.read_csv('Parkinsons Train Data.csv')
X = dataset.iloc[:, 1: 24].values #matrix of independent features
y = dataset.iloc[:, 27].values #dependent variable

# Splitting the dataset into the Training set and Test set
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 12)

# Feature Scaling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test) # need to call fit transfrom first to use transform


# Importing the Keras libraries and packages
import keras # open source toolkit for building deep learning models
from keras.models import Sequential #initializes ANN
from keras.layers import Dense #builds layers on ANN - returns a layer

# Initialising the ANN
classifier = Sequential() #ANN object that acts as a classifier

# Adding the input layer and the first hidden layer - Dense() adds the first hidden layer in which we specify the num of inputs nodes which are for the input layer
classifier.add(Dense(output_dim = 13, init = 'uniform', activation = 'relu', input_dim = 23))
#Dense( #output_dim = No.of nodes in hidden layer (here its 25+1/13) - avg of input and output nodes if not doing k fold, 
        #init = initialize the weights using the uniform function ,
        #activation = activation function used in hidden layer , relu = rectifier function 
        #input_dim = no. of nodes in the input layer - this creates the input layer, only need this for the first hidden layer)
        
# Adding the second hidden layer
classifier.add(Dense(output_dim = 13, init = 'uniform', activation = 'relu'))

# Adding the output layer
classifier.add(Dense(output_dim = 1, init = 'uniform', activation = 'sigmoid')) #change the activation function to sigmoid

# Compiling the ANN - adding stochastic gradient descent to the ANN
classifier.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
#.compile(#optimizer = algorithm to find the optimal set of weights in the ANN, adam = a stochastic gradient descent algorithm)
          #loss = loss function within the adam algorithm, binary_crossentropy since the dependent var is binary
          #metrics = criteria used to evaluate the model

# Fitting the ANN to the Training set
classifier.fit(X_train, y_train, batch_size = 300, nb_epoch = 50)
#.fit(#X_train = matrix of features
      #y_train = dependent var
      #batch_size = no of observations per one weight update
      #nb_epoch = number of times entire dataset is trained)

#Making the predictions and evaluating the model

# Predicting the Test set results
y_pred = classifier.predict(X_test) #returns a probability between 0 and 1
y_pred = (y_pred > 0.5) #threshold for binary value - use higher threshold for medical applications?
#=== returns true if y_pre>0.5 else returns false 
y_pred_train = classifier.predict(X_train) #returns a probability between 0 and 1
y_pred_train = (y_pred_train > 0.5)


# Making the Confusion Matrix
from sklearn.metrics import confusion_matrix, accuracy_score
#cm = confusion_matrix(y_test, y_pred)
print(" testing accuracy of ANN = ", accuracy_score(y_test,y_pred))
print(" training accuracy of ANN = ", accuracy_score(y_train,y_pred_train))
