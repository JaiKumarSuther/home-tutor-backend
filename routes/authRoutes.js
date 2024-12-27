const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google login route
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// Google Callback Route
router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}), (req, res) => {
    // Successful authentication, redirect or respond with token
    const token = req.user ? req.user.generateJWT(): null;
    res.redirect(`/dashboard?token=${token}`);
})

// Logout route
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if(err) {
            return res.status(500).send(err);
        } 
        res.redirect('/');
    })
})

module.exports = router;