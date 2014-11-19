'use strict'

var express = require('express');
var https = require('https');
var app = express();
var bodyParser = require('body-parser');

var headers = {
    'Authorization': 'token ' + process.env.API_DEV_KEY
};

var options = {
    hostname: 'sandbox-api.opentable.com',
    path: '',
    method: '',
    headers: headers
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

app.post('/search', function(req, res){
    options.path = '/v1/restaurants/1/availability?dateTime=' + req.body.date + req.body.timeselect + '&partySize=' + req.body.partysize;
    options.method = 'GET';
    var request = https.request(options, function(availability){
        availability.setEncoding('utf8');
        availability.on('data', function (chunk) {
            var results = JSON.parse(chunk).results;
            console.log(results);
            res.render('search', {results: results});
        });
    });
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