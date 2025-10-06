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

module.exports = {
    tripsList,
    tripsFindByCode
}