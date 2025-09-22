passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const Users = require('../models/users');
const User = mongoose.model('users');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
        },
    
        async (username, password, done) => {
            const request = await User.findOne({ email: username }).exec();
            if (!request) {
                return done(null, false, {
                    message: 'Incorrect username',
                });
            }

            if (!request.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password',
                });
            }
            return done(null, request);
        }
    )
);