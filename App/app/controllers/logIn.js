var ServerUtil = require('serverUtil');
var users = Alloy.createCollection("user");

$.logIn.open();
$.username.focus();

function closeWindow(e) {
	$.destroy();
	$.logIn.close();
	Alloy.createController('auth');
}

function submitInfo(e) {
	if ($.username.value == '' || $.password == '') {
		alert('Please fill in all fields');
	} else {
		var url = "http://localhost:3000/users/auth";
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

				//alert('User ' + user.username + ' logged in');
				Ti.App.fireEvent('signIn', {
					user : user
				});
				$.destroy();
				$.logIn.close();
			}
		});
	}
}
