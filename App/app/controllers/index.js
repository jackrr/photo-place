function doClick(e) {
	alert($.label.text);
}

function getImageFromServer(e) {
	var url = "http://132.162.82.253:3000";
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			alert('Success!');
			$.image.setImage = client.getResponseData();
		},
		onerror : function(e) {
			alert('Failure: ' + e.error);
		},
		timeout : 5000
	});

	client.open('GET', url);
	client.send();
	
}

function getTextFromServer(e) {
	var url = "http://132.162.82.253:3000";
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			alert('Success!');
			$.label.text = client.getResponseData().getText();
		},
		onerror : function(e) {
			alert('Failure: ' + e.error);
		},
		timeout : 5000
	});

	client.open('GET', url);
	client.send();
}

$.index.open();
