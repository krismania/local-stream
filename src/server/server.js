require('dotenv').config() // set env variables

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
app.use('/user', require('./modules/user'));

// redirect '/' to '/stream'
app.get('/', function(req, res) {
	res.redirect(303, '/stream');
})

// start the server
var host = process.env.host || '0.0.0.0'
var port = process.env.port || '8080'

var server = app.listen(port, host, function() {
	log('Listening at ' + host + ':' + port);
})
.on('error', function(err) {
	if (err.errno === 'EADDRINUSE') {
		log('Error: ' + host + ':' + port + ' is in use');
	}
});
