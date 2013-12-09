function callback(e) {
    if (!e.success || e.error) {
        Ti.API.info("Error: " + JSON.stringify(e.error));
        alert("Error " + JSON.stringify(e.error));
        return;
    }
    var longitude = e.coords.longitude;
    var latitude = e.coords.latitude;
    var timestamp = e.coords.timestamp;
    Ti.App.Properties.setObject("userPosition", {
        longitude: longitude,
        latitude: latitude,
        timestamp: timestamp
    });
    Ti.App.fireEvent("postionUpdate");
}

exports.initialize = function() {
    Titanium.Geolocation.trackSignificantLocationChange = true;
    Titanium.Geolocation.distanceFilter = 10;
    Ti.Geolocation.getCurrentPosition(callback);
};

exports.getUserLocation = function() {
    Ti.Geolocation.getCurrentPosition(callback);
};