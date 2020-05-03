var express = require('express');
var router = express.Router();
var doctor = require('../controller/doctor');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 **_ To create the New user for Doctor
 _**/
router.post('/', doctor.create);

/**
 _ TO get the single user by their doctor id
 */
router.get('/doctor/id', doctor.find);

/**
 _ TO get the single user by their doctor id
 */
router.get('/doctor/email', doctor.findByEmail);


/**
 _ TO get the single user by the doctor username 
 _/ 
 */
router.get('/doctor/login', doctor.login);


/**
 **_ To update user by doctor id
 _**/
router.put('/update/id', doctor.updateById);

/**
 _ To update the user data by filter condition
 */ 
router.put('/update', doctor.update);

/**
 _ To delete the user by condition
 */
router.delete('/delete', doctor.delete);

module.exports = router;