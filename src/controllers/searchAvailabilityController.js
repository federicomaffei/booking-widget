'use strict';

require('../utilities/timeCreator');

var express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    request = require('request'),
    moment = require('moment'),
    options = {
        path: 'https://sandbox-api.opentable.co.uk/v1/restaurants/',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY
        }
    },
    router = express.Router();

router.use(bodyParser.json());
router.use(expressValidator({}));
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/:restaurantId', function(req, res){
    req.checkBody('date', 'reservation date cannot be in the past').isAfter(moment().subtract(1, 'days'));
    req.checkBody('date', 'reservation date cannot be empty').notEmpty();
    req.checkBody('timeSelect', 'time slot cannot be empty').notEmpty();
    req.checkBody('partySize', 'partysize has to be an integer').isInt();
    var errors = req.validationErrors();
    if(errors){
        res.status(400).send('There have been validation errors');
    }
    else {
        request({
            uri: options.path + req.params.restaurantId + '/availability?dateTime=' + req.body.date + req.body.timeSelect + '&partySize=' + req.body.partySize,
            method: 'GET',
            headers: options.headers,
            json: true
        }, function(error, response, body){
            if(response.body.message) {
                res.render('availability-error', {
                    availabilityErrorMessage: response.body.message,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode
                });
            }
            else {
                res.render('search-availability', {
                    results: body.results,
                    request: req.body,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode,
                    id: req.params.restaurantId });
            }
        });
    }
});

module.exports = router;
