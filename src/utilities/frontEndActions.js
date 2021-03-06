var tc = require('./timeCreator');
var moment = require('moment');
var restaurants = require('../../config/restaurants.json');

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

$(function () {
    $(document).tooltip({
        content: function () {
            return $(this).prop('title');
        }
    });
});

$(document).ready(function() {

    $('#select-availability').submit(function() {
        var restaurantId = $('#restaurantpicker').val();
        $('#select-availability').attr('action', '/search_availability/' + restaurantId);
    });

    var $datepicker = $('#datepicker');
    var $offersTip = $('.offers-tip');
    var offersList = '';

    $datepicker.datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: new Date(),
        defaultDate: new Date(),
        showOtherMonths: true,
        dayNamesMin: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        onSelect: function(dateText) {
            $('#date-field').empty().append(moment(dateText).format('MMM Do YYYY'));
            $('#timepicker').empty();
            var slots = tc.createSlots(tc.setStart(dateText, 22));
            addSlotsToOptions(slots);
            $('#booking-date').append();
        }
    });

    $('#partypicker').change(function() {
        $('#party-field').empty().append($('#partypicker option:selected').text());
    });

    $('#timepicker').change(function() {
        $('#time-field').empty().append($('#timepicker option:selected').text());
    });

    $('#restaurantpicker').change(function() {
        var restaurantName = $.grep(restaurants, function(restaurant){
            return restaurant.id == $('#restaurantpicker option:selected').val()
        });
        $('#restaurant-field').empty().append(restaurantName[0].name);
    });

    $('#show-response-button').click(function(){
        $('#preview-container').show('fast');
    });

    $('#hide-response-button').click(function(){
        $('#preview-container').hide('fast');
    });

    if($offersTip.length) {
        $offersTip.data('tooltip').forEach(function(offer){
            offersList = offersList + '<p class="offer-paragraph">' + offer.name + '</p>';
        });

        $offersTip.attr('title', offersList).tooltip({
            content: function () {
                return $(this).prop('title');
            }
        });
    }

    var slots = tc.createSlots(moment().format('HH'), 22);
    $('#time-field').append(tc.convertTime(slots[0]));
    addSlotsToOptions(slots);
});