
var doctorService = require('../service/doctor');
var doctor = require('../model/doctor');



/**
 **_ Function to create the user in doctor collection.
 _**/
exports.create = function (req, res, next) {    

    var body = new Doctor(req.body);
    if (!body.firstName || !body.lastName || !body.phone || !body.doctorUserName || !body.doctorPassword) {
        res.status(400).send({message: "Required details are missing"});
        return;
    }
    doctorService.createDoctor(body, function(error, response){
        if(response){
            res.status(200).send(response)
        }
        else if (error){
            if (error.code == 11000){
                console.log(error);
                
                res.status(400).send({
                    message: "User name is already used"
                });
            }
            else{ 
                res.status(400).send({message: error});
            }
    
        }

    });
    
}


/**
 _ Function to find user from doctor collection.
 _/
 */
exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        doctorID: params.doctorID
    };
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    doctorService.findDoctor(query, function (error, response) {
        if (error) {
            res.status(404).send({message: error});
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send({message: "Doctor not found"});
        }
    });
}

/**
 _ Function valiadte user login
 _/
 */


exports.login = function (req, res) {
    var params = req.params || {};
    var query = {
        doctorUserName: params.email,
        doctorPassword: params.pwd
    };
    
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    doctorService.findDoctor(query, function (error, response) {
        if (error) {
            res.status(404).send({message: error});
            return;
        }
        if (response) {
            loginBody = response;
            if (doctorPassword = response.doctorPassword){
                res.status(200).send(response);
            }
            else{
                res.status(200).send({message: 'Password is not matching'});
            }
            return;
        }
        if (!response) {
            res.status(204).send({message: "No Data Found"});
        }
    });
}



/**
 **_ Function to update the user data  by their ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send({message: "Doctor ID is missing"});
        return;
    }
    var updateData = body.data || {}
    doctorService.updateDoctorById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
 _ Function to uodate the user data by filter condition.
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

    doctorService.updateDoctor(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
/_*
 _ Function to delete the user from collection.
 */

exports.delete = function (req, res) {
    var body = req.body || {};

    var query = body.query;
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    doctorService.deleteDoctor(query, function (error, response) {
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
                    message: 'No data found'
                });
            }
        }
    });
}

class Doctor {
    constructor(userData) {
        this.firstName = userData.firstName || '';
        this.lastName = userData.lastName || '';
        this.doctorUserName = userData.doctorUserName || '';
        this.doctorPassword = userData.doctorPassword || '';
        this.address = userData.address || '';
        this.phone = userData.phone || '';
    }
}

