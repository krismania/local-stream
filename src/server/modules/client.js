var router = require('express').Router();

router.get('/bundle.js', function(req, res) {
	res.sendFile('bundle.js', {root: './build'});
})

module.exports = router;