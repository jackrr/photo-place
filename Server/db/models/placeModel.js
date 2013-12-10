var mongoose = require('mongoose');
var Place = require('../schema/placeSchema');
var _ = require('underscore');
var APIKEY = require('../../googleAPIKey.json').key;
var GooglePlaces = require('google-places');

var gp = new GooglePlaces(APIKEY);
var radius = 100;

Place.updateOrCreate = function(place, cb) {
	Place.find({_id: place.id}, function(err, sPlace) {
		if (err) return cb(err);
		if (sPlace && sPlace.length) {
			sPlace[0].update({
				name: place.name,
				icon: place.icon
			}, function(err, success) {
				cb(err, sPlace[0]);
			});
		} else {
			Place.create({
				_id: place.id,
				name: place.name,
				icon: place.icon
			}, cb);
		}
	});
};

module.exports = Place;