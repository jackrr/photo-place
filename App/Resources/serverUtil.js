exports.sendPhoto = function(url, blob) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Info received: " + this.responseText);
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
                coords: JSON.stringify(location.coords),
                image: Ti.Utils.base64encode(blob).toString()
            });
        } else Ti.API.error(location.error);
    });
};