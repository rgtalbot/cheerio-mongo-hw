// Dependencies:
var express = require('express');
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

//MONGOOSE CONNECTION
mongoose.connect('mongodb://heroku_fgkw7jll:r8c05cncsv80ceodjrl7hnvacs@ds019658.mlab.com:19658/heroku_fgkw7jll');
var db = mongoose.connection;


//SHOW MONGOOSE ERRORS
db.on('error', function(err) {
    console.log('Mongoose Error: ', err)
});

//LOGIN SUCCESSFUL
db.once('open', function() {
    console.log('Mongoose connection successful.')
});


//ROUTES
var routes = require('./app/routes'); //configure our routes
app.use('/', routes);


var PORT = process.env.PORT || '3000';

//LISTENER
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
