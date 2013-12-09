var LocationUtil = require('locationUtil');

//var logLocation = LocationUtil.getUserLocation();

function openUserOptions(e) {
	Alloy.createController('auth');
}

function openUserList(e) {
	Alloy.createController('user');
}

function openPhotoOpts(e) {
	Alloy.createController('photoGallery');
}

function titleHeader(username) {
	return 'Hello, ' + username;
}

Ti.App.addEventListener('signIn', function(e) {
	Ti.API.info('signIn event');
	var user = Ti.App.Properties.getObject('authInfo');
	Ti.API.info(JSON.stringify(e.user));
	
	$.index.open();
	$.title.text = titleHeader(user.username);
});

Ti.App.Properties.removeProperty('authInfo');

if (!Ti.App.Properties.getObject('authInfo', false)) {
	Ti.API.info('No authInfo property found');
	openUserOptions();

} else {
	Ti.API.info('authInfo property found, opening home page');

	$.title.text = titleHeader(Ti.App.Properties.getObject('authInfo').username);
}
