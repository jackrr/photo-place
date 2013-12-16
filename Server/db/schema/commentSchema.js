var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var commentSchema = new Schema({
	userID: {type: String, required: true},
	username: {type: String, required: true},
	body: {type: String, required: true},
	createdDate: Date
});

module.exports = mongoose.model('Comment', commentSchema);