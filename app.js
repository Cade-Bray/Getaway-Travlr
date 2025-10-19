const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('hbs');
require('./app_server/helpers/hbs-helpers')(handlebars); //helper scripts
require('./app_api/models/db'); // Connection to database.
require('dotenv').config();
const passport = require('passport');
require('./app_api/config/passport');

// Route handlers
const serverRouter = require('./app_server/routes/main');
const apiRouter = require('./app_api/routes/index');

// Define the express application
const app = express();

// View engine setup using Handlebars. Required above.
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'hbs');

// Register partials directory for handlebars
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views', 'partials'));

// Using npm modules
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable CORS for our SPA to communicate with the Express REST API
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// Express server routers for MPA
app.use('/', serverRouter);

// Express server routers for API backend
app.use('/api', apiRouter);

// Moved static files middleware after route definitions. This ensures that static files are served if no route matches.
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// catch 404 and forward to error handler
app.use(
    function(
        req,
        res,
        next
    ) {
  next(createError(404));
});

// Catch Unauthorized attempts
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.status(401).json({message: err.name + ': ' + err.message});
    }
});

// error handler
app.use(
    function(
        err,
        req,
        res,
        next
    ) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
