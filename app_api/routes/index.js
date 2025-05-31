const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

// GET index endpoint for trips
router
    .route("/trips")
    .get(tripsController.tripsList);

// GET method routes tripsFindByCode - requires code parameter
router
    .route("/trips/:tripCode")
    .get(tripsController.tripsFindByCode);

module.exports = router;