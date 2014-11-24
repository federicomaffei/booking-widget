'use strict'

var moment = require('moment');

module.exports.setStart = function(date) {
    if(moment().isSame(date, 'day')){
        return parseInt(moment().format('H'));
    }
    else return 7;
};

module.exports.createSlots = function(minTime, maxTime) {
    if(typeof(minTime)==='undefined') minTime = 7;
    if(typeof(maxTime)==='undefined') maxTime = 22;
    var times = [];
    for(var index = minTime; index < maxTime; index++){
        if(String(index).length === 1){
            times.push('T0' + String(index) + ':00');
            times.push('T0' + String(index) + ':30');
        }
        else {
            times.push('T' + String(index) + ':00');
            times.push('T' + String(index) + ':30');
        }
    };
    if(String(maxTime).length === 1){
        times.push('T0' + String(maxTime) + ':00');
    }
    else {
        times.push('T' + String(maxTime) + ':00');
    }
    return times;
};