var testService = require('../service/test');

/**
 **_ Function to create the user in user collection.
 _**/
exports.create = function (req, res, next) {

    // var options = {
    //     method: 'GET',
    //     uri: 'http://127.0.0.1:5000/',
    //     json: true // Automatically stringifies the body to JSON
    // };
    // var getReq = await request(options)
    // .then(function (parsedBody){
    //     console.log(parsedBody);
    //     return parsedBody;
    // })
    // .catch(function (error){
    //     console.log(error);
        
    // })


    var body = new Test(req.body);
    if (!body.doctorID || !body.patientID || !body.testResult   ) {
        res.status(400).send('Required details are missing');
        console.log(body); 
        
        return;
    }
    testService.createTest(body, function(error, response){
        if(response){
            res.status(200).send(response);
        }
        else if (error){  
            res.status(400).send(error);
        }
    });
    
}

/**
 _ Function to find user from user collection.
 _/
 */
exports.find = function (req, res) {
    var params = req.params || {};
    var query = {
        patientID: params.patientID
    };
    if (!query) {
        res.status(400).send('Bad Request');
        return;
    }
    testService.findTest(query, function (error, response) {
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
 **_ Function to update the user data  by their ID.
 _**/
exports.updateById = function (req, res) {
    var body = req.body;

    if (!body.id) {
        res.status(400).send('Id is missing');
        return;
    }
    var updateData = body.data || {}
    testService.updateTestById(body.id, updateData, (err, response) => {
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

    testService.updateTest(query, data, options, (err, response) => {
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
    testService.deleteTest(query, function (error, response) {
        if (error) {
            res.status(400).send(error);
            return;
        }
        if (response) {
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

class Test {
    constructor(userData) {
        this.testResult = userData.testResult;
        this.patientID = userData.patientID || '';
        this.doctorID = userData.doctorID || '';
    }
}

