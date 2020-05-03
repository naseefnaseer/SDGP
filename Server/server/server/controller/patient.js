var patientService = require('../service/patient');
var utilities = require('../service/utility');
var mergeJSON = require("merge-json") ;

/**
 **_ Function to create a patient in the collection.
 _**/
exports.create = function (req, res, next) {
    
    var body = new Patient(req.body);
    if (!body.firstName || !body.lastName || !body.phone || !body.dob || !body.gender) {
        res.status(400).send({message: "Required details are missing"});
        return;
    }

    var apiData = {};
    patientService.createPatient(body, function(error, response){
        if(response){   
            utilities.getAge(response.dob).then(age =>{
                apiData.age = age;

                var newBody = response._doc;

                var result = mergeJSON.merge(newBody, apiData) ;

                res.status(200).send(result);
                return;
    
            });

        }
        else if (error){
            res.status(400).send({message: error});
            return;
        } 
    });
    
}    

 
/**
 _ Function to find the registered patient from user collection using patient ID
 _/
 */
exports.find = function (req, res) {
    var body = req.body || {};

    if (!body.id) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    
    var query = {
        _id: parseInt(body.id)
    };
    
    patientService.findPatient(query, function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        var ageData = {}
        if (response) {
            utilities.getAge(response.dob).then(age =>{
                ageData.age = age;

                var newBody = response._doc;
 
                var result = mergeJSON.merge(newBody, ageData) ;

                res.status(200).send(result); 
                return;
            }); 
    
        }
        if (!response) {
            res.status(202).send({message: 'No patient found'});
            return;
        }
    });
}

/**
 _ Function to get all the registered patient documents
 */
exports.findAll = function (req, res) {
    patientService.findAllPatient(async function (error, response) {
        if (error) {
            res.status(404).send(error);
            return;
        }
        if (response) {
            var array = response;
            
            var newArray = [];
            array.forEach(async element =>  {
                var ageData = {};
                utilities.getAge(element.dob).then(age =>{
                    
                    ageData.age = age;
    
                    var newBody = element._doc;
    
                    var result = mergeJSON.merge(newBody, ageData) ;

                    
                    newArray.push(result);
                
    
                });  
            }); 

            
            await console.log("Sending the patient list with appended age");
            
            await res.status(200).send(newArray);
            return;
        }
        if (!response) {
            res.status(202).send({message: "Patient details not found"});
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
    if (!body.data) {
        res.status(400).send({message: "Update data is missing"});
        return;
    }
    var updateData = body.data || {}
    patientService.updatePatientById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
 _ Function to update the registered patient details by filter condition. (Not used by th system)
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
    if (!body.id) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    query = {
        _id: parseInt(body.id)
    }
    patientService.deletePatient(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(200).send(response);
            }
            if (response.n === 0 && response.ok === 1) {
                res.status(202).send({
                    message: 'Patient not found'
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
        this.age = '-'
        this.gender = userData.gender || '';
        this.address = userData.address || '';
        this.phone = userData.phone || '';
        this.email = userData.email || 'No Email';
        this.lastVisit = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    }
}

