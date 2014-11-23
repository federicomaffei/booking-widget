$(document).ready(function(){
    $('.available-hour-button').click(function() {
        $('#offer-popup-'+ $(this).data('index')).toggle('slow');
    });
});