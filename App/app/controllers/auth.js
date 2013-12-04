//alert('Auth window opened');
var user = Alloy.createModel("user");
var self = this;

function closeWindow() {
	$.win.close();
};

function submitInfo() {
	if ($.username.value == '' || $.password1.value == '' || $.password2.value == '') {
		alert('All fields are required');
	} else if ($.password1.value != $.password2.value) {
		alert('Passwords do not match');
	} else {

		user.set({
			username : $.username.value,
			password : $.password1.value,
			email : $.email.value
		});

		// Ti.API.info('username: ' + newUser.username + '\nhex digest: ' + newUser.password + '\npassword: ' + $.password1.value);

		user.save(user, {
			success: function() {
				Ti.API.info(JSON.stringify(user));
				Ti.App.Properties.setObject('authInfo', {
					username: user.get('username'),
					email: user.get('email'),
					id: user.get('_id')
				});

				closeWindow();		
			}
		});
	}
}
