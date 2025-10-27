const tripsEndpoint = 'http:/localhost:3000/api/trips'; // Trips endpoint for API calls.
const options = { // This is the fetch options
    method: 'GET',
    headers: {
        'Accept' : 'application/json'
    }
}

/**
 * Controller for the /travel page. This function makes the API call for the data before passing to hbs.
 * @param req Express provided requirements.
 * @param res Express provided response. Used to make status code and json formatted data return.
 */
async function travel(req, res) {
    try{
        const apiReturn = await fetch(tripsEndpoint, options); // Make API call.
        const data = await apiReturn.json(); // Parse the data into a json object.
        
        // Error Trapping starting with the return was in the wrong format.
        if (!(data instanceof Array)){
            return res.status(500).json({message: 'API lookup error'});
        }
        
        // Error Trapping continued. No listings were returned in the database. The length was zero.
        if (!data.length) {
            return res.status(404).json({message: 'No trips exist in our database!'});
        }
        
        // Pack 200 and return JSON formatted data in the express response.
        return res.status(200).render('travel', {title: 'Travlr Getaways', trips: data, activePage: 'travel'});
    } catch ({name, message}) {
        // System failed to capture data or send it. 500 internal error and send error message.
        return res.status(500).json({type: name, message: message});
    }
}

// Module export of the controller. This will be references in an app_server route.
module.exports = {
    travel
}