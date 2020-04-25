var mongoose = require('mongoose'); 
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");

autoIncrement.initialize(connection);

var testSchema = new mongoose.Schema({
    testResult:{
        type: Boolean,
        required: true
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
        type : Date,
        default: Date.now
    },
});


testSchema.plugin(autoIncrement.plugin, 'SpeechTest');

var test = new mongoose.model('Test', testSchema);

module.exports = mongoose.model('SpeechTest', testSchema);
   