var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var photoSchema = new Schema({
	placeID: String,
	userID: String,
	originalPath: String,
	smallPath: String,
	mediumPath: String,
	largePath: String,
	createdDate: Date,
	caption: String,

	// non-persisted
	placeName: String,
	userName: String
});

photoSchema.pre('save', function(next) {
	this.placeName = undefined;
	this.userName = undefined;

	next();
});

module.exports = mongoose.model('Photo', photoSchema);