var user = Alloy.createModel("user");

$.createAccount.open();

function closeWindow() {
	$.createAccount.close();
}

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

		user.save(user, {
			success: function() {
				Ti.API.info(JSON.stringify(user));
				Ti.App.Properties.setObject('authInfo', {
					username: user.get('username'),
					email: user.get('email'),
					id: user.get('_id')
				});
				closeWindow();
			},
			error: function(err) {
				alert(err);
			}
		});		
	}
}
