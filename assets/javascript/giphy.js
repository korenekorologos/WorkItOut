$(document).ready(function(){
	populateButtons(topics, 'exercise-button', '#exercise-buttons');
	console.log("test");
});

// my array of exercises 
var topics = [ "running", "kickball", "basketball", "badminton", "golf", "jump rope", "martial arts", "ballet", "bowling", "skiing", "snowboarding", "ping pong", "rock climbing", "hiking", "surfing", "paddle boarding", "soccer", 
			"cricket", "cycling", "fishing", "baseball", "kick boxing"];
			
// function that populates and appends buttons
function populateButtons(topics, classToAdd, areaToAddTo){
	$(areaToAddTo).empty();
	for(var i=0; i<topics.length; i++){
		var a = $('<button>');
		a.addClass(classToAdd);
		a.attr('data-type', topics[i]);
		a.text(topics[i]);
		$(areaToAddTo).append(a);
	}
};


$(document).on('click','.exercise-button', function(){
	$('#gif-here').empty();
	var type = $(this).data('type');
	var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + type + '&api_key=iX9oNW9G3OYCid2UDQD1Ne9ea0jzzXis'; 
    // // ajax request
	$.ajax({url:queryURL, method:'GET'})
		.done(function(response){
			console.log(response);
			for(var i = 0; i<response.data.length; i++){
				var exerciseDiv = $('<div class=\"exercise-item\">');
				var rating = response.data[i].rating;
				var p = $('<p class=align:center>').text('Rating: ' +rating);
				var animated = response.data[i].images.fixed_height.url;
				var still = response.data[i].images.fixed_height_still.url;
				var image = $('<img>');
				image.attr('src', still);
				image.attr('data-still', still);
				image.attr('data-animated', animated);
				image.attr('data-state', 'still');
				image.addClass('exerciseImage');
				exerciseDiv.append(p);
				exerciseDiv.append(image);
				$('#gif-here').append(exerciseDiv);
			}
		})

;




$(document).on('click', '.exerciseImage', function(){
	var state = $(this).attr('data-state');
	if(state == 'still'){
		$(this).attr('src', $(this).data('animated'));
		$(this).attr('data-state', 'animated');
	} else {
		$(this).attr('src', $(this).data('still'));
		$(this).attr('data-state', 'still');
	}
})

$('#add-exercise').on('click', function(){
	var newExercise = $('input').eq(0).val();
	topics.push(newExercise);
	populateButtons(topics,'exercise-button', '#exercise-buttons');
	return false;
})

})
