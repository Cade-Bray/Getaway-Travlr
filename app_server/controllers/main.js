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
 * This function is the login router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function login(req, res) {
    res.render("login", { title: "Travlr Getaways", activePage: "login" });
}

/**
 * This function is the reservation router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function register(req, res) {
    res.render("register", { title: "Travlr Getaways", activePage: "register" });
}

/**
 * This function is the reservation router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function reservation(req, res) {
    res.render("reservations", { title: "Travlr Getaways", activePage: "reservation" });
}

/**
 * This function is the reservation router for the Travlr Getaways web application.
 * @param req Express provided requirements.
 * @param res Express provided response used for rendering.
 */
function checkout(req, res) {
    res.render("checkout", { title: "Travlr Getaways", activePage: "checkout" });
}

// module exports of controllers. This will be referenced most likely in an app_server route.
module.exports = {
    index,
    news,
    about,
    login,
    reservation,
    checkout,
    register
};