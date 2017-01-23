'use strict';

const express = require('express');

const models = require('../models');

const router = express.Router();

// /search prefix on all routes here
router.get('/', function(req, res, next) {
	models.Page.findAll({
		where: {
			tags: {
				$overlap: [req.query.tag]
			}
		}
	})
	.then((pages) => res.render('search', {pages: pages}))
	.catch(next);

});


module.exports = router;
