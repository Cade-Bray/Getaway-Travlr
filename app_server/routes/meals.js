const express = require('express');
const router = express.Router();
const mealsCtrl = require('../controllers/meals');

/* GET meals */
router.get('/', mealsCtrl.meals);

module.exports = router;
