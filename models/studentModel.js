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

// Method to generate JWT for a student
studentSchema.methods.generateJWT = () => {
    const payload = {id: this._id, role: 'Student'};
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    return token;
}

module.exports = model('Student', studentSchema);

