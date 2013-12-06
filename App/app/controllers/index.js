function addUser(e) {
	var authWin = Alloy.createController('auth').getView();
	authWin.open();
}

function openUserPage(e) {
	Alloy.createController('user');
}

function openPhotoOpts(e) {
	Alloy.createController('photoGallery');
}

function titleHeader(username){
	
}

if (!Ti.App.Properties.getObject('authInfo', false)) {
	var authWin = Alloy.createController('auth').getView();
	authWin.addEventListener('close', function(e) {
		var user = Ti.App.Properties.getObject('authInfo');
		$.title.text = 'Hello, ' + user.username;
	});

	authWin.open();
}

Ti.App.addEventListener('signIn', function(e) {
	Ti.API.info('signIn event');
	var user = Ti.App.Properties.getObject('authInfo');
	Ti.API.info(JSON.stringify(e.user));
	$.title.text = 'Hello, ' + user.username;
});

$.title.text = 'Hello, ' + Ti.App.Properties.getObject('authInfo').username;
$.index.open();
