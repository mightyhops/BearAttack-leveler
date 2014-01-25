/**
 * BearAttack-leveler - A level editor for BearAttack
 * 
 * Created at the Global Game Jam 2014, Volta Jam
 * Andrew Valencik, Nate Myles
 *
 */

// dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

// environment setup
var app = express();
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// routes
app.get('/', routes.index);

// Start server, print out listen info
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
