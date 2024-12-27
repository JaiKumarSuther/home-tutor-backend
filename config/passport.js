require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback',
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Find or create user
                const {email, name} = profile._json;

                // Check for existing student
                let user = await Student.findOne({email});
                if(!user) {
                    user = await Tutor.findOne({email});
                }

                if (!user) {
                    user = new Student({
                        name, 
                        email,
                        password: '',
                        profilePicture: profile.photos[0].value
                    });
                    await user.save();
                }
                done(null, user);


            } catch(err) {
                done(err, false);
            }
        }
    )
)

// Serialize User
passport.serializeUser((user, done) => {
    done(null, user.id);
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