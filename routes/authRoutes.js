const express = require('express');
const passport = require('passport');

const router = express.Router();

// Initiate Google authentication
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'], // Request user's profile and email
    })
);

// Handle the callback from Google
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login', // Redirect to login on failure
    }),
    (req, res) => {
        // Successful authentication
        res.redirect('/dashboard'); // Redirect to your application's dashboard or any other route
    }
);

module.exports = router;
