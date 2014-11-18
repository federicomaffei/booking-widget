var express = require('express')
var routes  = require('./src/routes');
var app     = express()

app.set('view engine', 'jade');

app.get('/', routes.index)

var server = app.listen(process.env.DEV_PORT || 3000, function() {

    var host = server.address().address
    var port = server.address().port

    console.log('Server started at http://%s:%s', host, port)

})