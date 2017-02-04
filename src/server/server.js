var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var helper

var app = express();


// body parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// static files
app.use('/static', express.static('static'));

// serve routes
app.use('/stream', require('./modules/client'));
app.use('/api', require('./modules/api'));

// redirect '/' to '/stream'
app.get('/', function(req, res) {
	res.redirect(303, '/stream');
})

// start the server
var server = app.listen(8080, '0.0.0.0', function() {
	var host = server.address().address;
	var port = server.address().port;

	log('Listening at ' + host + ':' + port);
});

// ------------- //
//    HELPERS    //
// ------------- //

// logger function, appends event time to calls
function log(message) {
	// get the current time (in hh:mm:ss)
	var date = new Date();
	var time = {};

	time.hour = date.getHours();
	time.min = date.getMinutes();
	time.sec = date.getSeconds();

	// pad numbers < 10 with 0
	for (var num in time) {
		time[num] = (time[num] < 10 ? "0" : "") + time[num];
	}

	// format the output message
	var output = "[" + time.hour + ":" + time.min + ":" + time.sec + "] " + message;

	// print to console
	console.log(output);
}