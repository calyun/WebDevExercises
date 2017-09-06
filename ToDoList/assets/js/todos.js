// Lib contains the libs

// Goal: Mark ToDo as Complete by Clicking X

// add click listener for when any li is clicked inside the ul
$("ul").on("click", "li", function(){
	// toggle the particularly clicked li
	$(this).toggleClass("completed");
});

$("ul").on("click", "span", function(event){
	// fadeout has callback function, so remove waits for fadeOut to finish
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
})

$("input[type='text'").keypress(function(event){
	// 13 is the key relating to the Enter key
	if (event.which === 13){
		// extracts the todo text
		var newToDo = $(this).val();
		$(this).val("")	// resets box to blank
		$("ul").append("<li><span><i class=\"fa fa-trash\"></i></span>"+newToDo+"</li>")
	}
})

/* fades out Input box when Add icon clicked */
$(".fa-plus").click(function(){
	$("input[type='text'").fadeOut().toggle()
})