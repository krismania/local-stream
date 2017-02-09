var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var log = require('./modules/log');

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