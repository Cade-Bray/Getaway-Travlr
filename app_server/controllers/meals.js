/* Get meals */
const meals = (req, res) => {
    res.render("meals", { title: "Travlr Getaways", activePage: "meals" });
};

module.exports = {
    meals
};