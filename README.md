Home_LAN_Splash
===============

A home network splash page with a persistent chalkboard.

My first GIT project. This is a home network splash page. It holds links to the webUIs for all of the network attached devices and services.
It also has space to embed the family calendar using Google Calendar or similar. Finally, it has a persistent chalkboard to leave notes on.
This project uses a php script to write text to the server. For that reason, I don't recommend using this on a public-facing server. It is intended for use on the LAN.

HOW TO USE THIS
Put all the files together on a PHP-enabled webserver.
Open the index.html file and were indicated, paste the embed code for the calendar you want to use. A calendar sized 800x600px or smaller will work best.
Open the script.js file and enter the correct information to define your logical network. There are 4 variables to set.
You may define background images for the buttons in the style.css file. If no image is defined or found, the button will default to grey.
Navigate to index.html in your browser.