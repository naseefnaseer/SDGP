var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");

autoIncrement.initialize(connection);





var doctorSchema = new mongoose.Schema({
    /*
    doctorID:
    {
        type: Number, 
        // required: true,
        unique: true,
        required: true
    },
    */
    doctorUserName: {
        type: String,
        required: true,
        unique: true
    },
    doctorPassword: {
        type: String,
        required: true,
        unique: false
    },

    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    address: String,
    phone: String
});

doctorSchema.plugin(autoIncrement.plugin, 'Doctor');
var doctor = new mongoose.model('Doctor', doctorSchema);

doctorSchema.plugin(autoIncrement.plugin, 'Doctor');

// doctorSchema.plugin(autoIncrement.plugin, { model: 'Doctor', field: 'doctorID' });

// doctorSchema.plugin(AutoIncrement, {inc_field: '_id'});


 
// module.exports = doctor;

module.exports = mongoose.model('Doctor', doctorSchema);