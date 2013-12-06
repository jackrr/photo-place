
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.db = require('./db/index.js');
var routes = require('./routes/index')(app.db);
var user = routes.user;
var photos = routes.photos;

// all environments
app.set('port', process.env.PORT || 3000);
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.post('/users', user.createNew);

function log(req, res, next) {
			console.log(req.params);
		console.log(req.body);
	next();
}

app.post('/photos', log, photos.newFromUser);
app.get('/photos', log, photos.byPage);
app.post('/photos/placeselect', log, photos.placeConfirm);
app.get('/photos/page/:page', log, photos.byPage);

// app.get('/photos/place/:placeName', log, photos.atPlace);
// app.get('/photos/user/:userName', log, photos.byUser);
// app.post('/photos/user/:userID', log, photos.newFromUser);
// app.get('/photo/:id', photos.byID);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
