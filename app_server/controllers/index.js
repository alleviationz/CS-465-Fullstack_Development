var fs = require('fs');
var navItems = JSON.parse(fs.readFileSync('./data/navItems.json','utf8'));
var sideBarItems = JSON.parse(fs.readFileSync('./data/sideBarItems.json','utf8'));
var blogs = JSON.parse(fs.readFileSync('./data/blogs.json','utf8'));


/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title: "Travlr Getaways", navItems, sideBarItems, blogs});
};

module.exports = {
    index
}