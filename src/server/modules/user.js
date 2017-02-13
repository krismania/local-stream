var log = require('./log');
var router = require('express').Router();
var fs = require('fs');

router.get('/', function(req, res) {
	res.send('Howdy');
});

router.post('/create', function(req, res) {
	log('Create user: ' + req.body.name);
	try {
		fs.mkdirSync('static/users/' + req.body.name);
		fs.writeFileSync('static/users/' + req.body.name + '/watched.json', '{\n\t\n}');
		res.sendStatus(201);
	} catch (e) {
		console.log(e);
		res.sendStatus(409);
	}
});

router.post('/tracking', function(req, res) {
	res.sendStatus(501);
});

router.post('/authenticate', function(req, res) {
	log('Authenticate: ' + req.body.name);
	// placeholder, should be more robust in future
	var username = req.body.name;
	if (fs.existsSync('static/users/' + username)) {
		res.json({ authenticated: true });
	} else {
		res.json({ authenticated: false });
	}
});

module.exports = router;