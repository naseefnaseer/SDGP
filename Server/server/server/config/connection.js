var mongoose = require('mongoose');

// Defining mongo URL
var URL = process.env.URL || 'mongodb://localhost/Parkinsons';

mongoose.set('useCreateIndex', true);

mongoose.set('useFindAndModify', false);

//Connection establishment
mongoose.connect(URL, {
    useNewUrlParser: true,
    useCreateIndex: true
});

var db = mongoose.connection;

//Enabling the user
db.on('error', () => {
    console.error('Error occured in db connection');
});

db.on('open', () => {
    console.log('DB Connection established successfully');
});

