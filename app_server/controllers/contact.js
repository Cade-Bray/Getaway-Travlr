/* Get contact */
const contact = (req, res) => {
    res.render("contact", { title: "Travlr Getaways", activePage: "contact" });
};

module.exports = {
    contact
};