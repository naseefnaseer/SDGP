var mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence')(mongoose);

var connection = require('../config/connection');


// const autoIncrement = AutoIncrementFactory(connection);


var patientSchema = new mongoose.Schema({
    patientID: {
        type: String,
        required: true,
        unique: true
    },
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

var patient = new mongoose.model('Patient', patientSchema);

// patientSchema.plugin(autoIncrement, {inc_field: 'patientID'});

// module.exports = patient;
module.exports = mongoose.model('Patient',patientSchema);



