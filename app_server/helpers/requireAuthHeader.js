const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function requireAuthHeader(options = { verifyJwt: true }) {
    return (req, res, next) => {
        const raw = req.get('Authorization') || req.headers.authorization;
        if (!raw) {
            // Failed to get the auth header so we're redirecting to log in page
            if (req.accepts('html')) return res.redirect('/login');
            return res.status(401).send('Unauthorized: missing Authorization header');
        }

        // There is a header so let's split it
        const token = raw.startsWith('Bearer ') ? raw.split(' ')[1] : raw;
        if (!token) {
            // token was bad so let's redirect to login
            if (req.accepts('html')) return res.redirect('/login');
            return res.status(401).send('Unauthorized: missing token');
        }

        // Auth token doesn't need to be verified
        if (!options.verifyJwt) {
            req.authToken = token;
            return next();
        }

        // Verify the auth token
        try {
            // With JWT verify we're going to check if it's good
            req.user = jwt.verify(token, JWT_SECRET);
            // Get the token
            req.authToken = token;
            // Next
            return next();
        } catch (err) {
            // Error so let's redirect to log in.
            if (req.accepts('html')) return res.redirect('/login');
            return res.status(401).send('Unauthorized: invalid token');
        }
    };
}

module.exports = {requireAuthHeader};