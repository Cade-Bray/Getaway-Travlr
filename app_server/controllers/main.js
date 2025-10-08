/* 
* I am grouping pages with minimal dynamic rendering in a single controller. This reduces the complexity of the project
* by centralizing simple controllers that simply perform a render. Pages such as Travel that dynamically render info
* will have their own controller file to group api helpers.
*/

/**
 * This function is the index router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function index(req, res) {
    res.render("landing", {title: "Travlr Getaways", activePage: "home"});
}

/**
 * This function is the rooms router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function rooms(req, res) {
    res.render("rooms", { title: "Travlr Getaways", activePage: "rooms" });
}

/**
 * This function is the meals router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function meals(req, res) {
    res.render("meals", { title: "Travlr Getaways", activePage: "meals" });
}

/**
 * This function is the news router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function news(req, res) {
    res.render("news", { title: "Travlr Getaways", activePage: "news" });
}

/**
 * This function is the about router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function about(req, res) {
    res.render("about", { title: "Travlr Getaways", activePage: "about" });
}

/**
 * This function is the contact router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function contact(req, res) {
    res.render("contact", { title: "Travlr Getaways", activePage: "contact" });
}

// module exports of controllers. This will be referenced most likely in an app_server route.
module.exports = {
    index,
    rooms,
    meals,
    news,
    about,
    contact
};