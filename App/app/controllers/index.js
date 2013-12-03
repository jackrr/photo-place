
function addUser(e) {
	var authWin = Alloy.createController('auth').getView();
	authWin.open();
}

function openUserPage(e) {
	Alloy.createController('user');
}

function openPhotoOpts(e){
	Alloy.createController('photoGallery');
}

$.title.text = 'Hello, ' + Ti.App.Properties.getObject('authInfo').username;
$.index.open();

if (!Ti.App.Properties.getObject('authInfo', false)) {
	var authWin = Alloy.createController('auth').getView();
	authWin.addEventListener('close', function(e) {
		var user = Ti.App.Properties.getObject('authInfo');
		$.title.text = 'Hello, ' + user.username;
	});

	authWin.open();
}
