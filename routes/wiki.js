'use strict';

const express = require('express');

const models = require('../models');

const router = express.Router();

// /wiki prefix on all routes here
router.get('/', function(req, res) {
	res.redirect('/');
});

router.post('/', function(req, res, next) {
	models.User
		.findOrCreate({
			where: {
				name: req.body['author-name'],
				email: req.body['author-email']
			}
		})
		.then((values) => {
			var user = values[0];
			// var isCreated = values[1];

			const page = models.Page.build({
				title: req.body['page-title'],
				content: req.body['page-content']
			});

			return page.save().then(() => page.setAuthor(user));
		})
		.then((page) => res.redirect(page.route))
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
		},
		include: [
			{model: models.User, as: 'author'}
		]
	})
		.then((page) => {
			if (page)
			{
				console.log(JSON.stringify(page));
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
