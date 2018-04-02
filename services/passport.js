const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

mongoose.Promise = Promise

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        async (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}, (err, user) => {
                if(user)
                    return done(err, user)

                const newUser = new User()
                newUser.googleId = profile.id
                newUser.name = profile.displayName
                newUser.save((err, user) => {
                    return done(err, user)
                })
            })
        }
    )
);
