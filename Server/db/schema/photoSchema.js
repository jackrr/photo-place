var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var photoSchema = new Schema({
	placeID: String,
	userID: String,
	originalPath: String,
	smallPath: String,
	mediumPath: String,
	largePath: String,
	dimensions: {
		width: Number,
		height: Number
	},
	createdDate: Date,

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