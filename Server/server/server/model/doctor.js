var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost/Parkinsons");
autoIncrement.initialize(connection);

/**
 * Mongoose Schema for Doctors
 */

var doctorSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false,
        unique: false
    },

    firstName: {
        type: String,
        default: ''
    },  
    lastName: {
        type: String,
        default: ''
    }
});

// Auto plugin used for the _id of the Doctor Colection
doctorSchema.plugin(autoIncrement.plugin, 'Doctor');

var doctor = new mongoose.model('Doctor', doctorSchema);

module.exports = mongoose.model('Doctor', doctorSchema); 