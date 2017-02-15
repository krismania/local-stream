var log = require('./log');
var router = require('express').Router();
var fs = require('fs');

router.get('/', function(req, res) {
	res.send('Howdy');
});

function read(path) {
	// reads and parses the json file at [path]
	try {
		var file = fs.readFileSync(path);
		var json = JSON.parse(file);
		return json;
	} catch (e) {
		if (e.code === 'ENOENT') {
			return { err: 'File not found' };
		} else if (e instanceof SyntaxError) {
			return { err: 'Malformed JSON' };
		} else {
			throw e;
		}
	}
}

function getShowInfo(id) {
	var json = read('static/media/' + id + '/info.json');
	var info = {};

	// if there was an error reading, send the error
	if (json.err) {
		return json;
	}

	info.id = id;
	info.title = json.title || '';
	info.year = json.year || '?';

	// get array of season folders
	// filter non-numbers (i.e. anything apart from numbered folders)
	var seasons = fs.readdirSync('static/media/' + id).filter(folder => !isNaN(folder));
	// add each season's info
	info.seasons = seasons.map(season => getSeasonInfo(id, season));

	// check if the cover image exists
	if (fs.existsSync('static/media/' + id + '/cover.png')) {
		// if it does, send it's web path
		info.cover = '/static/media/' + id + '/cover.png';
	} else {
		// otherwise, send null and handle client-side
		info.cover = null;
	}

	return info;
}

function getSeasonInfo(id, season) {
	var json = read('static/media/' + id + '/' + season + '/season.json');
	var info = {};

	// if there was an error reading, send the error
	if (json.err) {
		return json;
	}

	info.num = season;
	info.title = json.title || 'Season ' + season;
	info.episodes = json.episodes || [];
	info.availableEpisodes = getSeasonEps(id, season);

	return info;
}

function getSeasonEps(id, season) {
	var eps = [];
	var readDir = fs.readdirSync('static/media/' + id + '/' + season);
	// remove files that aren't .mp4s & remove file extension
	eps = readDir.filter((file) => file.slice(-3) === 'mp4')
	                 .map((file) => parseInt(file.slice(0, -4)));
	// sort episodes
	eps.sort((a, b) => a - b);

	return eps;
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

// get season info
router.get('/shows/:id/S:season', function(req, res) {
	log('Request show: ' + req.params.id + ' season: ' + req.params.season);
	res.json(getSeasonInfo(req.params.id, req.params.season));
});

module.exports = router;
