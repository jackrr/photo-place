//alert('Auth window opened');

function closeWindow(){
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
		Ti.API.info(JSON.stringify(newUser));
		
		var userModel = Alloy.createModel('user', newUser);
		userModel.save();

		Ti.App.Properties.setObject('authInfo', newUser);
		
		closeWindow();
	}
}
