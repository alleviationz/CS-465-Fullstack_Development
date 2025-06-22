const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');    // enable json web tokens

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
    console.log('In Middleware');
    const authHeader = req.headers['authorization'];
    console.log('Auth Header: ' + authHeader);

    if (authHeader == null) {
        console.log('Auth Header Required, but NOT PRESENT!');
        return res.sendStatus(401);
    }

    let headers = authHeader.split(' ');
    if (headers.length < 1) {
        console.log('Not enough tokens in Auth Header: ' + headers.length);
        return res.sendStatus(501);
    }

    const token = authHeader.split(' ')[1];
    console.log('Token: ' + token);
    if (token == null) {
        console.log('Null Bearer Token');
        return res.sendStatus(401);
    }

    console.log(process.env.JWT_SECRET);
    console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if (err) {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified;    // set the auth parameter to the decoded object
    });
    next(); // advance middleware
}

module.exports = router;