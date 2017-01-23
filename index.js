'use strict';

var express = require('express');
var morgan = require('morgan');
var path = require('path');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var models = require('./models');

//Setup
var app = express();
var env = nunjucks.configure('views');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.set('view engine', 'html');
app.engine('html', nunjucks.render);

//Routes
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/', require('./routes'));

models.syncAll().then(
  function(){
    app.listen(8042, () => {
      console.log('Listening on http://localhost:8042');
    });
  }
)
.catch(console.error);


