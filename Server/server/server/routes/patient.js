var express = require('express');
var router = express.Router();
var patient = require('../controller/patient');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 **_ To create the New user
 _**/
router.post('/', patient.create);

/**
 _ TO get the single user by their username eg.email
 _/
 */
router.get('/patient/:patientID', patient.find);

/**
 **_ To update user data(fields) by user ID
 _**/
router.put('/updatebyid', patient.updateById);

/**
 _ To update the user data by filter condition
 */
router.put('/update', patient.update);

/**
 _ To delete the user by condition
 */
router.delete('/delete', patient.delete);

module.exports = router;