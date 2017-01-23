'use strict';

var express = require('express');
var models = require('../models');
var router = express.Router();

router.get('/', (req, res, next) => {
	models.Page.findAll()
	.then((pages) => {
		res.render('index', {pages: pages});
	})
	.catch(next);
});

router.use('/wiki', require('./wiki'));
router.use('/users', require('./users'));

module.exports = router;
