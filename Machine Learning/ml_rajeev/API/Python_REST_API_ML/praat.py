# -*- coding: utf-8 -*-
"""
Created on Fri May  1 17:51:44 2020

@author: Asus
"""
#locate audio files, here i have hardcoded 5 files outside of main.py directory
#run praat script & generate one text file with all 26*5 features
import os
from os import listdir
from pathlib import Path
import subprocess

def extract():        
    paths = []
    ALLOWED_EXTENSIONS = ['wav']
    count = 0
    def allowed_file(filename):
        return '.' in filename and \
               filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
    pathth = ""
    patha=""
    try:
        os.remove('all_values.txt')
    except:
        print("new file being created.")
        
    for file in listdir("../voice_data/"):
                    if (allowed_file(file)):
                        patha=('../voice_data/'+ file).replace('\\','/')
                        print(patha)
                        subprocess.call(['Praat.exe','--run','final',patha])
    
                # for i in range(6):
                #     filename = secure_filename(file.filename)
                #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
    
                # string = os.system('"praat" --run final ')
