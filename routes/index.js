'use strict';

var express = require('express');

var router = express.Router();

router.get('/', (req, res) => {
	res.send('Hello World!');
});

router.use('/wiki', require('./wiki'));

module.exports = router;