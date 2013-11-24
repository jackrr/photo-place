var serverUrl = "http://127.0.0.1:3000";
// this how we connect to localhost while using the simulator, this is a dynamic ip, don't be surprised if you have
// to change it; use ifconfig on the command line

function doClick(e) {
	alert($.label.text);
}

function getImageFromServer(e) {
	var url = serverUrl;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			alert('Success!');

			$.image.setImage(imagePath);
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
	var url = serverUrl;
	var client = Ti.Network.createHTTPClient({
		onload : function(e) {
			alert('Success!');
			$.label.setText(client.getResponseData().getText());
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
