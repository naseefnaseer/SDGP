var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");
autoIncrement.initialize(connection);

// Schema for Doctor Collection
var doctorSchema = new mongoose.Schema({
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

// Auto plugin used for the _id of the Doctor Colection
doctorSchema.plugin(autoIncrement.plugin, 'Doctor');

var doctor = new mongoose.model('Doctor', doctorSchema);

doctorSchema.plugin(autoIncrement.plugin, 'Doctor');

module.exports = mongoose.model('Doctor', doctorSchema);