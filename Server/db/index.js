var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/photoplace');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var UserModel = require('./models/userModel');
var PhotoModel = require('./models/photoModel');
var PlaceModel = require('./models/placeModel');
var ThreadModel = require('./models/threadModel');
var CommentModel = require('./models/commentModel');

module.exports = {
		Photo: PhotoModel,
		User: UserModel,
		Place: PlaceModel,
		Thread: ThreadModel,
		Comment: CommentModel
};