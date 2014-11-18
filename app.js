'use strict'

var express = require('express')
var app = express()

app.set('view engine', 'jade');

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res){
  res.render('index');
})

app.post('/book', function(req, res){
	console.log(req.body);
	res.render('index');
})

var server = app.listen(process.env.DEV_PORT || 3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Server started at http://%s:%s', host, port)

})