var mongoose = require('mongoose'),
		Schema = mongoose.Schema;
		// Address = require('addressSchema');

var placeSchema = new Schema({
	_id: String,
	name: String,
	coordinates: {
		lat: String,
		lon: String
	},
	icon: String,
	address: String
});

module.exports = mongoose.model('Place', placeSchema);