var tc = require('./timeCreator');
var moment = require('moment');

function addSlotsToOptions(slots){
    for(var index = 0; index < slots.length; index++){
        var slot = $('<option/>', {
            text : tc.convertTime(slots[index]),
            'value' : slots[index]
        });
        $('#timepicker').append(slot);
    }
}

$(document).ready(function() {
    $('#select-availability').submit(function() {
        var restaurantId = $( 'select:first' ).val();
        $('#select-availability').attr('action', '/search_availability/' + restaurantId);
    });

    $('#datepicker').datepicker({ dateFormat: 'yy-mm-dd', minDate: new Date()});
    $('#datepicker').datepicker('setDate', new Date());

    $('.available-hour-button').click(function() {
        $('#offer-popup-'+ $(this).data('index')).toggle('slow');
    });

    var now = tc.createSlots(moment().format('HH'));
    addSlotsToOptions(now, 22);
    console.log('hello');
    $('#datepicker').change(function(){
        $('#timepicker').empty();
        var slots = tc.createSlots(tc.setStart($(this).val()), 22);
        addSlotsToOptions(slots);
    });
});