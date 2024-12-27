require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');

// Configure the Google Strategy
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID, // Your Google client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Your Google client secret
            callbackURL: 'http://localhost:4000/auth/google/callback', // Your redirect URI
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Handle user authentication or creation logic
                console.log(profile); // Log profile details for debugging
                return done(null, profile);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// Serialize and deserialize user information
passport.serializeUser((user, done) => {
    done(null, user);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Student.findById(id) || (await Tutor.findById(id));
        done(null, user);

    } catch(err) {
        done(err, null)
    }
})

module.exports = passport;