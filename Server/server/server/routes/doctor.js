var express = require('express');
var router = express.Router();
var doctor = require('../controller/doctor');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 **_ To create the New user
 _**/
router.post('/', doctor.create);

/**
 _ TO get the single user by their id
 */
router.get('/doctor/:doctorID', doctor.find);


/**
 _ TO get the single user by their username eg.email
 _/
 */
router.get('/doctor/:email/:pwd', doctor.login);


/**
 **_ To update user data(fields) by user ID
 _**/
router.put('/updatebyid', doctor.updateById);

/**
 _ To update the user data by filter condition
 */
router.put('/update', doctor.update);

/**
 _ To delete the user by condition
 */
router.delete('/delete', doctor.delete);

module.exports = router;