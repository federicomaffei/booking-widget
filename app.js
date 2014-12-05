'use strict'

var express = require('express'),
    https = require('https'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request'),
    timeCreator = require('./src/utilities/timeCreator'),
    options = {
        path: 'https://sandbox-api.opentable.co.uk/v1/restaurants/',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY
        }
    }

app.locals.moment = require('moment');
app.locals.timeCreator = require('./src/utilities/timeCreator');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.render('index', {timeSlots: timeCreator.createSlots()});
});

app.post('/:restaurantId/search_availability', function(req, res){
    request({
        uri: options.path + req.param('restaurantId') + '/availability?dateTime=' + req.body.date + req.body.timeSelect + '&partySize=' + req.body.partySize,
        method: 'GET',
        headers: options.headers,
        json: true
    }, function(error, response, body){
        res.render('search-availability', {results: body.results, id:req.param('restaurantId')});
    });
});

app.post('/:restaurantId/provision_reservation', function(req, res){
    req.body.partySize = parseInt(req.body.partySize);
    request({
        uri: options.path + req.param('restaurantId') + '/reservations',
        method: 'POST',
        headers: options.headers,
        body: req.body,
        json: true
    }, function(error, response, body){
        if(response.statusCode === 201){
            res.render('provision-reservation', {reservationToken: body.reservationToken, id:req.param('restaurantId'), provisionMessage: response.body.message});
        }
        else {
            res.render('provision-error', {provisionMessage: response.body.message})
        }
    });
});

app.post('/:restaurantId/confirm_reservation', function(req, res){
    request({
        uri: options.path + req.param('restaurantId') + '/reservations/provisional/' + req.body.reservationToken + '/confirm',
        method: 'POST',
        headers: options.headers,
        body: req.body,
        json: true
    }, function(error, response, body){
        if(response.statusCode === 201){
            res.render('confirm-reservation', {reservationToken: body.reservationToken, id:req.param('restaurantId'), confirmationMessage: response.body.message});
        }
        else {
            res.render('confirm-error', {confirmationMessage: response.body.message})
        }
    })
});

var server = app.listen(process.env.DEV_PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started at http://%s:%s', host, port);
});

module.exports = app;