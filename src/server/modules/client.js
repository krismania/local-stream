var router = require('express').Router();

router.get('/bundle.js', function(req, res) {
	res.sendFile('bundle.js', {root: './build'});
});

router.get('/*', function(req, res) {
	res.sendFile('index.html', {root: './static'});
});

module.exports = router;