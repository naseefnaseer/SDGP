var express = require('express');
var router = express.Router();
var patient = require('../controller/patient');


/**
 **_ To create a new patient
 _**/
router.post('/', patient.create);

/**
 _ TO get the  registered patient using patientID
 _/
 */
router.get('/patient/:patientID', patient.find);

/**
 _ TO get all the registered patients
 _/
 */
router.get('/list', patient.findAll);


/**
 **_ To update the registered patient using id
 _**/
router.put('/updatebyid', patient.updateById);

/**
 _ To update the registered patient using querry
 */
router.put('/update', patient.update);

/**
 _ To delete the registered patient
 */
router.delete('/delete', patient.delete);

module.exports = router;