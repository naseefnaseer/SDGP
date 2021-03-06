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
    email: String,
    phone: String,
    lastVisit: {
        type: String,
        default: '-'
    }
}); 
 

// Auto Incrementer plugin for the Patient _id

patientSchema.plugin(autoIncrement.plugin, 'Patient');

var patient = new mongoose.model('Patient', patientSchema);

module.exports = mongoose.model('Patient',patientSchema);



