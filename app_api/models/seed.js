// Bring in the DB connection and the Trip schema
const Mongoose = require('./dbs');
const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var tripsData = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany({tripsData});
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});