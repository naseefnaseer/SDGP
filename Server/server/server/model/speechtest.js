var mongoose = require('mongoose'); 

var testSchema = new mongoose.Schema({
    testID: {
        type: String,
        required: true,
        unique: true
    },
    speech:{
        type: String,
        required: true
    },
    testResult:{
        type: Boolean,
        required: true
    },
    doctorID: {
        type: Schema.Types.doctorID,
        ref: 'Doctor',
        required: true
    },
    patientID: {
        type: Schema.Types.patientID,
        ref: 'Patient',
        required: true
    },
    testDate: Date,
});

var test = new mongoose.model('Test', testSchema);

// module.exports = test;

module.exports = mongoose.model('SpeechTest', testSchema);