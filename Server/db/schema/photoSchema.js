var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var photoSchema = new Schema({
	locationID: String,
	userID: String,
	path: String,
	thumbPath: String,
	dimensions: {
		width: Number,
		height: Number
	},

	// non-persisted
	image: String
});

photoSchema.pre('save', function(next) {
	this.image = undefined;

	next();
});

module.exports = mongoose.model('Photo', photoSchema);