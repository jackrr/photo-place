var ServerUtil = require('serverUtil');
var users = Alloy.createCollection("user");

$.logIn.open();
//$.username.focus();

function closeWindow(nextController) {
	Alloy.createController(nextController);
	$.destroy();
	$.logIn.close();
	
}

$.logIn.addEventListener('android:back', function() {
	closeWindow('auth');
});

function submitInfo(e) {
	if ($.username.value == '' || $.password.value == '') {
		Ti.UI.createAlertDialog({
			message : 'Please fill in both fields'
		}).show();
	} else {
		var url = "";
		if (OS_IOS) {
			url = "http://localhost:3000/users/auth";
		} else {
			url = "http://10.0.2.2:3000/users/auth";
		}
		
		ServerUtil.checkPassword(url, {
			username : $.username.value,
			password : $.password.value
		}, function(err, user) {
			if (err) {
				var errAlert = Ti.UI.createAlertDialog({
					message : 'Whoops! ' + err
				});
				errAlert.show();
				errAlert.addEventListener('click', function(e) {
					$.password.value = '';
				});
			} else {
				user = JSON.parse(user);

				Ti.App.Properties.setObject('authInfo', {
					username : user.username,
					email : user.email,
					id : user._id
				});

				Ti.App.fireEvent('signIn');
				closeWindow('photoGallery');
			}
		});
	}
}
