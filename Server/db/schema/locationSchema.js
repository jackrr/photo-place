var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		Address = require('addressSchema');

var locationSchema = new Schema({
	name: String,
	coordinates: {
		lat: String,
		lon: String
	},
	address: [Address]
});

module.exports = mongoose.model('Location', locationSchema);