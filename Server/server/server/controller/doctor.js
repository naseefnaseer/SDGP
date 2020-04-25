var doctorService = require('../service/doctor');
var doctor = require('../model/doctor');



/**
 **_ Function to create the user in doctor collection.
 _**/
exports.create = function (req, res, next) {    

    var body = new Doctor(req.body);
    if (!body.firstName || !body.lastName || !body.phone || !body.doctorUserName || !body.doctorPassword) {
        res.status(400).send('Required details are missing');
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
                    msg: "Duplicate"
                });
            }
            else{ 
                res.status(400).send(error);
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
        res.status(400).send('Bad Request');
        return;
    }
    doctorService.findDoctor(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
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
        res.status(400).send('Bad Request');
        return;
    }
    doctorService.findDoctor(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            loginBody = response;
            if (doctorPassword = response.doctorPassword){
                res.status(200).send(response);
            }
            else{
                res.status(200).send({'msg': 'Password is not matching'});
            }
            return;
        }
        if (!response) {
            res.status(204).send('No Data Found');
        }
    });
}



/**
 **_ Function to update the user data  by their ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    doctorService.updateDoctorById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
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
        res.status(400).send('Bad request');
        return;
    }

    doctorService.updateDoctor(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send(err);
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
        res.status(400).send('Bad Request');
        return;
    }
    doctorService.deleteDoctor(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            console.log(response.n);
            console.log(response);
            
            if (response.n === 1 && response.ok === 1) {
                res.status(202).send(body);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(204).send({
                    message: 'No data found'
                });
            }
        }
    });
}

/**
 Storing audio files 
 **/


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

