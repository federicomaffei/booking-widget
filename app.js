'use strict'

var express = require('express'),
    https = require('https'),
    app = express(),
    bodyParser = require('body-parser'),
    request = require('request'),
    timeCreator = require('./src/utilities/timeCreator'),
    options = {
        hostname: 'sandbox-api.opentable.co.uk',
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

app.post('/search_availability', function(req, res){
    request({
        uri: 'https://sandbox-api.opentable.co.uk/v1/restaurants/1/availability?dateTime=' + req.body.date + req.body.timeselect + '&partySize=' + req.body.partysize,
        method: 'GET',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY
        },
        json: true
    }, function(error, response, body){
        res.render('search-availability', {results: body.results});
    });
});

app.post('/provision_reservation', function(req, res){
    req.body.partySize = parseInt(req.body.partySize);
    console.log(req.body);
    request({
        uri: 'https://sandbox-api.opentable.co.uk/v1/restaurants/1/reservations',
        method: 'POST',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY,
            'Content-Type': 'application/json'
        },
        form: req.body,
        json: true
    }, function(error, response, body){
        console.log(body);
        console.log(body.reservationToken);
        res.render('provision-reservation', {reservationToken: body.reservationToken});
    });
});

app.post('/confirm_reservation', function(req, res){
    console.log(req.body);
    request({
        uri: 'https://sandbox-api.opentable.co.uk/v1/restaurants/1/reservations/provisional/' + req.body.reservationToken + '/confirm',
        method: 'POST',
        headers: {
            'Authorization': 'token ' + process.env.WIDGET_API_KEY,
            'Content-Type': 'application/json'
        },
        form: req.body
    }, function(error, response, body){
        console.log(body);
        res.render('confirm-reservation', {confirmationMessage: body.message});
    })
    //options.path = '/v1/restaurants/1/reservations/provisional/' + req.body.reservationToken + '/confirm';
    //options.method = 'POST';
    //var query = JSON.stringify(req.body);
    //options.headers['Content-Type'] = 'application/json';
    //options.headers['Content-Length'] = query.length;
    //var request = https.request(options, function(confirmation){
    //    var data = '';
    //    confirmation.setEncoding('utf8');
    //    confirmation.on('data', function(chunk){
    //        data += chunk;
    //    });
    //    confirmation.on('end', function(){
    //        var confirmationMessage = JSON.parse(data).message;
    //        res.render('confirm-reservation', {confirmationMessage: confirmationMessage});
    //    });
    //});
    //
    //request.write(query);
    //request.end();
    //request.on('error', function(e) {
    //    console.error(e);
    //});

});

var server = app.listen(process.env.DEV_PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started at http://%s:%s', host, port);
});

module.exports = app;