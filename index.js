// Import required modules
const express = require('express'); // Framework for building web applications
require('dotenv').config(); // Loads environment variables from a .env file
const connectDB = require("./config/db"); // Import database connection function


// Initialize the Express application
const app = express();

// body parser
app.use(express.json());

// Load port number from environment variables
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined

// Connect to the database
connectDB();

// Middleware to handle routes for students and tutors
app.use('/api/students', require('./routes/studentRoutes')); // Routes for student-related APIs
app.use('/api/tutors', require('./routes/tutorRoutes')); // Routes for tutor-related APIs

// Define a basic home route
app.get('/', (req, res) => {
    res.send('This is the home page for home tutor backend'); // Send a simple response
});

// Start the server
app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`); // Log the server start message
});
