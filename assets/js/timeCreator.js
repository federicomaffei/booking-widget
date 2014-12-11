function setStart(date) {
    if(moment().isSame(date, 'day')){
        return parseInt(moment().format('H'));
    }
    else {
        return 7;
    }
}

function convertTime(time) {
    var hour = parseInt(time.substring(1,3));
    if(parseInt(hour) < 13){
        return time.substring(1,6) + ' AM';
    }
    else {
        return (hour - 12).toString() + time.substring(3,6) + ' PM';
    }
}

function createSlots(minTime, maxTime) {
    if(typeof(minTime)==='undefined') {
        minTime = 7;
    }
    if(typeof(maxTime)==='undefined') {
        maxTime = 22;
    }
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
    }
    if(String(maxTime).length === 1){
        times.push('T0' + String(maxTime) + ':00');
    }
    else {
        times.push('T' + String(maxTime) + ':00');
    }
    return times;
}

function addSlotsToOptions(slots){
    for(var index = 0; index < slots.length; index++){
        var slot = $('<option/>', {
            text : convertTime(slots[index]),
            'value' : slots[index]
        });
        $('#timepicker').append(slot);
    }
}

$(document).ready(function(){
    var now = createSlots(moment().format('HH'));
    addSlotsToOptions(now, 22);
    $('#datepicker').change(function(){
        $('#timepicker').empty();
        var slots = createSlots(setStart($(this).val()), 22);
        addSlotsToOptions(slots);
    });
});