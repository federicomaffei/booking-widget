'use strict';

require('../utilities/timeCreator');

var bodyParser = require('body-parser'),
    config = require('../../config'),
    express = require('express'),
    expressValidator = require('express-validator'),
    moment = require('moment'),
    options = {
        path: config.apiPath,
        headers: {
            'Authorization': config.authToken
        }
    },
    request = require('request'),
    router = express.Router();

router.use(bodyParser.json());
router.use(expressValidator({}));
router.use(bodyParser.urlencoded({
    extended: true
}));

router.post('/:restaurantId', function(req, res){
    req.checkBody('date', config.messages.invalidDate).isAfter(moment().subtract(1, 'days'));
    req.checkBody('date', config.messages.emptyDate).notEmpty();
    req.checkBody('timeSelect', config.messages.emptyTime).notEmpty();
    req.checkBody('partySize', config.messages.invalidPartySize).isInt();
    var errors = req.validationErrors();
    if(errors){
        res.status(400).send(config.messages.genericValidationError);
    }
    else {
        var uri = options.path + req.params.restaurantId + '/availability?dateTime=' + req.body.date + req.body.timeSelect + '&partySize=' + req.body.partySize,
            method = 'GET';
        request({
            uri: uri,
            method: method,
            headers: options.headers,
            json: true
        }, function(error, response, body){
            if(response.body.message) {
                res.render('availability-error', {
                    availabilityErrorMessage: response.body.message,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode,
                    requestMethod: method,
                    requestPath: uri,
                    requestHeaders: JSON.stringify(options.headers, undefined, 2)
                });
            }
            else {
                res.render('search-availability', {
                    results: body.results,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode,
                    requestMethod: method,
                    requestPath: uri,
                    requestHeaders: JSON.stringify(options.headers, undefined, 2),
                    id: req.params.restaurantId });
            }
        });
    }
});

module.exports = router;
