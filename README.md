Home_LAN_Splash
===============

A home network splash page with a persistent chalkboard.

ABOUT
-----

My first GIT project. This is a home network splash page. It holds links to the webUIs for all of the network attached devices and services. It also has space to embed the family calendar using Google Calendar or similar. Finally, it has a persistent chalkboard to leave notes on. This project uses a php script to write text to the server. For that reason, I don't recommend using this on a public-facing server. It is intended for use on the LAN.

This is tested and works in Chrome. Under Firefox and IE, I've been having problems with the jQueryUI bounce effect. If you are planning to use this in FF or IE you can comment out the bounce code at around line 105 of js/script.js.

AUTHOR
------

By Brian Gillespie, 2012

@begillespie

github.com/begillespie

HOW TO USE
----------

1.  You need a webserver with PHP and cURL enabled.

2.  Clone this repo to your local machine.

```
git clone https://github.com/begillespie/Home_LAN_Splash.git
```

3.  Open the js/config.js file and enter the data for your logical network. There are 5 parameters to set:

  a.  Define the network resources you want to generate links to.

  b.  Define how to display the buttons.

  c.  Determine whether you want to open links in a new tab or not.

  d.  Specify the timeout for Ajax requests. This determines how long the script will wait for a resource to respond before it gets shown as down.

  e.  Paste the embed code for a shared calendar such as Google Calendars.

4.  You can define background images for the buttons at the top of the syles/style.css file. If no image is set or found, the button defaults to grey.

5.  If you want to use the persistent chalkboard, you will need to make a folder that the webserver can write to. In the Home_LAN_Splash directory (LINUX):

```
mkdir write
sudo chown www-data write
sudo chmod 775 write
```

6.  Navigate to index.html in a Javascript-enabled browser.

LICENSE
-------

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.

