const router = require('express').Router();
const mainServerCtrl = require('../controllers/main');
const travelCtrl = require('../controllers/travel');
const {requireAuthHeader} = require("../helpers/requireAuthHeader");

// Index controller
router.get('/', mainServerCtrl.index);

// Travel controller
router.get('/travel', travelCtrl.travel);

// News controller
router.get('/news', mainServerCtrl.about);

// About controller
router.get('/about', mainServerCtrl.about);

// Login controller
router.get('/login', mainServerCtrl.login);

// register controller
router.get('/register', mainServerCtrl.register);

// Reservation controller
router.get('/reservation', requireAuthHeader(), mainServerCtrl.reservation);

// Checkout controller
router.get('/checkout', mainServerCtrl.checkout);

// Module exports the router to be defined in our express app.js file.
module.exports = router;