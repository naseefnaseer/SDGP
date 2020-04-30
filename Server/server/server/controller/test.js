var testService = require('../service/test');
patientController = require('./patient')

/**
 **_ Function to create the test.
 _**/
 
exports.create = function (req, res, next) {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

    req.files.p_audio.mv("/audio_recordings/" + req.files.p_audio.name,function(err){
        if(err){ 
            return res.status(500).send(err)
        };
        console.log("File Uploaded successfully");
        // res.status(200).send({message: 'Upload Successful'});
        
    }); 
 
    // var pyRes; 
    
    /**
     * axios is a http client. Here it is used to send the location of the patient's audio file to the flask restAPI
     */

    // axios.post('http://localhost:5000/get_prediction', req.file) 
    // .then((res) => {
    //     pyRES = res.data
    // }).catch((err) => {
    //     console.error(err); 
    // });

    // console.log(pyRes);

    var sbody = {
        doctorID: 1,
        patientID: 2,
        testResult: true,
        updrs: 23.45 
    }


    var body = new Test(sbody);
    if (!body.doctorID || !body.patientID ) {
        res.status(400).send({message : "Required Details are missing"});
        return;
    }
    testService.createTest(body, function(error, response){
        if(response){
            // id = body.patientID
            // patientController.updateById()
            res.status(200).send(response);
        }
        else if (error){  
            res.status(400).send({message: error});
        }
    });
    
}

/**
 _ Function to find Test from test collection using test ID
 _/
 */
exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        _id: parseInt(params.testID)
    }; 
    if (!query) {
        res.status(500).send({message: "Bad Request"});
        return;
    }
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
            res.status(204).send({message: "No Data Found"});
            return;
        } 
    });
}

/**
 _ Function to find all Tests done by a doctor from test collection using doctorID
 _/
 */
exports.findAllByDoc = function (req, res) {
    var params = req.params || {};
    var query = {
        doctorID: parseInt(params.doctorID)
    };
    if (!query) {
        res.status(500).send({message: "Bad Request"});
        return;
    }
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
            res.status(204).send({message: "No Data Found"});
        }
    });
}

/**
 _ Function to find all Tests by doc from test collection.
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
 _ Function to update the test data by filter condition.
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
    var query = body.query;
    if (!query) {
        res.status(400).send({message: "Bad Request"});
        return;
    }
    testService.deleteTest(query, function (error, response) {
        if (error) {
            res.status(400).send({message: error});
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

/**
 * Defined constructor to create a test object
 */
class Test {
    constructor(userData) {
        this.testResult = userData.testResult;
        this.patientID = userData.patientID || '';
        this.doctorID = userData.doctorID || '';
        this.updrs = userData.updrs;
        this.testDate = new Date().toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
    }
}

