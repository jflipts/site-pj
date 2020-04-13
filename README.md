# [pieterjanverhoyen.be](https://pieterjanverhoyen.be/)
This site has been developed for free by Jeroen Flipts (jeroen.flipts@gmail.com). 

The site is build on top of bootstrap with the [mdb](https://mdbootstrap.com/) (material design) theme.

# Dev setup
You can run the site locally using [XAMPP](https://www.apachefriends.org/index.html). The default installation of XAMPP will suffice, however you may want to setup php debugging and a mail service for a better developer experience. In order to run the site locally, the project files need to be in the _/xampp/htdocs/_ folder.

## PHP debugging
In order to debug PHP I suggest you use the vscode plugin [PHP Debug](https://marketplace.visualstudio.com/items?itemName=felixfbecker.php-debug) and follow the setup in the description.

## Mail service
Add the following line to your php.ini of XAMPP: 
`sendmail_path="C:\xampp\mailtodisk\mailtodisk.exe"`

This will output every mail as a .txt file in the _/xampp/mailoutput/_ folder. It is possible to use an actual mail service if desired.

# Backlog
* Change mdb to the npm package of mdb
* Database for events and shop
* Handle payment trough the site
* Change to a framework such as angularjs or vuejs
* Popup modal for promotional purposes of events and new releases.
* Remove all javascript from the html
* Change to scss
* CICD
