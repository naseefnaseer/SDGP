var express = require('express');
var router = express.Router();
var test = require('../controller/test');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

/**
 **_ To create the New user
 _**/
router.post('/', test.create);

/**
 _ TO get the single user by their username eg.email
 _/
 */
router.get('/test/:testID', test.find);

/**
 **_ To update user data(fields) by user ID
 _**/
router.put('/updatebyid', test.updateById);

/**
 _ To update the user data by filter condition
 */
router.put('/update', test.update);

/**
 _ To delete the user by condition
 */
router.delete('/delete', test.delete);

module.exports = router;