exports.serverURL = Alloy.CFG.serverURL; // iOS devel
// exports.serverURL = "http://10.0.2.2:3000/"; // Android devel
// exports.serverURL = "http://photoplace.cs.oberlin.edu/"; // production server

exports.sendPhoto = function(url, blob, place, caption) {
	var userID = Ti.App.Properties.getObject('authInfo').id;

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info('Info received: ' + this.responseText);
			var response = JSON.parse(this.responseText);
			if (response && response.photo) {

			} else {
				Ti.API.error('Error uploading photo: ' + this.responseText);
			}
		},
		onerror : function(e) {
			Ti.API.error('Error uploading photo: ' + this.responseText);
		},
		timeout : 10000
	});
	client.onsendstream = function(e) {
		// this could be useful for large photos..
		Ti.API.info('ONSENDSTREAM - PROGRESS: ' + e.progress);
	};

	client.open("POST", url);
	Ti.API.info('place: ' + place);
	client.send({
		userID : userID,
		place : JSON.stringify(place),
		image : Ti.Utils.base64encode(blob).toString(),
		caption: caption
	});
};

exports.checkPassword = function(url, info, cb) {
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			Ti.API.info('Response: ' + this.responseText);
			cb(null, this.responseText);
		},
		onerror : function(e) {
			Ti.API.info('Error: ' + this.responseText);
			cb(JSON.parse(this.responseText).err, null);
		},
		timeout : 10000
	});

	client.open("POST", url);
	client.send({
		username : info.username,
		password : info.password
	});
};

exports.getNearbyPlaces = function(e,cb) {
	var lat = e.coords.latitude;
	var lng = e.coords.longitude;
	var radius = Alloy.CFG.nearRadius;
	
	var placesURL = "https://maps.googleapis.com/maps/api/place/search/json?key=" + Alloy.CFG.placesAPIKEY +
	  '&location=' + lat + ',' + lng + '&radius=' + radius + '&sensor=false'; 

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var response = JSON.parse(this.responseText);
			if (response.results) {
				var places = [];
				_.each(response.results, function(place) {
					places.push({
						name : place.name,
						id : place.id,
						icon : place.icon
					});
				});
				// return the places to the callback function
				cb(places);
			} else {
				Ti.API.info('Error finding nearby locations: ' + this.responseText);
			}
		},
		onerror : function(e) {
			Ti.API.info('Error finding nearby locations: ' + this.responseText);
		},
		timeout : 5000
	});
	
	Ti.API.info('places url : '+placesURL);
	client.open("GET",placesURL);
	client.send();

	// Ti.Geolocation.getCurrentPosition(function(location) {
		// if (location.success) {
			// var lat = location.coords.latitude;
			// var lng = location.coords.longitude;
			// placesURL = placesURL + '&location=' + lat + ',' + lng + '&radius=' + radius + '&sensor=false';
			// client.open("GET", placesURL);
			// client.send();
		// } else {
			// cb(location.error);
		// }
	// });
};

exports.nearbyPlaceIdsForURL = function(page, cb) {
	var placesURL = "https://maps.googleapis.com/maps/api/place/search/json?key=" + Alloy.CFG.placesAPIKEY;
	var radius = Alloy.CFG.nearRadius;

	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			var response = JSON.parse(this.responseText);
			if (response.results) {
				var places = [];
				_.each(response.results, function(place) {
					places.push(place.id);
				});
				places = places.toString();
				cb(null, places);
			} else {
				cb('Error finding nearby locations: ' + this.responseText);
			}
		},
		onerror : function(e) {
			cb('Error finding nearby locations: ' + this.responseText);
		},
		timeout : 5000
	});

	Ti.Geolocation.getCurrentPosition(function(location) {
		if (location.success) {
			var lat = location.coords.latitude;
			var lng = location.coords.longitude;
			placesURL = placesURL + '&location=' + lat + ',' + lng + '&radius=' + radius + '&sensor=false';
			if (page > 0) {
				placesURL = placesURL + '&pagetoken=' + page;
			}
			client.open("GET", placesURL);
			client.send();
		} else {
			cb(location.error);
		}
	});	
};
