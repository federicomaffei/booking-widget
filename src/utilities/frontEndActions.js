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
        onSelect: function(dateText) {
            $('#date-field').empty();
            $('#date-field').append(moment(dateText).format('MMM Do YYYY') + '<i class="fa fa-angle-down select-arrow"></i>');
            $('#timepicker').empty();
            var slots = tc.createSlots(tc.setStart(dateText, 22));
            addSlotsToOptions(slots);
            $('#booking-date').append();
        }
    });

    $('#partypicker').change(function() {
        $('#party-field').empty();
        $('#party-field').append($('#partypicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('#timepicker').change(function() {
        $('#time-field').empty();
        $('#time-field').append($('#timepicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('#restaurantpicker').change(function() {
        $('#restaurant-field').empty();
        $('#restaurant-field').append($('#restaurantpicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('.available-hour-button').click(function() {
        $('#offer-popup-'+ $(this).data('index')).toggle('slow');
    });

    var now = tc.createSlots(moment().format('HH'));
    $('#time-field').append(tc.convertTime(now[0]));
    addSlotsToOptions(now, 22);
});