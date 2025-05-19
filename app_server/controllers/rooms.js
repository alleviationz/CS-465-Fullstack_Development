var fs = require('fs');
var roomInfo = JSON.parse(fs.readFileSync('./data/rooms.json','utf8'));

/* GET Rooms page */
const rooms = (req, res) => {
    res.render('rooms', {title: "Rooms", roomInfo});
};

module.exports = {
    rooms
}