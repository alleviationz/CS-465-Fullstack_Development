const mongoose = require("mongoose");
const Trip = require("../models/travlr"); // require model
const Model = mongoose.model("trips");

// GET: /trips - list all trips
const tripsList = async (req, res) => {
    const tripsData = await Model
    .find({})   // no filter
    .exec();


    // results output statement
    console.log(tripsData);

    if (!tripsData) {
    // no data returned
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


    // results output statement
    console.log(tripsData);

    if (!tripsData) {
    // no data returned
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

module.exports = {
    tripsList,
    tripsFindByCode
}