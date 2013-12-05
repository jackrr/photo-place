exports.sendPhoto = function(url, blob, place) {
    var userID = Ti.App.Properties.getObject("authInfo").id;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Info received: " + this.responseText);
            var response = JSON.parse(this.responseText);
            response && response.photo || Ti.API.error("Error uploading photo: " + this.responseText);
        },
        onerror: function() {
            Ti.API.error("Error uploading photo: " + this.responseText);
        },
        timeout: 1e4
    });
    client.onsendstream = function(e) {
        Ti.API.info("ONSENDSTREAM - PROGRESS: " + e.progress);
    };
    client.open("POST", url);
    Ti.API.info("place: " + place);
    client.send({
        userID: userID,
        place: JSON.stringify(place),
        image: Ti.Utils.base64encode(blob).toString()
    });
};

exports.getNearbyPlaces = function(cb) {
    var placesURL = "https://maps.googleapis.com/maps/api/place/search/json?key=" + Alloy.CFG.placesAPIKEY;
    var radius = Alloy.CFG.nearRadius;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText);
            if (response.results) {
                var places = [];
                _.each(response.results, function(place) {
                    places.push(place);
                });
                cb(null, places);
            } else cb("Error finding nearby locations: " + this.responseText);
        },
        onerror: function() {
            cb("Error finding nearby locations: " + this.responseText);
        },
        timeout: 5e3
    });
    Ti.Geolocation.getCurrentPosition(function(location) {
        if (location.success) {
            var lat = location.coords.latitude;
            var lng = location.coords.longitude;
            placesURL = placesURL + "&location=" + lat + "," + lng + "&radius=" + radius + "&sensor=false";
            client.open("GET", placesURL);
            client.send();
        } else cb(location.error);
    });
};