$(document).ready(function(){
    var now = createSlots(moment().format('HH'));
    addSlotsToOptions(now, 22);
    $('#datepicker').change(function(){
        $('#timepicker').empty();
        var slots = createSlots(setStart($(this).val()), 22);
        addSlotsToOptions(slots);
    });
});
