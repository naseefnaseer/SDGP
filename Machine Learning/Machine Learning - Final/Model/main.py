import os
from app import app
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
import joblib
import pandas as pd
import json
import numpy as np
from sklearn import preprocessing

api = Api(app)

modelXGBoost = joblib.load('finalModel_Deployment.pkl')
data = pd.read_csv(r'..\Datasets\Parkinsons Train Data.csv', header=0)
cols_11 = ['Jitter(local)', 'Jitter(local, absolute)', 'Jitter (rap)',
           'Jitter (ppq5)', 'Jitter (ddp)', 'Shimmer (local)',
           'Shimmer (local, db)', 'Shimmer (apq3)', 'Shimmer (apq5)',
           'Shimmer (apq11)', 'Shimmer (dda)', 'AC', 'NDH', 'HTM', 'Median Pitch',
           'Mean Pitch', 'Standard deviation', 'Minimum pitch', 'Maximum pitch',
           'Number of pulses', 'Number of periods', 'Mean period',
           'Standard deviation of period', 'Fraction of locally unvoiced frames',
           'Number of voice breaks', 'Degree of voice breaks']
data_11 = data[cols_11]
X = data_11.loc[:, data_11.columns != 'status'].values


min_max_scaler = preprocessing.MinMaxScaler()
minmax_scaled_X = min_max_scaler.fit_transform(X)


class MakePredictionXGBoost(Resource):

    @staticmethod
    def post():
        posted_data = request.get_json()
        # posted_data = json.loads(post_data)
        # test_json = json.loads(posted_data)
        jitter1 = posted_data["Jitter(local)"]
        jitter1 = json.loads(jitter1)
        jitter2 = posted_data["Jitter(local, absolute)"]
        jitter2 = json.loads(jitter2)
        jitter3 = posted_data["Jitter (rap)"]
        jitter3 = json.loads(jitter3)
        jitter4 = posted_data["Jitter (ppq5)"]
        jitter4 = json.loads(jitter4)
        jitter5 = posted_data["Jitter (ddp)"]
        jitter5 = json.loads(jitter5)
        shimmer1 = posted_data["Shimmer (local)"]
        shimmer1 = json.loads(shimmer1)
        shimmer2 = posted_data["Shimmer (local, db)"]
        shimmer2 = json.loads(shimmer2)
        shimmer3 = posted_data["Shimmer (apq3)"]
        shimmer3 = json.loads(shimmer3)
        shimmer4 = posted_data["Shimmer (apq5)"]
        shimmer4 = json.loads(shimmer4)
        shimmer5 = posted_data['Shimmer (apq11)']
        shimmer5 = json.loads(shimmer5)
        shimmer6 = posted_data["Shimmer (dda)"]
        shimmer6 = json.loads(shimmer6)
        ac = posted_data['AC']
        ac = json.loads(ac)
        ndh = posted_data['NDH']
        ndh = json.loads(ndh)
        htm = posted_data['HTM']
        htm = json.loads(htm)
        median_pitch = posted_data['Median Pitch']
        median_pitch = json.loads(median_pitch)
        mean_pitch = posted_data['Mean Pitch']
        mean_pitch = json.loads(mean_pitch)
        std_dev = posted_data['Standard deviation']
        std_dev = json.loads(std_dev)
        min_pitch = posted_data['Minimum pitch']
        min_pitch = json.loads(min_pitch)
        max_pitch = posted_data['Maximum pitch']
        max_pitch = json.loads(max_pitch)
        num_pulses = posted_data['Number of pulses']
        num_pulses = json.loads(num_pulses)
        num_periods = posted_data['Number of periods']
        num_periods = json.loads(num_periods)
        mean_period = posted_data['Mean period']
        mean_period = json.loads(mean_period)
        std_dev_period = posted_data['Standard deviation of period']
        std_dev_period = json.loads(std_dev_period)
        frac_unvoiced_frames = posted_data['Fraction of locally unvoiced frames']
        frac_unvoiced_frames = json.loads(frac_unvoiced_frames)
        num_voice_breaks = posted_data['Number of voice breaks']
        num_voice_breaks = json.loads(num_voice_breaks)
        degree_voice_breaks = posted_data['Degree of voice breaks']
        degree_voice_breaks = json.loads(degree_voice_breaks)
        #
        predict_X = [jitter1, jitter2, jitter3, jitter4, jitter5, shimmer1, shimmer2, shimmer3, shimmer4, shimmer5,
                     shimmer6, ac, ndh, htm, median_pitch, mean_pitch, std_dev, min_pitch, max_pitch,
                     num_pulses, num_periods, mean_period, std_dev_period, frac_unvoiced_frames,
                     num_voice_breaks, degree_voice_breaks]
        print(minmax_scaled_X)
        print(predict_X)
        #
        predict_X = min_max_scaler.transform(predict_X)
        print(predict_X)
        #
        prediction = modelXGBoost.predict(predict_X)
        print(prediction)
        if prediction == 0:
            predicted_class = 'Parkinson\'s negative'
            predicted_value = 0
        elif prediction == 1:
            predicted_class = 'Parkinson\'s positive'
            predicted_value = 1

        return jsonify({
            "Output": predicted_class,
            "Value": predicted_value
        })


api.add_resource(MakePredictionXGBoost, '/predict/xgboost')

if __name__ == '__main__':
    app.run(debug=True, port=3000)
