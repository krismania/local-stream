var log = require('./log');
var router = require('express').Router();
var fs = require('fs');

router.get('/', function(req, res) {
	res.send('Howdy');
});

function getShowInfo(id) {
	var info = JSON.parse(fs.readFileSync('static/media/' + id + '/info.json'));
	info.id = id;
	// count seasons (count folders, subtract info.json)
	info.seasons = fs.readdirSync('static/media/' + id).length - 1;

	return info;
}

function getSeasonEps(id, season) {
	var eps = [];
	var readDir = fs.readdirSync('static/media/' + id + '/' + season);
	// remove files that aren't .mp4s & remove file extension
	readDir = readDir.filter((file) => file.slice(-3) === 'mp4')
	                 .map((file) => parseInt(file.slice(0, -4)));

	return readDir;
}

// list all available shows
router.get('/shows', function(req, res) {
	log('Request shows');
	var shows = [];
	var showFolders = fs.readdirSync('static/media');

	showFolders.forEach(function(showFolder) {
		shows.push(getShowInfo(showFolder));
	});

	res.json(shows);
});

// send information about the specified show
router.get('/shows/:id', function(req, res) {
	log('Request show: ' + req.params.id);
	res.json(getShowInfo(req.params.id));
});

// list episodes in show season
router.get('/shows/:id/S:season', function(req, res) {
	log('Request show: ' + req.params.id + ' season: ' + req.params.season);
	var eps = { episodes: getSeasonEps(req.params.id, req.params.season) };
	res.json(eps);
});

module.exports = router;