var fs = require('fs');
var mealInfo = JSON.parse(fs.readFileSync('./data/meals.json','utf8'));
var navItems = JSON.parse(fs.readFileSync('./data/navItems.json','utf8'));

/* GET Meals page */
const meals = (req, res) => {
    res.render('meals', {title: "Meals", mealInfo, navItems});
};

module.exports = {
    meals
}