// Model used to do the CRUD operations
var test = require('./../model/speechtest'); 

    /**
     * Function to execute the create query to create the users.
     * @param {*} data Test input data
     * @param {*} callback callback function.
     */


// Create new Test
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

// Find all test of doctor
exports.findAllTestByDoc = function (query, callback) {
    test.find(query, callback);
}

// Find all test 
exports.findAllTest = function (callback) {
    test.find(null, callback);
}



// Update doctor by ID
exports.updateTestById = function (id, data, callback) {
    test.findByIdAndUpdate({
        _id: parseInt(id)
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


