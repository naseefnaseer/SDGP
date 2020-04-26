
var patient = require('./../model/patient');


    /**
     * Function to execute the create query to create the users.
     * @param {*} data user data
     * @param {*} callback callback function.
     */
 

// Create new patient
exports.createPatient = function(data, callback) {
    patient.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
}

// Find patient
exports.findPatient = function (query, callback) {
    patient.findOne(query, callback);
}

// Update patient by ID
exports.updatePatientById = function (id, data, callback) {
    patient.findByIdAndUpdate({
        patientID: id
    }, data, (err, response) => {
        callback(err, response); 
    });
}

// Update patient by Querry
exports.updatePatientByQuerry = function (query, data, options, callback) {
    patient.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
}

// Delete doctor by Querry
exports.deleteDoctor = function (query, callback) {
    patient.deleteOne(query, callback);
}
