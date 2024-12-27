const {Schema, model} = require('mongoose');

const tutorSchema = new Schema({
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
    qualifications: {
        type: String,
        required: true
    },
    subjects: [
        {type: String}
    ],
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('Tutor', tutorSchema);

