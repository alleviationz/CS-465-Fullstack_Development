/* GET News page */
const news = (req, res) => {
    res.render('news', {title: "News"});
};

module.exports = {
    news
}