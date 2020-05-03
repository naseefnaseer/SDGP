var express = require('express');
var router = express.Router();
var patient = require('../controller/patient');


/**
 **_ To create a new patient
 _**/
 
router.post('/', patient.create);

/**
 _ TO get the registered patient using Patient ID
 _/
 */

router.get('/patient/id', patient.find);

/**
 _ TO get all the registered patients
 _/
 */

router.get('/list', patient.findAll);


/**
 **_ To update the registered patient using Patient ID
 _**/

router.put('/update/id', patient.updateById);

/**
 _ To update the registered patient using querry (Not used by the system)
 */
// router.put('/update', patient.update);

/**
 _ To delete the registered patient using Patient ID
 */
router.delete('/delete', patient.delete);

module.exports = router;