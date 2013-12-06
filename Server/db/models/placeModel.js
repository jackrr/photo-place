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
				address: place.vicinity,
				icon: place.icon,
				coordinates: {
					lat: place.geometry.location.lat,
					lon: place.geometry.location.lng
				}
			}, function(err, success) {
				cb(err, sPlace[0]);
			});
		} else {
			Place.create({
				_id: place.id,
				name: place.name,
				coordinates: {
					lat: place.geometry.location.lat,
					lon: place.geometry.location.lng
				},
				icon: place.icon,
				address: place.vicinity
			}, cb);
		}
	});
};

module.exports = Place;