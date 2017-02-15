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

router.post('/tracking/:name', function(req, res) {
	log('Tracking info for: ' + req.params.name);
	var show, season, episode, percentage;

	show = req.body.show;
	season = req.body.season;
	episode = parseInt(req.body.episode);
	percentage = req.body.percentage;

	// open user's file
	var watchedPath = 'static/users/' + req.params.name + '/watched.json';
	fs.readFile(watchedPath, (err, data) => {
		if (err) throw err;
		var watched = JSON.parse(data); // read file into object

		// create show/season within watched object if they don't exist
		if (!watched[show]) {
			watched[show] = {};
		}
		if (!watched[show][season]) {
			watched[show][season] = [];
		}

		// overwrite the old percentage for this episode
		var epIndex = watched[show][season].findIndex(epObj => epObj.num === episode);
		if (epIndex !== -1) {
			watched[show][season][epIndex] = {num: episode, percentage: percentage}
		} else {
			watched[show][season].push({num: episode, percentage: percentage});
		}

		// write the file back
		// JSON.stringify's 3rd arg generates nicer formatting
		fs.writeFile(watchedPath, JSON.stringify(watched, null, '\t'), (err) => {
			if (err) throw err;
			res.sendStatus(200);
		})
	});
});

router.get('/tracking/:name/:showId/:season', function(req, res) {
	log('Request watched for: ' + req.params.name + ' [' + req.params.showId + ' s' + req.params.season + ']');

	var watchedPath = 'static/users/' + req.params.name + '/watched.json';
	fs.readFile(watchedPath, (err, data) => {
		var watched = JSON.parse(data);
		// if show is there, send watched array as is
		if (watched[req.params.showId]) {
			res.json(watched[req.params.showId][req.params.season]);
		} else {
			// otherwise, send an empty array
			res.json([]);
		}
	});
});

module.exports = router;