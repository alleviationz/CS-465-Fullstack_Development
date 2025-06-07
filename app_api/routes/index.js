const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// index endpoint for trips
router
    .route("/trips")
    .get(tripsController.tripsList) // GET method routes tripsList
    .post(tripsController.tripsAddTrip); // POST method adds a Trip

// tripsCode method routes tripsFindByCode - requires code parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);  //PUT method updates a trip

module.exports = router;