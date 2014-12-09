'use strict'

var express = require('express'),
    https = require('https'),
    app = express(),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    request = require('request'),
    timeCreator = require('./src/utilities/timeCreator'),
    moment = require('moment'),
    options = {
        path: 'https://sandbox-api.opentable.co.uk/v1/restaurants/',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY
        }
    };

app.locals.moment = require('moment');
app.locals.timeCreator = require('./src/utilities/timeCreator');

app.set('view engine', 'jade');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(expressValidator({}));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.render('index', {timeSlots: timeCreator.createSlots()});
});

app.get('*', function(req, res, next){
    var error = new Error();
    error.status = 404;
    next(error);
});

app.use(function(error, req, res, next){
    if(error.status !== 404){
        return next();
    }
    res.status(404);
    res.render('404');
});

app.post('/search_availability/:restaurantId', function(req, res){
    req.checkBody('date', 'reservation date cannot be in the past').isAfter(moment().subtract(1, 'days'));
    req.checkBody('timeSelect', 'time slot cannot be empty').notEmpty();
    req.checkBody('partySize', 'partysize has to be an integer').isInt();
    var errors = req.validationErrors();
    if(errors){
        res.status(400).send('There have been validation errors');
        return;
    }
    else {
        request({
            uri: options.path + req.param('restaurantId') + '/availability?dateTime=' + req.body.date + req.body.timeSelect + '&partySize=' + req.body.partySize,
            method: 'GET',
            headers: options.headers,
            json: true
        }, function(error, response, body){
            res.render('search-availability', {results: body.results, id:req.param('restaurantId')});
        });
    }
});

app.post('/provision_reservation/:restaurantId', function(req, res){
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

app.post('/confirm_reservation/:restaurantId', function(req, res){
    req.checkBody('firstName', 'customer first name cannot be empty').notEmpty();
    req.checkBody('lastName', 'customer last name cannot be empty').notEmpty();
    req.checkBody('emailAddress', 'customer email not valid').isEmail();
    req.checkBody('phoneNumber', 'customer phone number cannot be empty').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        res.status(400).send('There have been validation errors');
        return;
    }
    else {
        request({
            uri: options.path + req.param('restaurantId') + '/reservations/provisional/' + req.body.reservationToken + '/confirm',
            method: 'POST',
            headers: options.headers,
            body: req.body,
            json: true
        }, function (error, response, body) {
            if (response.statusCode === 201) {
                res.render('confirm-reservation', {
                    reservationToken: body.reservationToken,
                    id: req.param('restaurantId'),
                    confirmationMessage: response.body.message
                });
            }
            else {
                res.render('confirm-error', {confirmationMessage: response.body.message})
            }
        })
    }
});

var server = app.listen(process.env.DEV_PORT || 3000).on('error', function(error) {
    if (error.errno === 'EADDRINUSE') { console.log('port is busy'); }
    else { console.log(error); }
});

module.exports = app;