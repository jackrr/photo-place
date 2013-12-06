exports.sendPhoto = function(url, blob) {
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			// maybe need to do something interesting here?
			Ti.API.info('Info received: ' + this.responseText);
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
	client.send({
		image : Ti.Utils.base64encode(blob).toString()
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
