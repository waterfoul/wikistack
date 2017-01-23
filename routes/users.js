'use strict';

const express = require('express');

const models = require('../models');

const router = express.Router();

// /users prefix on all routes here
router.get('/', function(req, res, next) {
	models.User.findAll()
		.then((users) => {
			res.render('users', {users: users});
		})
		.catch(next);
});

router.get('/:userId', function(req, res, next) {
	Promise.all([
		models.User.findById(req.params.userId),
		models.Page.findAll({
			where: {
				authorId: req.params.userId
			}
		})
	])
		.then((data) => {
			const user = data[0];
			const pages = data[1];

			if (user)
			{
				res.render('user', {
					user: user,
					pages: pages
				});
			}
			else
			{
				res.status(404).send('Not Found');
			}
		})
		.catch(next)
});

module.exports = router;
