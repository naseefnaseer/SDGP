# VOCALSON
## Project Summary
Parkinson’s disease is a progressive nervous disorder that affects the movement and functions of
an individual. Around 10 million people have been affected by Parkinson’s and has affected Sri
Lanka too, as it is stated around 100 people died due to Parkinson’s in the year 2017.

Currently there is no advanced or efficient way to detect/predict Parkinson’s in Sri Lanka, as the
only ways that are present are the physical examinations and MRI/CT scans, where the former is
ineffective in detecting Parkinson’s at an early stage and the latter is expensive. Therefore, it
would be highly beneficial and efficient if there is an alternative way in detecting Parkinson’s.

Our team’s idea is to implement a system that would assist the doctors in detecting Parkinson’s
through the speech data. The system would consist of a Machine Learning Model that would be
trained with the speech dataset of the patients that our team would acquire. The system would
contain an intuitive and clean User Interface and User Experience for the users (i.e. the doctors,
medical staff, etc.).

## Steps to run the program
Clone the entire git repository in your local system. (Note: It would take some time to clone)
Make sure you have MongoDB isntalled in your system.

### Running the Server
1. Open the "Server" folder, and then, inside that, the "server" folder.
2. Open a Command Prompt and type "mongod" and run it (Type 'cmd' in the location bar if you are using Windows).
3. Open Command Prompt in the folder and type "npm install" (Type 'cmd' in the location bar if you are using Windows).
4. Then, for any file issue prompted in the Command Prompt, use npm install <file> to install that issue.
5. Then, run "node app.js" in the command prompt to run the server (Server would run at the port 4000)

## Running the Client
1. Open "Client" folder and then the "parkinson" folder.
2. Open the command prompt in the folder, and then run "npm install" to install all the dependencies and libraries.
3. Then run "ng serve -o" to run the client (The client would run at port 4200).

## Running the Machine Learning model REST API.
1. Go to the following folder:
  Machine Learning -> ml_rajeev -> API -> Python_REST_API_ML
2. Run the "main.py" file (This would run the REST API).

NOTE: There would be an issue with the model_decision_tree.pkl files
  a. Go to the folder from the original root folder:
    Machine Learning -> ml_rajeev -> Turkish Dataset Models -> mixed_dataset
  b. Here, run the decision_tree.py file; the model_decision_tree.pkl file would get generated.
  c. Copy this file and paste it in the Python_REST_API_ML folder.
  d. Then, run the main.py file again.
  
## IF ANY ISSUES, DON'T HESITATE TO CONTACT US.
