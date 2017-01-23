'use strict';

const express = require('express');

const models = require('../models');

const router = express.Router();

// /wiki prefix on all routes here
router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', function(req, res, next) {
	const page = models.Page.build({
		title: req.body['page-title'],
		content: req.body['page-content']
	});

	page.save()
	.then((newPage) => res.redirect(newPage.route))
	.catch(next);
});

router.get('/add', function(req, res) {
	res.render('addpage');
});

router.get('/:urlTitle', function(req, res, next) {
	/*
	var req = express.Request();
	var res = express.Response();
	var next = function(data) {
		express.getReadyForNextHandler(data, req, res);
		nextRouteHandler(req, res, anotherNextFunction);
	}
	ourRouterFunction(req, res, next);
	*/
	models.Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then((page) => {
		if (page)
		{
			console.log(page);
			res.render('wikipage', {page: page});
		}
		else
		{
			res.status(404).send('Not Found');
		}

	})
	.catch(next)
});

module.exports = router;
