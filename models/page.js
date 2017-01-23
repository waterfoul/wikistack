var db = require('./db');
var Sequelize = require('sequelize');

function generateUrlTitle (title) {
	if (title) {
		// Removes all non-alphanumeric characters from title
		// And make whitespace underscore
		return title.toLowerCase().replace(/\s+/g, '_').replace(/\W/g, '');
	} else {
		// Generates random 5 letter string
		return Math.random().toString(36).substring(2, 7);
	}
}

var Page = db.define(
	'page',
	{
		title: {
			type: Sequelize.STRING,
			allowNull: false
		},
		urlTitle: {
			type: Sequelize.STRING,
			allowNull: false
		},
		route: {
			type: Sequelize.VIRTUAL,
			get: function () {
				return '/wiki/' + this.getDataValue('urlTitle');
			}
		},
		content: {
			type: Sequelize.TEXT,
			allowNull: false
		},
		status: {
			type: Sequelize.ENUM('open', 'closed')
		}
	},
	{
		hooks: {
			beforeValidate: function (page, options) {
				if (!page.urlTitle) {
					page.urlTitle = generateUrlTitle(page.title);
				}
			},
		}
	}
);

module.exports = Page;
