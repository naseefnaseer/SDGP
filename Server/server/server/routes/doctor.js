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
 _ TO get the single user by using doctor id
 */

router.get('/doctor/id', doctor.find);

/**
 _ TO get the single user using email
 */

router.get('/doctor/email/:email', doctor.findByEmail);


/**
 _ TO authenticate single user by using email and password (Not used by the system)
 _/ 
 */

// router.get('/doctor/login', doctor.login);


/**
 **_ To update user by doctor id
 _**/

router.put('/update/id', doctor.updateById);

/**
 _ To update the user data by filter condition (Not used by the system)
 */ 

// router.put('/update', doctor.update);

/**
 _ To delete the user by using Doctor ID
 */

router.delete('/delete', doctor.delete);

module.exports = router;