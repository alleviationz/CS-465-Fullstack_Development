fs = require('fs');
var ads = JSON.parse(fs.readFileSync('./data/ads.json','utf8'));

/* GET About page */
const about = (req, res) => {
    res.render('about', {title: "About", ads});
};

module.exports = {
    about
}