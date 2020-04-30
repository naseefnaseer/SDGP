

var patientService = require('../service/patient');
var fs = require('fs');

/**
 **_ Function to create a patient in the collection.
 _**/
exports.create = function (req, res, next) {
    var body = new Patient(req.body);
    if (!body.firstName || !body.lastName || !body.phone || !body.dob || !body.gender) {
        res.status(400).send({message: "Required details are missing"});
        return;
    }
    patientService.createPatient(body, function(error, response){
        if(response){
            res.status(200).send(response) 
        }
        else if (error){
            res.status(400).send({message: error});
        }
    });
    
} 


/**
 _ Function to find the registered patient from user collection using patient ID
 _/
 */
exports.find = function (req, res) {
    var params = req.params || {};
    
    var query = {
        _id: parseInt(params.patientID)
    };
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    patientService.findPatient(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            console.log("Hello !!!!!!!");
            
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send({message: "Patient details not found"});
        }
    });
}

/**
 _ Function to get all the registered patient documents
 */
exports.findAll = function (req, res) {
    patientService.findAllPatient(function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send({message: "Patient details not found"});
        }
    });
}


/**
 **_ Function to update the registered patient details using the patient id
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send({message: "Patient ID is missing"});
        return;
    }
    var updateData = body.data || {}
    patientService.updateUserById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
 _ Function to update the registered patient details by filter condition.
 _/
 */
exports.update = function (req, res) {
    var body = req.body;
    var query = body.query;
    var data = body.data;
    var options = body.options
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }

    patientService.updatePatientByQuerry(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
/_*
 _ Function to delete the registered patient from collection.
 */

exports.delete = function (req, res) {
    var body = req.body || {};
    var query = body.query;
    if (!query) {
        res.status(400).send({message :"Bad Request"});
        return;
    }
    patientService.deleteDoctor(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(response);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    msg: 'No data found'
                });
            }
        }
    });
}



/**
 * Constructor for Patient to create a patient object
 *
 */


class Patient {
    constructor(userData) {
        this.firstName = userData.firstName || '';
        this.lastName = userData.lastName || '';
        this.dob = userData.dob || '';
        this.gender = userData.gender || '';
        this.address = userData.address || '';
        this.phone = userData.phone || '';
    }
}

