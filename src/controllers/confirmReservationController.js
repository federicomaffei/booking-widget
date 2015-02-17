'use strict';

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
    req.checkBody('firstName', config.messages.emptyFirstName).notEmpty();
    req.checkBody('lastName', config.messages.emptyLastName).notEmpty();
    req.checkBody('emailAddress', config.messages.invalidEmail).isEmail();
    req.checkBody('phoneNumber', config.messages.emptyPhone).notEmpty();
    var errors = req.validationErrors();
    if(errors){
        res.status(400).send(config.messages.genericValidationError);
    }
    else {
        var uri = options.path + req.params.restaurantId + '/reservations/provisional/' + req.body.reservationToken + '/confirm',
            method = 'POST';
        request({
            uri: uri,
            method: method,
            headers: options.headers,
            body: req.body,
            json: true
        }, function (error, response, body) {
            if (response.statusCode === 201) {
                res.render('confirm-reservation', {
                    reservationToken: body.reservationToken,
                    confirmationMessage: response.body.message,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode,
                    requestMethod: method,
                    requestPath: uri,
                    requestBody: JSON.stringify(req.body, undefined, 2),
                    requestHeaders: JSON.stringify(options.headers, undefined, 2),
                    id: req.params.restaurantId
                });
            }
            else {
                res.render('confirm-error', {
                    confirmationMessage: response.body.message,
                    responseBody: JSON.stringify(body, undefined, 2),
                    responseStatus: response.statusCode,
                    requestMethod: method,
                    requestPath: uri,
                    requestHeaders: JSON.stringify(options.headers, undefined, 2),
                });
            }
        });
    }
});


module.exports = router;