var express = require('express');
var router = express.Router();
var test = require('../controller/test');
var fileupload =require('express-fileupload');


router.use(fileupload({
    useTempFiles:true,
    tempFileDir:"/audio_recordings/"
}))
 



// router.post('/', upload.any('audio'), test.create);

/**
 **_ To create the New Test
 _**/

  

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