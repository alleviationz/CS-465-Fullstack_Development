var fs = require("fs");
var navItems = JSON.parse(fs.readFileSync('./data/navItems.json','utf8'));

/* GET Contact Page */
const contact = (req, res) => {
    res.render('contact', {title: "Contact", navItems});
};

module.exports = {
    contact
}