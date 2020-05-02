var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");

autoIncrement.initialize(connection);

/**
 * Mongoose Schema for Speech tests of patients
 */

var testSchema = new mongoose.Schema({
    testResult:{
        type: Boolean,
        required: true
    },
    updrs: {
        type: String,
        required: true,
        default: ''
    },
    doctorID: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Doctor',
        required: true
    },
    patientID: {
        type: mongoose.Schema.Types.Mixed,
        ref: 'Patient',
        required: true
    },
    testDate: {
        type : String,
        default: '-'
    }
});

// Auto Incrementer for the speechTest id

testSchema.plugin(autoIncrement.plugin, 'SpeechTest');

var test = new mongoose.model('Test', testSchema);

module.exports = mongoose.model('SpeechTest', testSchema);
    