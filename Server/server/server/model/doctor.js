var mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
    doctorID: {
        type: String,
        required: true,
        unique: true
    },
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
    phone: String,
});

var doctor = new mongoose.model('Doctor', doctorSchema);

// module.exports = doctor;

module.exports = mongoose.model('Doctor', doctorSchema);