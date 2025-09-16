/* Get Homepage */
const index = (req, res) => {
  res.render("landing", { title: "Travlr Getaways", activePage: "home" });
};

module.exports = {
  index
};