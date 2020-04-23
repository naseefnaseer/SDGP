var mongoose = require('mongoose');

var test = require('./../model/speechtest'); 

// Create new doctor
exports.createTest = function (data, callback) {
    test.create(data).then((response) => {
        callback(null, response);
    }, (error) => {
        callback(error, null);
    });
};

// Find doctor
exports.findTest = function (query, callback) {
    test.findOne(query, callback);
}

// Update doctor by ID
exports.updateTestById = function (id, data, callback) {
    test.findByIdAndUpdate({
        doctorID: id
    }, data, (err, response) => {
        callback(err, response);
    });
}

// Update doctor by Querry
exports.updateTestByQuerry = function (query, data, options, callback) {
    test.findOneAndUpdate(query, data, options, (err, response) => {
        callback(err, response);
    });
}

// Delete doctor by Querry
exports.deleteTest = function (query, callback) {
    test.deleteOne(query, callback);
}