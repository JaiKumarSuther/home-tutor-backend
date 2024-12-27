const Student = require('../models/studentModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.registerStudent = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existingStudent = await Student.findOne({email});
        if (existingStudent) {
            return res.status(400).json({
                success: false,
                message: 'this student already exists'
             })
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch(err) {
            return res.status(500).json({
                success: false,
                message: 'Error in hashing passowrd'
            });
        }

        const student = new Student({name: name, email: email, password: hashedPassword});
        await student.save();

        return res.status(201).json({
            success: true,
            message: "user created successfully",
            student
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

// Login Student
exports.loginStudent = async(req, res) => {
    try {
        const {email, password} = req.body;

        // Find the Student
        let student = await Student.findOne({email});
    
        if(!student) {
            res.status(404).json({
                success: false,
                message: 'Student not found'
            })
        }
    
        // validate the password
        const isMatch = await bcrypt.compare(password, student.password);
        if(!isMatch) {
            res.status(401).json({
                success: false,
                message: 'Invalid Credentials'
            })
        }

        // Generate JWT token
        const token = jwt.sign({id: student._id, role: 'student'}, process.env.JWT_SECRET, {expiresIn: '1d'});
        student.password = undefined;
        student = student.toObject();
        student.token = token
        res.status(200).json({
            success: true,
            token,
            student,
            message: 'Successfully Logged In'
        })

    } catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}
