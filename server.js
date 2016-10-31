// Dependencies:
var express = require('express');
var request = require('request'); // Snatches html from urls
var cheerio = require('cheerio'); // Scrapes our html
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//EXPRESS CONFIG
var app = express();

//BODYPARSER
//parse application/json
app.use(bodyParser.json());

//parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//NOT SURE ON THIS ONE
app.use(bodyParser.text());

//set the static files location
app.use(express.static(__dirname + '/public'));

//ROUTES
var routes = require('./app/routes'); //configure our routes
app.use('/', routes);

// Make a request call to grab the html body from the site of your choice
console.log("\n***********************************\n" +
    "Grabbing every thread name\n" +
    "and link from fark:" +
    "\n***********************************\n");
request("http://www.fark.com/", function (error, response, html) {

    // Load the html into cheerio and save it to a var.
    var $ = cheerio.load(html);

    // an empty array to save the data that we'll scrape
    var result = [];

    // Select each instance of the html body that you want to scrape.
    $(".headline a").each(function (i, element) {

        var title = $(element).text();
        var link = $(element).attr('href');

        result.push({
            title: title,
            link: link
        });
        // Scrape information from the web page, put it in an object
        // and add it to the result array.
    });
});

var PORT = process.env.PORT || '3000';

//LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
