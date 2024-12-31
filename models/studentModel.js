require('dotenv').config();

const {Schema, model} = require('mongoose');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        tyep: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = model('Student', studentSchema);

