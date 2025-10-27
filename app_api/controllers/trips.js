const mongoose = require('mongoose');
const Model = mongoose.model('trips');

/**
 * GET - /trips <br>
 * This function lists all the trips regardless of outcome.
 * @param req Express provided requirements
 * @param res Express provided response.
 * @return {Promise<*>} Returns a packed express response with status code 200/404 with json content.
 */
async function tripsList(req, res) {
    const query = await Model
        .find({})
        .exec();
    
    if (!query) {
        // Database returned nothing in this instance
        return res.status(404).json({message: 'Trips couldn\'t be found!'});
    } else {
        // Good query, 200 and pack query return.
        return res.status(200).json(query);
    }
}

/**
 * GET - /trips/:tripCode <br>
 * This function lists the trip by the given code.
 * @param req Express provided requirements
 * @param res Express provided response.
 * @return {Promise<*>} Returns a packed express response with status code 200/404 with json content.
 */
async function tripsFindByCode(req, res) {
    const query = await Model
        .find({'code': req.params.tripCode})
        .exec();

    if (!query) {
        // Database returned nothing in this instance
        return res.status(404).json({message: 'Trip couldn\'t be found!'});
    } else {
        // Good query, 200 and pack query return.
        return res.status(200).json(query);
    }
}

/**
 * POST - /trips <br>
 * This is the POST response for adding a trip to the database. Parameters are x-www-form-urlencoded in the body. <br>
 * @param req Express requirements. This is where the parameters are drawn from to make the request.
 * @param res Express response. Packed HTTP status code and json data.
 * @return {Promise<*>} 201/400. Express response returned with packed HTTP status code and json data.
 */
async function tripsAddTrip(req, res){
    const newTrip = new Model({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: new Date(req.body.start),
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });
    
    // Save it to the database and await the query response that it's good!
    const query = await newTrip.save();
    
    if (!query){
        // Database returned nothing
        return res.status(400).json({message: 'An error has occurred while posting that data.'});
    } else {
        // Return the new trip
        return res.status(201).json(query);
    }
}

/**
 * PUT - /trips/:tripCode
 * This function will update a trip object based on the trip code provided in the url parameters.
 * @param req Express Requirements. x-www-form-urlencoded body information used for updating.
 * @param res Express response used to return information.
 * @return {Promise<*>} 201/400. Return is an express response packed with an HTTP status code and JSON formatted data.
 */
async function tripsUpdateTrip(req, res) {
    const query = await Model.findOneAndUpdate(
        {'code': req.params.tripCode},
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    ).exec();
    
    if (!query){
        // Database returned nothing
        return res.status(400).json(query.error);
    } else {
        // Return the resulting updated document
        return res.status(201).json(query);
    }
}

/**
 * DELETE - /trips/:tripcode
 * This function will delete the given trip code found in the database.
 * @param req Express provided requirements. This is used to grab the trip code from the parameters.
 * @param res Express provided requirements. This is used for the packed response.
 */
function tripsDeleteTrip(req, res) {
    const query = Model.findOneAndDelete(
        {'code': req.params.tripCode}
    ).exec();
    
    if (query === null) {
        return res.status(404).json({message: `There was no trip found under trip code ${req.params.tripCode}`});
    } else if (query) {
        return res.status(200).json(query);
    } else {
        return res.status(400).json({message: 'Bad request'});
    }
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsDeleteTrip,
    tripsUpdateTrip
}