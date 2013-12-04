exports.sendPhoto = function(url, blob) {
    var userID = Ti.App.Properties.getObject("authInfo").id;
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            var response = JSON.parse(this.responseText);
            Ti.API.info("Info received: " + response.toSource());
            response.photo || response.places || Ti.API.error("Error uploading photo: " + this.responseText);
        },
        onerror: function() {
            Ti.API.error("Error uploading photo: " + this.responseText);
        },
        timeout: 1e4
    });
    client.onsendstream = function(e) {
        Ti.API.info("ONSENDSTREAM - PROGRESS: " + e.progress);
    };
    Ti.Geolocation.getCurrentPosition(function(location) {
        if (location.success) {
            Ti.API.info("found location!");
            client.open("POST", url);
            client.send({
                userID: userID,
                coords: JSON.stringify(location.coords),
                image: Ti.Utils.base64encode(blob).toString()
            });
        } else Ti.API.error(location.error);
    });
};