var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require('./server/config/connection');
var multer = require('multer');

var indexRouter = require('./routes/index');

// var usersRouter = require('./routes/users');
var contactRouter = require('./routes/contact');
var patientsRouter = require('./server/routes/patient');
var doctorsRouter = require('./server/routes/doctor');
var testsRouter = require('./server/routes/test');

var app = express();

app.get('/', (req, res) =>{
  res.send('Hello World');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/contact', contactRouter);

app.use('/api/patients', patientsRouter);
app.use('/api/doctor', doctorsRouter);
app.use('/api/test', testsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/**
 * Get port from environment and store in Express.
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



module.exports = app;

//Using multer to store audio files

var storage = multer.diskStorage({ 
  destination: function (req, file, cb) { 

      // Uploads is the Upload_folder_name 
      cb(null, "uploads") 
  },
  filename: function (req, file, cb) { 
      cb(null, file.fieldname + "-" + Date.now()+".mp3") 
    } 
  }) 

  // maximum size of the file
  // picture i.e. 1 MB. it is optional 
const maxSize = 10 * 1000 * 1000; 
  
var upload = multer({  
  storage: storage, 
  limits: { fileSize: maxSize }, 
  fileFilter: function (req, file, cb){ 
  
      // Set the filetypes, it is optional 
      var filetypes = /mp3|wav|mp4/; 
      var mimetype = filetypes.test(file.mimetype); 

      var extname = filetypes.test(path.extname( 
                  file.originalname).toLowerCase()); 
      
      if (mimetype && extname) { 
          return cb(null, true); 
      } 
    
      cb("Error: File upload only supports the "
              + "following filetypes - " + filetypes); 
    }  

// mypic is the name of file attribute 
}).single("audiofile");        

app.get("/",function(req,res){ 
  res.render("app"); 
}) 
  
app.post("/uploadAudioFile",function (req, res, next) { 
      
  // Error MiddleWare for multer file upload, so if any 
  // error occurs, the image would not be uploaded! 
  upload(req,res,function(err) { 

      if(err) { 

          // ERROR occured (here it can be occured due 
          // to uploading image of size greater than 
          // 1MB or uploading different file type) 
          res.send(err) 
      } 
      else { 

          // SUCCESS, image successfully uploaded 
          res.send("Success, AudioFileUploaded!") 
      } 
  }) 
}) 