# -*- coding: utf-8 -*-

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# Importing the dataset.
dataset = pd.read_csv('Train Data with UPDRS.csv')
X = dataset.iloc[:, 1: 27].values #matrix of independent features
y = dataset.iloc[:, 27].values #dependent variable