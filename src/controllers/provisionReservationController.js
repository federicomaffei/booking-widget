'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    expressValidator = require('express-validator'),
    request = require('request'),
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
    req.body.partySize = parseInt(req.body.partySize);
    var uri = options.path + req.params.restaurantId + '/reservations',
        method = 'POST';
    request({
        uri: uri,
        method: method,
        headers: options.headers,
        body: req.body,
        json: true
    }, function(error, response, body){
        if(response.statusCode === 201){
            res.render('provision-reservation', {
                reservationToken: body.reservationToken,
                provisionMessage: response.body.message,
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
            res.render('provision-error', {
                provisionErrorMessage: response.body.message,
                responseBody: JSON.stringify(body, undefined, 2),
                responseStatus: response.statusCode,
                requestMethod: method,
                requestPath: uri,
                requestBody: JSON.stringify(req.body, undefined, 2),
                requestHeaders: JSON.stringify(options.headers, undefined, 2)
            });
        }
    });
});

module.exports = router;
