var express = require('express');
var router = express.Router();
var test = require('../controller/test');
const fileupload = require('express-fileupload');
var fs = require('fs-extra');
var multer = require('multer');

/**
 * Middleware to upload audio
 */


var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = `E:\\GitHub\\SDGP\\Machine Learning\\ml_rajeev\\API\\voice_data`;
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded file's name with extn
      callback(null, file.originalname);
    }
  })
});

/**
 **_ To create the New Test
 _**/
 

router.post('/', upload.array('audio',6), test.create);

/**
 _ TO get the test using testID
 _/
 */
router.get('/test/id', test.find);
 
/**
 _ TO get all the tests using doctor ID
 _/
 */
router.get('/test/doctor/id', test.findAllByDoc);

/**
 _ TO get all the tests using patient ID
 _/
 */
router.get('/test/patient/id', test.findAllByPatient);


/**
 _ TO get the all the tests
 _/
 */
router.get('/list', test.findAll);

 

/**
 **_ To update the test using testID
 _**/ 
router.put('/update/id', test.updateById);

/**
 _ To update the user data by filter condition  
 */
router.put('/update', test.update);

/**
 _ To delete test using a condition
 */
router.delete('/delete', test.delete);

module.exports = router;