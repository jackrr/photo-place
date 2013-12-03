exports.sendPhoto = function(url, blob) {
	var client = Ti.Network.createHTTPClient({
		onload : function(e){
			// maybe need to do something interesting here?
			Ti.API.info('Info received: ' + this.responseText);
		},
		onerror : function(e){
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
		image: Ti.Utils.base64encode(blob).toString()	
	});
};