var express = require('express');
var router = express.Router();
var test = require('../controller/test');
var fs = require('fs-extra');
var multer = require('multer');

/**
 * Middleware to upload audio
 */
var upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      let type = req.params.type;
      let path = 'E:\\GitHub\\SDGP\\Machine Learning\\ml_rajeev\\API\\voice_data';
      fs.mkdirsSync(path);
      callback(null, path);
    },
    filename: (req, file, callback) => {
      //originalname is the uploaded as the file name
      callback(null, file.originalname);
    }
  })
});

/**
 **_ To create the new Speech Test
 _**/
 
router.post('/', upload.array('audio',5), test.create);

/**
 _ To get the test using testID
 _/
 */

router.get('/test/id', test.find);
 
/**
 _ To get all the tests using Doctor ID
 _/
 */

router.get('/test/doctor/id', test.findAllByDoc);

/**
 _ To get all the tests using Patient ID
 _/
 */

router.get('/test/patient/id', test.findAllByPatient);


/**
 _ To get the all the tests
 _/
 */

router.get('/list', test.findAll);

 
/**
 **_ To update the test using Test ID
 _**/ 

router.put('/update/id', test.updateById);

/**
 _ To update the user data by filter condition  (Not used by the system)
 */

// router.put('/update', test.update);

/**
 _ To delete the test using the Test ID
 */

router.delete('/delete', test.delete);

module.exports = router;