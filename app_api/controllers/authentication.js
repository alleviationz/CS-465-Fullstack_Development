const passport = require('passport');
const mongoose = require('mongoose');
const User = require('../models/users');

const register = async(req, res) => {
    //  validate message to ensure all parameters present
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ 'message': 'All fields required' });

    }

    const user = new User({
        name: req.body.name,    // username
        email: req.body.email,  // email address
        password: ''            // password (starts empty so it can be encrypted)
    });

    user.setPassword(req.body.password);    // call set password to encrypt
    const q = await user.save();            // save user in database


    if (!q) {
        // no data returned
        return res
            .status(400)
            .json(err);
    } else {
        // return new user token
        const token = user.generateJWT();
        return res
            .status(200)
            .json(token);
    }
};


const login = async(req, res) => {
    // Validate message to ensure all parameters present
    if (!req.body.email || !req.body.password) {
        return res
            .status(400)
            .json({ 'message': 'All fields required' });
    }

    // authenticate with passport
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            // error authenticating
            return res
                .status(404)
                .json(err);
        };

        if (user) {
            // AUTH succeeded - generate JWT and return to caller
            const token = user.generateJWT();
            res
                .status(200)
                .json({token});
        } else {
            // AUTH failed - return error
            res
                .status(401)
                .json(info);
        }
    }) (req, res);
};

// export authenticating methods
module.exports = {
    register,
    login
};