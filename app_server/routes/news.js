const express = require('express');
const router = express.Router();
const newsCtrl = require('../controllers/news');

/* GET News */
router.get('/', newsCtrl.news);

module.exports = router;
