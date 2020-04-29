var express = require('express');
var router = express.Router();
var test = require('../controller/test');
<<<<<<< HEAD
const multer  = require('multer') //use multer to upload blob data
const upload = multer(); // set m
const fileupload =require('express-fileupload');
=======
const fileupload = require('express-fileupload');
// const multer  = require('multer') //use multer to upload blob data
// const upload = multer(); // set m
>>>>>>> 81074b5df3f2a54249b9ee4ff4e5f6a1369c07fb

router.use(fileupload({
    useTempFiles:false,
    tempFileDir:"/AudioRecords/"
}))
 
 

// router.post('/', upload.any('audio'), test.create);

/**
 **_ To create the New Test
 _**/

  

<<<<<<< HEAD
=======

>>>>>>> 81074b5df3f2a54249b9ee4ff4e5f6a1369c07fb
router.post('/', test.create);

/**
 _ TO get the test using testID
 _/
 */
router.get('/test/:testID', test.find);
 
/**
 _ TO get all the tests using docID
 _/
 */
router.get('/testDoc/:doctorID', test.findAllByDoc);

/**
 _ TO get the all the tests
 _/
 */
router.get('/test', test.findAll);



/**
 **_ To update the test using testID
 _**/ 
router.put('/updatebyid', test.updateById);

/**
 _ To update the user data by filter condition  
 */
router.put('/update', test.update);

/**
 _ To delete test using a condition
 */
router.delete('/delete', test.delete);

module.exports = router;