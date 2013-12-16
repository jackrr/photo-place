var LocationUtil = require('locationUtil');

//Ti.App.Properties.removeProperty('authInfo');

function openUserOptions(e) {
	Alloy.createController('auth');
}

var self = this;

self.closeWindow = function() {
	$.index.close();
};

self.openWindow = function() {
	$.index.open();
};

function openUserList(e) {
	Alloy.createController('user', {parent: self});
	self.closeWindow();
}

function openPhotoOpts(e) {
	Alloy.createController('photoGallery', {parent: self});
	self.closeWindow();
}

function titleHeader(username) {
	return 'Hello, ' + username;
}

if (OS_IOS) {
	Ti.App.addEventListener('resumed', function(e) {
		Ti.API.info('Activity resumed');
		LocationUtil.checkForLocationUpdate();
	});
} else if (OS_ANDROID) {

}

Ti.App.addEventListener('signIn', function(e) {
	Ti.API.info('signIn event');
	// var user = Ti.App.Properties.getObject('authInfo');
	// Ti.API.info(JSON.stringify(e.user));
// 	
	// $.index.open();
	// $.title.text = titleHeader(user.username);
	
	LocationUtil.checkForLocationUpdate();
});


if (!Ti.App.Properties.getObject('authInfo', false)) {
	Ti.API.info('No authInfo property found');
	openUserOptions();

} else {
	Ti.API.info('authInfo property found, opening home page');
	// LocationUtil.checkForLocationUpdate();
	openPhotoOpts();
}
