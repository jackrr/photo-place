var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Comment = require('./commentSchema');

var threadSchema = new Schema({
	photoID: {type: String, required: true},
	userID: {type: String, required: true},
	name: {type: String, required: true},
	topCorner: {
		x: {type: Number, required: true},
		y: {type: Number, required: true}
	},
	bottomCorner: {
		x: {type: Number, required: true},
		y: {type: Number, required: true}
	},
	comments: [Comment],
	createdDate: Date
});

module.exports = mongoose.model('Thread', threadSchema);