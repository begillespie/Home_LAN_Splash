//tested in Chrome 22.0.1207.1
//The jqueryui bounce effect misbehaves in IE and Firefox
//https://github.com/begillespie/Home_LAN_Splash.git

$(document).ready(function(){

	var $chalkboard = $('#chalkboard');
	var $left_column = $('#left_column');
	var $right_column = $('#right_column');

// Insert the code for the calendar
  $('#calendar').html(config.calendarPath);

// Pull the data from the chalkboard.txt file on the server and displays it in the chalkboard
	$.ajax({
		url: 'write/chalkboard.txt',
		dataType: 'text',
		success: function(data){
			if(data){$chalkboard.text(data); //put the contents of the text file into the html
		} else {
			$chalkboard.html("Here is the chalkboard! Leave notes on it. When you click out of this box, it will save automatically!"); //leave a note if there is nothing in the file
			}
		},
		error: function(){
			$chalkboard.text("Here is the chalkboard! Leave notes on it. When you click out of this box, it will save automatically!"); //leave a note if the text file doesn't exist. The php script will create the file when it runs.
		}
	}); //end ajax GET
	
// Send changes to the chalkboard to the server whenever the user changes focus away from the chalkboard
// The webserver needs write permission to the 'write' directory
	$chalkboard.blur(function(){
		$.ajax({
			type: 'POST',
			url: 'scripts/save_chalkboard.php',
			data: {"content" : $chalkboard.val()}, //grab the contents of the textarea and format it for the php script
			dataType: 'text'
		}); //end ajax POST
	}); //end blur function
	
// Create the buttons
	var networkResourcesLength = config.networkResources.length;
	var typeClassListLength = config.typeClassList.length;

// Iterate over the typeClassList array and put the type groups in the correct column. Then, create the buttons in the correct group.
	for (var i=0; i < typeClassListLength; i++) {
		if(config.typeClassList[i].column === "left") { //work on the left column
			$left_column.append(createTypeGroupHTML(i)); //create the typeClass group
				for (var j=0; j < networkResourcesLength; j++) { //iterate over the networkResources array...
					if(config.networkResources[j].typeClass === config.typeClassList[i].typeClass) { //...and find the resources that belong in each group
						createButtonHTML(i,j); //generate the html
					}
				}
		}else if(config.typeClassList[i].column === "right") { //work on the right column, doing the same thing
			$right_column.append(createTypeGroupHTML(i));
				for (var k=0; k < networkResourcesLength; k++) {
					if(config.networkResources[k].typeClass === config.typeClassList[i].typeClass) {
						createButtonHTML(i,k);
					}
				}

		}
	}
	
	function createTypeGroupHTML(index){
		return '<ul id="' + config.typeClassList[index].typeClass + '" class="type" ></ul>'; //creates html for typeClass groups
	}
				//html:
				// <ul id="foo" class="type"></ul>

	function createButtonHTML(typeIndex, buttonIndex){
		$('#'+config.typeClassList[typeIndex].typeClass).append('<li class="buttonwrapper"><div class="button" id="' + config.networkResources[buttonIndex].buttonId + '" data-address="' + config.networkResources[buttonIndex].address + '"><p>' + config.networkResources[buttonIndex].label + '</p><div class="status down"></div></div></li>'); //creates the buttons and stores the corresponding address string in the DOM as a custom data element
	}
				//html:
				// <li class="buttonwrapper">
				//   <div class="button" id="bar" data-address="[address]">  <--'data-address' is a custom HTML5 data element. We'll call on that later to make this enire <div> act as a clickable button
				//     <p>THIS IS A BUTTON</p>
				//     <div class="status down"></div>
				//   </div>
				// </li>

//now that the buttons are created, we'll cache the selectors to apply effects and behaviors
	var $buttons = $('.button'); //cache selector for the clickable "buttons" found in the <li>'s
	var $status = $('.status'); //cache selector for status lights.

//call a server script to set the status lights
	$status.each(function(){
			var checkURL = "http://" + $(this).parent().attr('data-address'); //we're acting on the .status div, but the address is stored in the parent .button object in the DOM
			var $current = $(this); //the scope of $('this') changes within the $.ajax method.
		$.ajax({
			url: 'scripts/getHTTPHeader.php',
			dataType: 'text',
			data: {'url' : checkURL, 'timeout' : config.ajaxTimeout},
			success: function(data){ //check the status code. There is no callback for on error because the default is 'down'
				data = data.substring(data.length - 3); //the PHP script returns a string consisting of the whole header with the HTTP status code echoed at the end. So, if we grab the last three characters, we have the HTTP status code.
				if (data !== ("0" || "404")){
					$current.removeClass('down');
				}
			} //end success callback function
		}) //end ajax GET
	}) //end $status.each()

//add effects when the user mouses over the buttons
	$buttons.mouseenter(function(){
		$(this).addClass("highlight"); //adds underglow effect
		$(this).effect("bounce", { times: 2, distance: 10}, 300); //bounce!! this effect misbehaves in IE and Firefox. TODO:  fix the CSS so this works in Firefox
	})
	.mouseleave(function(){
		$(this).removeClass("highlight"); //removes underglow effect
	})
	.click(function(){
		var url = "http://" + $(this).attr('data-address'); //create the url. We associated the correct address with the DOM element when we created it.
		(config.openInNewTab) ? window.open(url) :  window.location.href = url; //Open the location.
	}); //end $buttons event listener
}); //end document.ready
