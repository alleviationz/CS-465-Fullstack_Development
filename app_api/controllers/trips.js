const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // require model
const Model = mongoose.model("trips");

// GET: /trips - list all trips
const tripsList = async (req, res) => {
    const tripsData = await Model
    .find({})   // no filter
    .exec();

    if (!tripsData) {
    // no data returned, return error
        return res
                .status(404)
                .json(err);
    } else {
    // return trips list
        return res
                .status(200)
                .json(tripsData);
    }
};

// GET: /trips/:tripCode - list trip by code
const tripsFindByCode = async (req, res) => {
    const tripsData = await Model
    .find({"code" : req.params.tripCode})   // - single record by code
    .exec();

    // error getting trips, return error
    if (!tripsData) {
        return res
                .status(404)
                .json(err);

    // successfully returned trips, return trips
    } else {
        return res
                .status(200)
                .json(tripsData);
    }
};

// POST /trips - add a new Trip with all the given data fields
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const request = await newTrip.save();

    if (!trip) {
        // Database returned no data, return error
        return res
            .status(400)
            .json(err);
    } else {
        // Return new Trip
        return res
            .status(201)
            .json(trip);
    }
};

// PUT /trips/:tripCode - updates/adds a Trip
// regardless of outcome, response must include HTML status code
// and JSON message to the requesting client

const tripsUpdateTrip = async (req, res) => {
    const trip = await Model
    // attempt to find and update a trip with the given fields
        .findOneAndUpdate(
            { code: req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description
                }
        )
        .exec();

        if (!trip) {
            // Database returned no data, return error
            return res
                .status(400)
                .json(err);
        } else {
            // succesful update, database returning updated trip
            return res
                .status(201)
                .json(trip);
        }
}

const tripsDeleteTrip = async (req, res) => {
    const trip = await Model
    // attempt to find and delete a trip by code
        .findOneAndDelete(
            { code: req.params.tripCode }
        )
        .exec();

        if (!trip) {
            // Database returned no data, return error
            return res
                .status(404)
                .json(err);
        } else {
            // deleted trip successfully, database returning message
            return res
                .status(204)
                .json(null);
        }
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip
}