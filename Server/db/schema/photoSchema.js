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
	}

	// non-persisted
	// fullPath: String
});

// photoSchema.pre('save', function(next) {
// 	this.fullPath = undefined;

// 	next();
// });

module.exports = mongoose.model('Photo', photoSchema);