const express = require('express');
const router = express.Router();
const contactCtrl = require('../controllers/contact');

/* GET contact */
router.get('/', contactCtrl.contact);

module.exports = router;
