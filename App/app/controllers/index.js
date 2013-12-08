var self = this;

self.closeWindow = function() {
	$.index.close();
};

self.openWindow = function() {
	$.index.open();
};

function addUser(e) {
	var authWin = Alloy.createController('auth').getView();
	authWin.open();
}

function openUserPage(e) {
	Alloy.createController('user');
	self.closeWindow();
}

function openPhotoOpts(e) {
	Alloy.createController('photoGallery', {parent: self});
	self.closeWindow();
}

function titleHeader(username) {
	return 'Hello, ' + username;
}

if (!Ti.App.Properties.getObject('authInfo', false)) {
	var authWin = Alloy.createController('auth').getView();
	authWin.addEventListener('close', function(e) {
		var user = Ti.App.Properties.getObject('authInfo');
		$.title.text = titleHeader(user.username);
	});

	self.closeWindow();
	authWin.open();
}

Ti.App.addEventListener('signIn', function(e) {
	Ti.API.info('signIn event');
	var user = Ti.App.Properties.getObject('authInfo');
	Ti.API.info(JSON.stringify(e.user));
	$.title.text = titleHeader(user.username);
});

$.title.text = titleHeader(Ti.App.Properties.getObject('authInfo').username);
$.index.open();
