function callback(e) {
	if (!e.success || e.error) {
		Ti.API.info('Error: ' + JSON.stringify(e.error));
		alert('Error ' + JSON.stringify(e.error));
		return;
	}
	var longitude = e.coords.longitude;
	var latitude = e.coords.latitude;
	var timestamp = e.coords.timestamp;

	Ti.App.Properties.setObject('userPosition', {
		longitude : longitude,
		latitude : latitude,
		timestamp : timestamp
	});
	Ti.App.fireEvent('postionUpdate');
}


/**
 * NOTE: on android systems getCurrentPosition() may pull a location from cache instead of firing up the GPS
 */
exports.initialize = function() {
	if (OS_IOS) {
		Titanium.Geolocation.trackSignificantLocationChange = true;
		Titanium.Geolocation.distanceFilter = 10;	
	}
	Ti.Geolocation.getCurrentPosition(callback);
	
	//Ti.Geolocation.f
};

exports.getUserLocation = function(){
	Ti.Geolocation.getCurrentPosition(callback);	
};
