//alert('Auth window opened');
var user = Alloy.createModel("user");
var self = this;

function closeWindow() {
	$.win.close();
}

function submitInfo() {
	if ($.username.value == '' || $.password1.value == '' || $.password2.value == '') {
		alert('All fields are required');
	} else if ($.password1.value != $.password2.value) {
		alert('Passwords do not match');
	} else {
		var newUser = {
			'username' : $.username.value,
			'password' : $.password1.value,
			'email' : $.email.value
		};

		user.set({
			username : $.username.value,
			password : $.password1.value,
			email : $.email.value
		});

		Ti.API.info(JSON.stringify(user));
		// Ti.API.info('username: ' + newUser.username + '\nhex digest: ' + newUser.password + '\npassword: ' + $.password1.value);

		Ti.App.Properties.setObject('authInfo', newUser);

		user.save();

		closeWindow();
	}
}
