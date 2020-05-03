var testService = require('../service/test');
var patientService = require('../service/patient');
var utilities = require('../service/utility');
var axios = require('axios');





/**
 **_ Function to create the test.
 _**/
exports.create = function (req, res, next) {

    var body = req.body || {};

    if (!req.files) {
        res.status(400).send({message: 'No files were uploaded.'});
        return ;
    }

    if (!body.doctorID || !body.patientID ) {
        res.status(400).send({message : "Required Details are missing"});
        return;
    }

    var patientID = body.patientID;

    var doctorID = body.doctorID;  

    updateData = {
        lastVisit: new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"})
    };

    reqML = {
        patientID: parseInt(patientID),
        timeStamp: updateData.lastVisit
    }
 
    var testPred ={};
    /**
     * axios is a http client. Here it is used to send the location of the patient's audio file to the flask restAPI
     */

    
    // async function getPredict(){

    axios.post('http://localhost:5000/predict', reqML) 
    .then(async (resp) => {
        
        body.testResult = resp.data.prediction;
        body.predictionProbability = resp.data.probability;



        if(parseInt(resp.data.prediction) === 1 ){
            body.testResult = true;
        }
        else if(parseInt(resp.data.prediction) === 0){
            body.testResult = false;
        }

        body.parkinsonProbability = resp.data.probability;
        
    
    patientService.updatePatientById(patientID, updateData, (err, response) => {
        if (response) {
            console.log("Last Vist Changed");            
        } else if (err) {
            console.log("Last Visit unchanged");
            
        }
    });

    

    var newTest = new Test(body);
    testService.createTest(newTest, function(error, response){
        if(response){
            // id = body.patientID
            // patientController.updateById()
            res.status(200).send(response);
            return;
        }   
        else if (error){  
            res.status(400).send({message: error}); 
            return; 
        }
    });

}).catch((err) => {
    console.log(err);
    return err;
});

    
}

/**
 _ Function to find Test from test collection using test ID
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

    testService.findTest(query, function (error, response) {
        if (error) {
            res.status(404).send({message : error});
            return;
        }
        if (response) {                  
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(202).send({message: "No Data Found"});
            return;
        } 
    });
}

/**
 _ Function to find all Tests done by a doctor from test collection using doctorID
 _/
 */
exports.findAllByDoc = function (req, res) {
    var body = req.body || {};

    if (!body.id) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    
    var query = {
        doctorID: parseInt(body.id)
    };

    testService.findAllTestByDoc(query, function (error, response) {
        if (error) {
            res.status(404).send({message : error});
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(202).send({message: "No Data Found"});
        }
    });
}

/**
 _ Function to find all Tests done by a doctor from test collection using doctorID
 _/
 */
exports.findAllByPatient = function (req, res) {
    var body = req.body || {};

    if (!body.id) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    
    var query = {
        patientID: parseInt(body.id)
    };
    testService.findAllTestByDoc(query, function (error, response) {
        if (error) {
            res.status(404).send({message : error});
            return;
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(202).send({message: "No Data Found"});
        }
    });
}


/**
 _ Function to find all Tests from test collection.
 _/
 */
exports.findAll = function (req, res) {

    testService.findAllTest(function (error, response) {
        if (error) {
            res.status(404).send({message : error});
            return; 
        }
        if (response) {
            res.status(200).send(response);
            return;
        }
        if (!response) {
            res.status(204).send({message: "No Data Found"});
        }
    });
}



/**
 **_ Function to update the test data  by the test ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send({message: "Test ID is missing"});
        return;
    }
    if (!body.data) {
        res.status(400).send({message: "Update data is missing"});
        return;
    }
    var updateData = body.data || {}

    testService.updateTestById(body.id, updateData, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({messsage: err});
        }
    });
}

/**
 _ Function to update the test data by filter condition. (Not used by the system)
 _/
 */
exports.update = function (req, res) {
    var body = req.body;
    var query = body.query;
    var data = body.data;
    var options = body.options
    if (!query) {
        res.status(400).send({message: "Bad request"});
        return;
    }

    testService.updateTest(query, data, options, (err, response) => {
        if (response) {
            res.status(200).send(response);
        } else if (err) {
            res.status(400).send({message: err});
        }
    });
}

/**
/_*
 _ Function to delete the test from the collection
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
    testService.deleteTest(query, function (error, response) {
        if (error) {
            res.status(400).send({message: error});
            return;
        }
        if (response) {
            if (response.n === 1 && response.ok === 1) {
                res.status(200).send({message: "Patient successfully deleted"});
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
 * Defined constructor to create a test object
 */
class Test {
    constructor(userData) {
        this.testResult = userData.testResult;
        this.patientID = userData.patientID || '';
        this.doctorID = userData.doctorID || '';
        this.parkinsonProbability = userData.parkinsonProbability;
        this.testDate = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    }
}

