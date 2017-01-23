var db = require('./db');
var Sequelize = require('sequelize');

var Page = db.define('page', {
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
    get: function(){
      return '/wiki/' + this.getDataValue('urlTitle');
    }
  }
  ,
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
});

module.exports = Page;
