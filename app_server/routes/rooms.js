const express = require('express');
const router = express.Router();
const roomsCtrl = require('../controllers/rooms');

/* GET rooms */
router.get('/', roomsCtrl.rooms);

module.exports = router;
