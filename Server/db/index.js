var mongoose = require('mongoose');

// connect to db
mongoose.connect('mongodb://localhost/photoplace');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var UserModel = require('./models/userModel');

module.exports = {
		User: UserModel
};