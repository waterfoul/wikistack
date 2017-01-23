'use strict';

const express = require('express');

const models = require('../models');

const router = express.Router();

// /wiki prefix on all routes here
router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', function(req, res) {
	const page = models.Page.build({
		title: req.body['page-title'],
		content: req.body['page-content']
	});

	page.save().then((newPage) => res.json(newPage));
});

router.get('/add', function(req, res) {
	res.render('addpage');
});

module.exports = router;
