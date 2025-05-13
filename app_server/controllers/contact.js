/* GET Contact Page */
const contact = (req, res) => {
    res.render('contact', {title: "Contact"});
};

module.exports = {
    contact
}