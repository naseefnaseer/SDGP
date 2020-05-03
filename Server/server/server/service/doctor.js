// Model used to do the CRUD operations
var doctor = require('./../model/doctor');

    /**
     * Function to execute the create query to create the users.
     * @param {*} data Doctor input data
     * @param {*} callback callback function.
     */

 
// Create new doctor
exports.createDoctor = function (data, callback) {
    doctor.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

// Find Doctor
exports.findDoctor = function (query, callback) {
    doctor.findOne(query, callback);
}

// Find Doctor using email ID
exports.findDoctorUsingEmail = function (query, callback) {
    doctor.findOne(query, callback);
}


// Update Doctor by ID
exports.updateDoctorById = function (id, data, callback) {
    doctor.findByIdAndUpdate({
        _id: parseInt(id)
    }, data, (err, response) => {
        callback(err, response);
    });
}

// Update Doctor by Querry (Not used by the system)
exports.updateDoctorByQuerry = function (query, data, options, callback) {
    doctor.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
}

// Delete Doctor by Querry 
exports.deleteDoctor = function (query, callback) {
    doctor.deleteOne(query, callback);
}