var tc = require('./timeCreator');
var moment = require('moment');

function addSlotsToOptions(slots){
    for(var index = 0; index < slots.length; index++){
        var slot;
        if(index === 0) {
            slot = $('<option/>', {
                text : tc.convertTime(slots[index]),
                'value' : slots[index],
                'selected': true
            });
            $('#timepicker').append(slot);
        }
        else {
            slot = $('<option/>', {
                text : tc.convertTime(slots[index]),
                'value' : slots[index]
            });
            $('#timepicker').append(slot);
        }
    }
}

$(document).ready(function() {

    $('#select-availability').submit(function() {
        var restaurantId = $('#restaurantpicker').val();
        $('#select-availability').attr('action', '/search_availability/' + restaurantId);
    });

    var $datepicker = $('#datepicker');

    $datepicker.datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: new Date(),
        defaultDate: new Date(),
        onSelect: function(dateText) {
            $('#date-field').empty().append(moment(dateText).format('MMM Do YYYY') + '<i class="fa fa-angle-down select-arrow"></i>');
            $('#timepicker').empty();
            var slots = tc.createSlots(tc.setStart(dateText, 22));
            addSlotsToOptions(slots);
            $('#booking-date').append();
        }
    });

    $('#partypicker').change(function() {
        $('#party-field').empty().append($('#partypicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('#timepicker').change(function() {
        $('#time-field').empty().append($('#timepicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('#restaurantpicker').change(function() {
        $('#restaurant-field').empty().append('Restaurant ' + $('#restaurantpicker option:selected').text() + '<i class="fa fa-angle-down select-arrow"></i>');
    });

    $('.available-button').click(function() {
        $('#offer-popup-'+ $(this).data('index')).toggle('slow');
    });

    var slots = tc.createSlots(moment().format('HH'), 22);
    $('#time-field').append(tc.convertTime(slots[0]));
    addSlotsToOptions(slots);
});