'use strict'

var express = require('express'),
    router = express.Router();

router.get('*', function(req, res, next){
    var error = new Error();
    error.status = 404;
    next(error);
});

router.use(function(error, req, res, next){
    if(error.status !== 404){
        return next();
    }
    res.status(404);
    res.render('404');
});

module.exports = router;