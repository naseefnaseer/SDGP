var mongoose = require('mongoose');

// Model used to do the CRUD operations
var doctor = require('./../model/doctor');
 
// Create new doctor
exports.createDoctor = function (data, callback) {
    doctor.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

// Find doctor
exports.findDoctor = function (query, callback) {
    doctor.findOne(query, callback);
}

// Update doctor by ID
exports.updateDoctorById = function (id, data, callback) {
    doctor.findByIdAndUpdate({
        doctorID: id
    }, data, (err, response) => {
        callback(err, response);
    });
}

// Update doctor by Querry
exports.updateDoctorByQuerry = function (query, data, options, callback) {
    doctor.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
}

// Delete doctor by Querry
exports.deleteDoctor = function (query, callback) {
    doctor.deleteOne(query, callback);
}