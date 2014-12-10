/*jslint node: true */
'use strict';

var express = require('express'),
    timeCreator = require('../utilities/timeCreator'),
    router = express.Router();

router.get('/', function(req, res){
    res.render('index', {timeSlots: timeCreator.createSlots()});
});

module.exports = router;