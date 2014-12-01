$(document).ready(function(){
    $('#datepicker').datepicker({ dateFormat: "yy-mm-dd", minDate: new Date()});
    $("#datepicker").datepicker("setDate", new Date());
    $('#datepicker').change(function(){
    	console.log($(this).val());
    });
});