exports.sendPhoto = function(url, blob) {
	var userID = Ti.App.Properties.getObject('authInfo').id;

	var client = Ti.Network.createHTTPClient({
		onload : function(e){
			Ti.API.info('Info received: ' + this.responseText);
			var response = JSON.parse(this.responseText);
			if (response.photo) {
				// one place, resulted in photo
			} else if (response.places) {
				// multiple places, provide a way to choose
			} else {
				Ti.API.error('Error uploading photo: ' + this.responseText);								
			}
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

	
	Ti.Geolocation.getCurrentPosition(function(location) {
		if (location.success) {
			Ti.API.info('found location!');
			client.open("POST", url);
			client.send({
				userID: userID,
				coords: JSON.stringify(location.coords),
				image: Ti.Utils.base64encode(blob).toString()	
			});    
		} else {
			Ti.API.error(location.error);
		}
    		
	});
};
