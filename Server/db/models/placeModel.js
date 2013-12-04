var mongoose = require('mongoose');
var Place = require('../schema/placeSchema');
var _ = require('underscore');
var APIKEY = require('../../googleAPIKey.json').key;
var GooglePlaces = require('google-places');

var gp = new GooglePlaces(APIKEY);
var radius = 100;

Place.getPossibleLocations = function(coords, cb) {
	gp.search({
		location: [coords.latitude, coords.longitude],
		radius: radius
	}, function(err, response) {
		if (err) return cb(err);
		var places = [];
		_.each(response.results, function(place) {
			places.push({
				_id: place.id,
				name: place.name,
				icon: place.icon,
				coordinates: {
					lat: place.geometry.location.lat,
					lon: place.geometry.location.lng
				},
				address: place.vicinity
			});
		});
		cb(null, places);
	});
};

module.exports = Place;