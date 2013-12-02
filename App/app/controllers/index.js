function getImageFromServer(e) {
	var url = "http://127.0.0.1:3000";
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
	var url = "http://127.0.0.1:3000";
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

function addUser(e) {
	Ti.API.info('addUser click registered');
	var authWin = Alloy.createController('auth').getView();
	authWin.open();
}

function openUserPage(e) {
	var usersWin = Alloy.createController('user').getView();
	usersWin.open();
}

// $.title.text = 'Hello, ' + Ti.App.Properties.getObject('authInfo').username;
$.index.open();

// FOR TESTING PURPOSES I AM RESETING AUTH INFO
// DON'T FORGET TO REMOVE
Ti.App.Properties.setObject('authInfo', null);

if (!Ti.App.Properties.getObject('authInfo', false)) {
	var authWin = Alloy.createController('auth').getView();
	authWin.addEventListener('close', function(e) {
		var user = Ti.App.Properties.getObject('authInfo');
		$.title.text = 'Hello, ' + user.username;
	});

	authWin.open();
}

