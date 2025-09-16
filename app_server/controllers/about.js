/* Get About */
const about = (req, res) => {
    res.render("about", { title: "Travlr Getaways", activePage: "about" });
};

module.exports = {
    about
};