'use strict'

var express = require('express');
var https = require('https');
var app = express();
app.locals.moment = require('moment');
var bodyParser = require('body-parser');
var querystring = require('querystring');

var options = {
    hostname: 'sandbox-api.opentable.co.uk',
    path: '',
    method: '',
    headers: {
        'Authorization': 'token ' + process.env.WIDGET_API_KEY
    }
};


app.set('view engine', 'jade');

app.use(express.static(__dirname + '/assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.render('index');
});

app.post('/search_availability', function(req, res){
    options.path = '/v1/restaurants/1/availability?dateTime=' + req.body.date + req.body.timeselect + '&partySize=' + req.body.partysize;
    options.method = 'GET';
    var request = https.request(options, function(availability){
        var data = '';
        availability.setEncoding('utf8');
        availability.on('data', function (chunk) {
            data += chunk;
        });
        availability.on('end', function() {
            var results = JSON.parse(data).results;
            res.render('search-availability', {results: results});
        });
    });
    request.end();
    request.on('error', function(e) {
        console.error(e);
    });
});

app.post('/provision_reservation', function(req, res){
    options.path = '/v1/restaurants/1/reservations';
    options.method = 'POST';
    req.body.partySize = parseInt(req.body.partySize);
    var query = JSON.stringify(req.body);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = query.length;
    var request = https.request(options, function(provision){
        var data = '';
        provision.setEncoding('utf8');
        provision.on('data', function(chunk){
            data += chunk;
        });
        provision.on('end', function(){
            var reservationToken = JSON.parse(data).reservationToken;
            res.render('provision-reservation', {reservationToken: reservationToken});
        });
    });

    request.write(query);
    request.end();
    request.on('error', function(e) {
        console.error(e);
    });
});

app.post('/confirm_reservation', function(req, res){
    options.path = '/v1/restaurants/1/reservations/provisional/' + req.body.reservationToken + '/confirm';
    options.method = 'POST';
    var query = JSON.stringify(req.body);
    options.headers['Content-Type'] = 'application/json';
    options.headers['Content-Length'] = query.length;
    var request = https.request(options, function(confirmation){
        var data = '';
        confirmation.setEncoding('utf8');
        confirmation.on('data', function(chunk){
            data += chunk;
        });
        confirmation.on('end', function(){
            var confirmationMessage = JSON.parse(data).message;
            res.render('confirm-reservation', {confirmationMessage: confirmationMessage});
        });
    });

    request.write(query);
    request.end();
    request.on('error', function(e) {
        console.error(e);
    });

});

var server = app.listen(process.env.DEV_PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server started at http://%s:%s', host, port);
});

module.exports = app;