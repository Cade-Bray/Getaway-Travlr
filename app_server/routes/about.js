const express = require('express');
const router = express.Router();
const aboutCtrl = require('../controllers/about');

/* GET about.hbs */
router.get('/', aboutCtrl.about);

module.exports = router;
