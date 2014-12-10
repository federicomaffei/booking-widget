'use strict'

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

module.exports = router;