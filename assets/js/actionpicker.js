$(document).ready(function(){
	$('#select-availability').submit(function(event) {
		var restaurantId = $( "select:first" ).val();
		$("#select-availability").attr("action", + restaurantId + "/search_availability");
	})
});