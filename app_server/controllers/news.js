var fs = require('fs');
var latestNews = JSON.parse(fs.readFileSync('./data/latestNews.json','utf8'));
var vacationTips = JSON.parse(fs.readFileSync('./data/vacationTips.json','utf8'));
var navItems = JSON.parse(fs.readFileSync('./data/navItems.json','utf8'));

/* GET News page */
const news = (req, res) => {
    res.render('news', {title: "News", latestNews, vacationTips, navItems});
};

module.exports = {
    news
}