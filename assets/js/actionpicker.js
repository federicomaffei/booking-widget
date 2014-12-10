$(document).ready(function(){
	$('#select-availability').submit(function() {
		var restaurantId = $( 'select:first' ).val();
		$('#select-availability').attr('action', '/search_availability/' + restaurantId);
	});
});