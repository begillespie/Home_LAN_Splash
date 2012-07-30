//tested in Chrome 22.0.1207.1
//The jqueryui bounce effect misbehaves in IE and Firefox
//Version: 0.5 29July2012

var networkResources = {
	"xbmc_living_room" : "192.168.1.101:8080", //the form for each element is "id" : "address"
	"xbmc_upstairs" : "192.168.1.104:8080",
	"xbmc_bedroom" : "192.168.1.111:8080",
	"utorrent" : "192.168.1.100:8080/gui",
	"nas" : "192.168.1.103",
	"router1" : "192.168.1.1",
	"router2" : "192.168.1.2",
	"server" : "192.168.1.100"
}; //list all the resources and addresses for the splash screen. 'Id' should correspond to the html document. 'Address' should be the network address for the resource minus the 'http://', eg. '"nas" : "192.168.1.1:8080/gui"'

$(document).ready(function(){
	var $buttons = $('.button'); //cache selector for the clickable "buttons" found in the <li>'s
	var $chalkboard = $('#chalkboard');

//pulls the data from the chalkboard.txt file on the server and displays it in the chalkboard
	$.ajax({
		url: 'http://' + networkResources['server'] + '/chalkboard.txt', //build the URI
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
	}); //end ajax pull

//send changes to the chalkboard to the server whenever the user changes focus
	$chalkboard.blur(function(){
		$.ajax({
			type: 'POST',
			url: 'http://' + networkResources['server'] + '/save_chalkboard.php', //build the URL. Assumes the script is in the server root. Modify the path accordingly.
			data: {"content" : $chalkboard.val()}, //grab the contents of the textarea and format it for the php script
			dataType: 'text'
		}); //end ajax post
	}); //end blur

//add effects when the user mouses over the buttons
	$buttons.mouseenter(function(){
		$(this).addClass("pressed"); //adds underglow effect
		$(this).effect("bounce", { times:2, distance:10}, 300); //bounce!! this effect misbehaves in IE and Firefox. 
	})
	.mouseleave(function(){
		$(this).removeClass("pressed"); //removes underglow effect
	})
	.click(function(){
		var url = "http://" + networkResources[$(this).attr("id")]; //create the url
//Open the location. Uncomment one of these two lines to choose the behavior.
		window.open(url); //Open in new tab
//		window.location.href = url; //Open in same tab
	}); //end $buttons event listener

}); //end document.ready

/*
PHP script that saves the chalkboard to file. Put the code between the tear lines into a file called "save_chalkboard.php" in the server root directory. Make sure your server is set up to run PHP.
----------------------------------
<?php 
$content = $_POST['content']; 
$fp = fopen("chalkboard.txt","w"); 
fwrite($fp , $content); 
fclose($fp); 
?>
----------------------------------
*/