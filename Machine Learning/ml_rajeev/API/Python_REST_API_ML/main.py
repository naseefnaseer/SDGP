"""Created on Fri May  1 17:39:24 2020
@author: Rajeev Kodippily
"""
from flask import Flask
import praat
import os, pathlib
from os import listdir
from flask import Flask, flash, request, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
import joblib
import pandas as pd
import numpy as np
from sklearn import preprocessing
from sklearn.preprocessing import StandardScaler
import json

app = Flask(__name__)

#read that file and save data in a 2d array
#transform array using scalar used to train data
def getAttributesArray():
    numbers = [] #to store values
    file = open('./all_values.txt')
    lines = file.read().splitlines()
    file.close()
    for i in lines:
        if(i != "@@@"):
            numbers.append(float(i))
            
    print(numbers[0])
    length_of_main_array = len(numbers) / 26 # every recording is 2d array
    length_of_single_array = int(len(numbers) / length_of_main_array)
    m = 0
    final_array = np.zeros((int(length_of_main_array), 26), dtype=float) #initialize final array with 0's
    for i in range(int(length_of_main_array)):
        for j in range(length_of_single_array):
            final_array[i][j] = numbers[m] #append  values into final array
            m = m + 1
            if m == len(numbers) + 1:
                break
    
    #delete files in voice_data
    '''
    mydir = "../voice_data/"
    filelist = [ f for f in os.listdir(mydir)]
    for f in filelist:
        os.remove(os.path.join(mydir, f))
        '''
    return final_array


#make predictions for all 5 arrays
#send results to server

def getPredictions(array):
     model = joblib.load('model_knn_24_features_only_vowel_training_mixed_data.pkl')
     predictions = 0
     probabilities = 0
     probabilities_list_1 = []
     probabilities_list_0 = []
     return_probability = 0
     return_prediction = 0
     trainData = pd.read_csv('Parkinsons Processed Training - Only Vowels.csv')
     X = trainData.iloc[:, 1: 24].values
     sc = StandardScaler()
     X = sc.fit_transform(X)
     
     for row in array:
        median_pitch = row[0]
        mean_pitch = row[1]
        std_dev = row[2]
        min_pitch = row[3]
        max_pitch = row[4]
        num_pulses = row[5]
        num_periods = row[6]
        mean_period = row[7]
        std_dev_period = row[8]
        frac_unvoiced_frames = row[9]
        num_voice_breaks = row[10]
        degree_voice_breaks = row[11]
        jitter1 = row[12]
        jitter2 = row[13]
        jitter3 = row[14]
        jitter4 = row[15]
        jitter5 = row[16]
        shimmer1 = row[17]
        shimmer2 = row[18]
        shimmer3 = row[19]
        shimmer4 = row[20]
        shimmer5 = row[21]
        shimmer6 = row[22]
        ac = row[23]
        ndh = row[24]
        htm = row[25]     
        predict_X = [[jitter1, jitter2, jitter3, jitter4, jitter5, shimmer1, shimmer2, shimmer3, # remove last 3 attribes here
                              shimmer4, shimmer5, shimmer6, ac, ndh, htm, median_pitch, mean_pitch,
                              std_dev, min_pitch, max_pitch, num_pulses, num_periods, mean_period,
                              std_dev_period]]
        predict_X = sc.transform(predict_X)
        predicted_Y = model.predict(predict_X)
        predicted_probability = model.predict_proba(predict_X)
        predictions = predictions + predicted_Y[0]
        print(predicted_Y, predicted_probability[0][1])
        if(predicted_Y[0] == 1):
            probabilities_list_1.append(predicted_probability[0][1])
        elif(predicted_Y[0] == 0):
            probabilities_list_0.append(predicted_probability[0][1])
        
     print(predictions)
     
     if(predictions >= len(array) / 2 ):
         return_prediction = 1
     else:
         return_prediction = 0
     
     if(predictions >= (len(array) / 2)):
         return_probability = (sum(probabilities_list_1) / len(probabilities_list_1) )
     else:
         return_probability = (sum(probabilities_list_0) / len(probabilities_list_0) )
    
     return_probability = str(round(return_probability, 2))
     
     return json.dumps({"prediction":return_prediction, "probability":return_probability})

def createAndSavePatientDataFile(id, timeStamp, prediction):
    fileName = str(id) + '.' + str(timeStamp)
    fileName = fileName.replace('/', '_')
    fileName = fileName.replace(':', '_')
    fileName = fileName.replace(',', '.')
    fileName = fileName.replace(' ', '')
    print("filename ", fileName)
    readFile = open("all_values.txt", "r")
    writeFile = open("../patient_data/"+str(fileName) + '.' + str(prediction) + '.txt', 'w')
    writeFile.write(readFile.read())
    readFile.close()


@app.route('/predict', methods=['POST'])
def returnData():
     praat.extract() #extract the audio files
     array = getAttributesArray()   # extract the attributes
     jsonObject = getPredictions(array) #return prediction
     data = request.get_json()
     id = data['patientID']
     timeStamp = data['timeStamp']
     createAndSavePatientDataFile(id, timeStamp,  json.loads(jsonObject)['prediction'])
     return jsonObject

if __name__ == '__main__':
    app.run()
    
    
   
    