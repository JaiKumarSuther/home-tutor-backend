// Import required modules
const express = require('express'); // Framework for building web applications
require('dotenv').config(); // Loads environment variables from a .env file
const connectDB = require('./config/db'); // Import database connection function
const passport = require('passport'); // Passport.js for authentication
const session = require('express-session'); // Session middleware

// Load Passport configuration
require('./config/passport');

// Initialize the Express application
const app = express();

// Middleware for parsing JSON bodies
app.use(express.json());

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET, // Load secret from environment variables
        resave: false, // Do not save session if not modified
        saveUninitialized: true, // Save uninitialized sessions
    })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load port number from environment variables or use default (5000)
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware to handle routes
app.use('/api/students', require('./routes/studentRoutes')); // Routes for student-related APIs
app.use('/api/tutors', require('./routes/tutorRoutes')); // Routes for tutor-related APIs
app.use('/auth', require('./routes/authRoutes')); // Routes for Google authentication

// Define a basic home route
app.get('/', (req, res) => {
    res.send('This is the home page for home tutor backend'); // Send a simple response
});

// Start the server
app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`); // Log the server start message
});
