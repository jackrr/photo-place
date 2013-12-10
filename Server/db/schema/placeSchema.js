var mongoose = require('mongoose'),
		Schema = mongoose.Schema;
		// Address = require('addressSchema');

var placeSchema = new Schema({
	_id: String,
	name: String,
	icon: String
});

module.exports = mongoose.model('Place', placeSchema);