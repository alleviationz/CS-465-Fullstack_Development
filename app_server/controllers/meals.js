var fs = require('fs');
var mealInfo = JSON.parse(fs.readFileSync('./data/meals.json','utf8'));

/* GET Meals page */
const meals = (req, res) => {
    res.render('meals', {title: "Meals", mealInfo});
};

module.exports = {
    meals
}