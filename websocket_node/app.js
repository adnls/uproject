var express = require('express');
var app = express();


require('./config/routes')(app);

module.exports = app;
