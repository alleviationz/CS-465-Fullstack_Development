const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');    // enable json web tokens

// controllers for trip data and authentication middleware
const tripsController = require("../controllers/trips");
const authController = require("../controllers/authentication");


// registration route
router
    .route("/register")
    .post(authController.register);

// login route
router
    .route("/login")
    .post(authController.login);

// index endpoint for trips
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes tripsList
    .post(authenticateJWT, tripsController.tripsAddTrip); // POST method adds a Trip

// tripsCode method routes tripsFindByCode - requires code parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(authenticateJWT, tripsController.tripsUpdateTrip)  //PUT method updates a trip
    .delete(authenticateJWT, tripsController.tripsDeleteTrip);   // DELETE method deletes a trip


// method to authenticate JWT
function authenticateJWT(req, res, next) {
    const authHeader = req.headers['authorization'];

    // JWT has no header (required)
    if (authHeader == null) {
        console.log('Auth Header Required, but NOT PRESENT!');
        return res.sendStatus(401);
    }

    // JWT doesn't have right # of tokens
    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        return res.sendStatus(501);
    }

    // JWT token was null bearer
    const token = authHeader.split(' ')[1];
    if (token == null) {
        return res.sendStatus(401);
    }

    // save verification of jwt as a boolean to pass through middleware without recalling all functions every step
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified;    // set the auth parameter to the decoded object
    });
    next(); // advance middleware
}



module.exports = router;