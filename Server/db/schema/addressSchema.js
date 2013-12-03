var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var addressSchema = new Schema({
	street: String,
	num: Number,
	apt: String,
	city: String,
	state: String,
	country: String
});

module.exports = mongoose.model('Address', addressSchema);