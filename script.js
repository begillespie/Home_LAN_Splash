//tested in Chrome 22.0.1207.1
//The jqueryui bounce effect misbehaves in IE and Firefox
//Version:  0.8 02August2012
//https://github.com/begillespie/Home_LAN_Splash.git


//These five variables define the content, layout and behavior of the page.
//===========================================================================================================
var networkResources = [
	{typeClass: "xbmc", buttonId: "xbmc_living_room", address: "192.168.1.101:8080", label: "Living Room"},
	{typeClass: "xbmc", buttonId: "xbmc_upstairs", address: "192.168.1.104:8080", label: "Upstairs"},
	{typeClass: "xbmc", buttonId: "xbmc_bedroom", address: "192.168.1.111:8080", label: "Bedroom"},
	{typeClass: "services", buttonId: "utorrent", address: "192.168.1.100:8080/gui", label: "µTorrent"},
	{typeClass: "services", buttonId: "nas", address: "192.168.1.103", label: "Fileserver"},
	{typeClass: "routers", buttonId: "router1", address: "192.168.1.1", label: "Upstairs Router"},
	{typeClass: "routers", buttonId: "router2", address: "192.168.1.2", label: "Downstairs Router"}
]; //list all the resources and addresses for the splash screen.
//typeClass:  Use to make groups of resources. The names and number of 'typeClass' is arbitrary, but each one must be assigned to a column in the 'typeClassList' array below. DATA TYPE: string
//buttonId:  A unique identifier for each button. DATA TYPE: string
//address:  The address or IP address of the resource on the network. Use the form 'address[:port][/path]' without the 'http://' eg. '192.168.1.100:8080/gui'. DATA TYPE: string
//label:  Defines the text on the button. Can be any string, but more than about 20 characters may overflow the button. DATA TYPE: string

var typeClassList = [
	{typeClass: "xbmc", column: "left"},
	{typeClass: "services", column: "right"},
	{typeClass: "routers", column: "right"}
]; //define the layout for the resources. Each 'typeClass' is displayed in a separate box in the specified column. 
//typeClass:  Must correlate to 'typeClass' in the networkResources array. DATA TYPE: string
//column:  Specify "left" or "right". DATA TYPE: string

var scriptPath = "192.168.1.100"; //define the address and path for the server scripts. DATA TYPE: string

var openInNewTab = true; //do you want to open links in a new tab or not? DATA TYPE: boolean (true/false)

var ajaxTimeout = 6; //specify the timeout in seconds. Longer timeout will give other systems more time to respond when we check them, but slow page load time. DATA TYPE: integer
//===========================================================================================================


$(document).ready(function(){

	var $chalkboard = $('#chalkboard');
	var $left_column = $('#left_column');
	var $right_column = $('#right_column');
	
//pull the data from the chalkboard.txt file on the server and displays it in the chalkboard
	$.ajax({
		url: 'http://' + scriptPath + '/chalkboard.txt', //build the URI
		dataType: 'text',
		success: function(data){
			if(data){$chalkboard.html(data); //put the contents of the text file into the html
		} else {
			$chalkboard.html("Here is the chalkboard! Leave notes on it. When you click out of this box, it will save automatically!"); //leave a note if there is nothing in the file
			}
		},
		error: function(){
			$chalkboard.html("Here is the chalkboard! Leave notes on it. When you click out of this box, it will save automatically!"); //leave a note if the text file doesn't exist. The php script will create the file when it runs.
		}
	}); //end ajax GET
	
//send changes to the chalkboard to the server whenever the user changes focus away from the chalkboard
	$chalkboard.blur(function(){
		$.ajax({
			type: 'POST',
			url: 'http://' + scriptPath + '/save_chalkboard.php', //build the URL.
			data: {"content" : $chalkboard.val()}, //grab the contents of the textarea and format it for the php script
			dataType: 'text'
		}); //end ajax POST
	}); //end blur function
	
//create the buttons
	var networkResourcesLength = networkResources.length;
	var typeClassListLength = typeClassList.length;
	//Iterate over the typeClassList array and put the type groups in the correct column. Then, create the buttons in the correct group.
	for (var i=0; i<typeClassListLength; i++){
		if(typeClassList[i].column === "left"){ //work on the left column
			$left_column.append(createTypeGroupHTML(i)); //create the typeClass group
				for (var j=0; j<networkResourcesLength; j++){ //iterate over the networkResources array...
					if(networkResources[j].typeClass === typeClassList[i].typeClass){ //...and find the resources that belong in each group
						createButtonHTML(i,j); //generate the html
					}
				}
		}else if(typeClassList[i].column === "right"){ //work on the right column, doing the same thing
			$right_column.append(createTypeGroupHTML(i));
				for (var k=0; k<networkResourcesLength; k++){
					if(networkResources[k].typeClass === typeClassList[i].typeClass){
						createButtonHTML(i,k);
					}
				}

		}
	}
	
	function createTypeGroupHTML(index){
		return '<ul id="' + typeClassList[index].typeClass + '" class="type" ></ul>'; //creates html for typeClass groups
	}
				//html:
				// <ul id="foo" class="type"></ul>

	function createButtonHTML(typeIndex, buttonIndex){
		$('#'+typeClassList[typeIndex].typeClass).append('<li class="buttonwrapper"><div class="button" id="' + networkResources[buttonIndex].buttonId + '" data-address="' + networkResources[buttonIndex].address + '"><p>' + networkResources[buttonIndex].label + '</p><div class="status down"></div></div></li>'); //creates the buttons and stores the corresponding address string in the DOM as a custom data element
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
			url: 'http://' + scriptPath + '/getHTTPHeader.php',
			dataType: 'text',
			data: {'url' : checkURL, 'timeout' : ajaxTimeout},
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
		(openInNewTab) ? window.open(url) :  window.location.href = url; //Open the location.
	}); //end $buttons event listener
}); //end document.ready