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
        var restaurantId = $('#restaurantpicker').val();
        $('#select-availability').attr('action', '/search_availability/' + restaurantId);
    });

    $('#datepicker').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: new Date(),
        onSelect: function(dateText, inst) {
            $('#date-field').empty();
            $('#date-field').append('<a>' + moment(dateText).format("MMM Do YYYY") + '</a>');
            $('#timepicker').empty();
            var slots = tc.createSlots(tc.setStart(dateText, 22));
            addSlotsToOptions(slots);
            $('#booking-date').append();
        }
    });

    $('#partypicker').change(function() {
        $('#party-field').empty();
        $('#party-field').append('<a>' + $('#partypicker option:selected').text() + '</a>');
    });

    $('#timepicker').change(function() {
        $('#time-field').empty();
        $('#time-field').append('<a>' + $('#timepicker option:selected').text() + '</a>');
    });

    $('#restaurantpicker').change(function() {
        $('#restaurant-field').empty();
        $('#restaurant-field').append('<a> Restaurant ' + $('#restaurantpicker option:selected').text() + '</a>');
    });

    $('.available-hour-button').click(function() {
        $('#offer-popup-'+ $(this).data('index')).toggle('slow');
    });

    var now = tc.createSlots(moment().format('HH'));
    addSlotsToOptions(now, 22);
});