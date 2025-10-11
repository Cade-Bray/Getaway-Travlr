const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

router
    .route('/trips')
    .get(tripsCtrl.tripsList) // GET request for all trips
    .post(tripsCtrl.tripsAddTrip); // POST request to create a trip

router
    .route('/trips/:tripCode')
    .get(tripsCtrl.tripsFindByCode)
    .put(tripsCtrl.tripsUpdateTrip); // PUT request to update a trip

module.exports = router;