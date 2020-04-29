var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");

autoIncrement.initialize(connection);

/**
 * Mongoose Schema for Patients
 */


var patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String, 
        default: ''
    },
    gender: String,
    dob: String,
    address: String, 
    phone: String,
    lastVisit: String
}); 
 

// Auto Incrementer for the speechTest id

patientSchema.plugin(autoIncrement.plugin, 'Patient');

var patient = new mongoose.model('Patient', patientSchema);

module.exports = mongoose.model('Patient',patientSchema);



