
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
var threads = routes.threads;

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
app.post('/users/auth', user.authUser);

function log(req, res, next) {
			console.log(req.params);
		console.log(req.body);
	next();
}

app.post('/photos', log, photos.newFromUser);
app.get('/photos', log, photos.byPage);
app.get('/photos/page/:page', log, photos.byPage);

app.get('/photos/place/:placeID/page/:page', log, photos.byPlace);
app.get('/photos/user/:userID/page/:page', log, photos.byUser);
app.get('/photos/nearby/:placeIDs', log, photos.nearby);

app.get('/photo/:photoID/threads', log, threads.getThreadPreviews);
app.get('/thread/:threadID', log, threads.getThread);
app.post('/threads', log, threads.newThread);
app.put('/thread/:threadID/comment', log, threads.newComment);


// app.post('/photos/user/:userID', log, photos.newFromUser);
// app.get('/photo/:id', photos.byID);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
