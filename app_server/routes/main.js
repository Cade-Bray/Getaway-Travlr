const router = require('express').Router();
const mainServerCtrl = require('../controllers/main');
const travelCtrl = require('../controllers/travel');

// Index controller
router.get('/', mainServerCtrl.index);

// Travel controller
router.get('/travel', travelCtrl.travel);

// Rooms controller
router.get('/rooms', mainServerCtrl.rooms);

// Meals controller
router.get('/meals', mainServerCtrl.meals);

// News controller
router.get('/news', mainServerCtrl.about);

// About controller
router.get('/about', mainServerCtrl.about);

// Contact controller
router.get('/contact', mainServerCtrl.contact);

// Module exports the router to be defined in our express app.js file.
module.exports = router;