const {Schema, model} = require('mongoose');
const jwt = require('jsonwebtoken'); 
require('dotenv').config();

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

// Method to generate JWT for a tutor
tutorSchema.methods.generateJWT = () => {
    const payload = { id: this._id, role: 'tutor' }; // Define the payload
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }); // Generate token
    return token;
};

module.exports = model('Tutor', tutorSchema);

