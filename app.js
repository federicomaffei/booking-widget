'use strict';

var express = require('express'),
    dotenv = require('dotenv'),
    favicon = require('serve-favicon'),
    newrelic = require('newrelic'),
    app = express();

dotenv.load();
app.locals.moment = require('moment');
app.locals.timeCreator = require('./src/utilities/timeCreator');
app.locals.restaurants = require('./config/restaurants.json');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/assets'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use('/', require('./src/controllers/indexController'));
app.use('/search_availability', require('./src/controllers/searchAvailabilityController'));
app.use('/provision_reservation', require('./src/controllers/provisionReservationController'));
app.use('/confirm_reservation', require('./src/controllers/confirmReservationController'));
app.use('*', require('./src/controllers/404Controller'));

app.listen( process.env.PORT || 3000).on('error', function(error) {
    if (error.errno === 'EADDRINUSE') { console.log('port is busy'); }
    else { console.log(error); }
});

module.exports = app;