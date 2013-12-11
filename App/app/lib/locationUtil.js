var ServerUtil = require('serverUtil');

function haversineDistance(coords1, coords2) {
	lat1 = coords1.latitude || coords1.lat;
	lon1 = coords1.longitude || coords1.lon;
	lat2 = coords2.latitude || coords2.lat;
	lon2 = coords2.longitude || coords2.lon;
	Ti.API.info(lat1 + ' ' + lon1 + ' ' + lat2 + ' ' + lon2);

	// R is in m (change this constant to get miles)
	var R = 6371000;
	var dLat = (lat2 - lat1) * Math.PI / 180;
	var dLon = (lon2 - lon1) * Math.PI / 180;
	var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	Ti.API.info('Distance between coordinates: ' + d);
	return Math.round(d);
}

var locationServicesAlert = Ti.UI.createAlertDialog({
	title : 'Warning',
	message : 'To upload photos location services must be enabled for PhotoPlace'
});

var checkForLocationUpdate = function() {
	if (!Titanium.Geolocation.locationServicesEnabled) {
		Titanium.UI.createAlertDialog({
			title : 'Warning',
			message : 'Your device\'s location services are turned off and must be on to upload photos'
		}).show();
		return;
	}
	if (OS_IOS && !Ti.Geolocation.AUTHORIZATION_AUTHORIZED) {
		locationServicesAlert.show();
		return;
	}

	var locationCallback = function(e) {
		Ti.API.info('location callback');

		if (!e.success || e.error) {
			Ti.API.info('Error: ' + e.error);
			return;
		}

		Ti.API.info('e : ' + JSON.stringify(e));

		var oldCoords = Ti.App.Properties.getObject('prevCoordinates', false);
		var curPlace = Ti.App.Properties.getObject('currentPlace',false);
		
		Ti.API.info('previous coordinates ' + JSON.stringify(oldCoords));
		Ti.API.info('current place '+ JSON.stringify(curPlace));
		
		if (!oldCoords || !curPlace || haversineDistance(e.coords, oldCoords) >= Alloy.CFG.nearRadius) {
			Ti.API.info('inside locationCallback if statement');
			ServerUtil.getNearbyPlaces(e, function(places) {
				// update the list of nearby places
				Ti.App.Properties.setObject('nearbyPlaces', {
					list : places
				});

				// construct picker window
				var pickerWindow = Ti.UI.createWindow({
					layout : 'vertical',
					backgroundColor : 'white'
				});
				var titleLabel = Ti.UI.createLabel({
					text : 'Where are you?',
					top : 20
				});
				var picker = Ti.UI.createPicker({
					top : 10
				});
				rows = [];
				var placeHash = {};
				_.each(places, function(place) {
					rows.push(Ti.UI.createPickerRow({
						title : place.name,
						value : place.id
					}));
					placeHash[place.id] = place;
				});
				Ti.API.info('picker rows : '+JSON.stringify(rows));
				picker.add(rows);
				var close = Ti.UI.createLabel({
					text : 'Done',
					top : 10
				});
				close.addEventListener('click', function(e) {
					Ti.API.info('selected row : '+JSON.stringify(picker.getSelectedRow(0)));
					var selectedLocation = placeHash[picker.getSelectedRow(0).value];
					Ti.App.Properties.setObject('currentPlace', {
						id : selectedLocation.id,
						name : selectedLocation.name,
						icon : selectedLocation.icon
					});
					Ti.API.info('nearby places : '+JSON.stringify(Ti.App.Properties.getObject('nearbyPlaces')));
					Ti.API.info('current location : '+JSON.stringify(Ti.App.Properties.getObject('currentPlace')));
					pickerWindow.close();
				});
				
				pickerWindow.add(titleLabel);
				pickerWindow.add(picker);
				pickerWindow.add(close);
				pickerWindow.open();
			});
		} else {
			Ti.API.info('No location update needed');
		}

		Ti.App.Properties.setObject('prevCoordinates', {
			lat : e.coords.latitude,
			lon : e.coords.longitude
		});
		Ti.API.info('set previous coordinates property to '+JSON.stringify(Ti.App.Properties.getObject('prevCoordinates')));
		Titanium.Geolocation.removeEventListener('location', locationCallback);
	};

	Ti.Geolocation.addEventListener('location', locationCallback);
	//getCurrentPosition();
};

exports.checkForLocationUpdate = checkForLocationUpdate;

exports.nearbyPlaceIdsForURL = function() {
	var places = [];
	_.each(Ti.App.Properties.getObject('nearbyPlaces').list, function(place) {
		places.push(place.id);
	});
	return places.toString();
};

// Ti.Geolocation.getCurrentPosition(function(e) {
// Ti.API.info('e is ' + JSON.stringify(e));
// slowTrain.latitude = e.coords.latitude;
// slowTrain.longitude = e.coords.longitude;
//
// Ti.API.info('Apollo ' + JSON.stringify(apollo));
// Ti.API.info('Current position (slow train) ' + JSON.stringify(slowTrain));
// Ti.API.info('Distance from Apollo to ST ' + haversineDistance(apollo, slowTrain));
// });

