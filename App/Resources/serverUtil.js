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
    client.open("POST", url);
    client.send({
        image: Ti.Utils.base64encode(blob).toString()
    });
};

exports.checkPassword = function(url, info, cb) {
    var client = Ti.Network.createHTTPClient({
        onload: function() {
            Ti.API.info("Response: " + this.responseText);
            cb(null, this.responseText);
        },
        onerror: function() {
            Ti.API.info("Error: " + this.responseText);
            cb(JSON.parse(this.responseText).err, null);
        },
        timeout: 1e4
    });
    client.open("POST", url);
    client.send({
        username: info.username,
        password: info.password
    });
};