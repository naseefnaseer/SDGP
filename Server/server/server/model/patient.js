var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");

autoIncrement.initialize(connection);

var patientSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String, 
        default: ''
    },
    dob: String,
    address: String, 
    phone: String,
}); 
 


patientSchema.plugin(autoIncrement.plugin, 'Patient');

var patient = new mongoose.model('Patient', patientSchema);

module.exports = mongoose.model('Patient',patientSchema);



