/* GET Rooms page */
const rooms = (req, res) => {
    res.render('rooms', {title: "Rooms"});
};

module.exports = {
    rooms
}