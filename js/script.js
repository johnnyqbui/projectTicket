// If value in field is value, show submit button
$(document).ready(function() {
	$("#field").on('keyup', function() {
		if ($("#field").val().length > 4){
			$("#submit").removeClass("invisible")
			$("#submit").addClass("visible")
		}
	})
})