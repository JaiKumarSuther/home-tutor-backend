const Tutor = require('../models/tutorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerTutor = async (req, res) => {
    try {
        const { name, email, password, qualifications, subjects, location, grades } = req.body;

        // Check if the tutor already exists
        const existingTutor = await Tutor.findOne({ email });
        if (existingTutor) {
            return res.status(400).json({
                success: false,
                message: 'this tutor already exists'
             });
        };

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing passowrd'
            });
        };

        const tutor = new Tutor({
            name,
            email,
            password: hashedPassword,
            qualifications,
            subjects,
            location,
            grades,
        });

        await tutor.save();
        res.status(201).json({
            success: true,
            message: 'Tutor registered successfully',
            tutor
        });
    

    } catch(error) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    };
};

exports.loginTutor = async(req, res) => {
    try {
        const {email, password} = req.body;

        // Find the Tutor
        let tutor = await Tutor.findOne({email});
    
        if(!tutor) {
            res.status(404).json({
                success: false,
                message: 'tutor not found'
            });
        };
    
        // validate the password
        const isMatch = await bcrypt.compare(password, tutor.password);
        if(!isMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            });
        };

        // Generate JWT token
        const token = jwt.sign({id: tutor._id, role: 'tutor'}, process.env.JWT_SECRET, {expiresIn: '1d'});
        tutor.password = undefined;
        tutor = tutor.toObject();
        tutor.token = token
        res.status(200).json({
            success: true,
            token,
            tutor,
            message: 'Successfully Logged In'
        });

    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}