var user = Alloy.createModel("user");

$.createAccount.open();

function closeWindow() {
	$.createAccount.close();
}

function checkEmail(email){
	if (!(new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$").test(email))){
		Ti.UI.createAlertDialog({
			message : 'Email address is improperly formatted'
		}).show();
		return false;
	} else 
		return true;
}

function checkUsername(username) {
	var myAlert = Ti.UI.createAlertDialog({
		message : ''
	});
	
	if (username == '') {
		myAlert.setMessage('Please fill in all fields');

	} else if (username.length > 15) {
		myAlert.setMessage('Username must be less than 15 characters long');

	} else if (!(new RegExp("^[a-zA-Z0-9]+$")).test(username)) {
		myAlert.setMessage('Username may only contain letters and numbers');

	}

	if (myAlert.message == '')
		return true;
	else {
		myAlert.show();
		return false;
	}
}

function checkPassword(password1, password2) {
	var myAlert = Ti.UI.createAlertDialog({
		message : ''
	});

	if (password1 == '' || password2 == '') {
		myAlert.setMessage('Please fill in all fields');

	} else if (password1 != password2) {
		myAlert.setMessage('Passwords do not match');

	} else if (password1.length < 6){
		myAlert.setMessage('Passwords must be at least 6 characters long');
		
	}
	
	if (myAlert.message == '')
		return true;
	else {
		myAlert.show();
		return false;
	}
}

function submitInfo() {
	if (checkEmail($.email.value) && checkUsername($.username.value) && checkPassword($.password1.value, $.password2.value)) {
		user.set({
			username : $.username.value,
			password : $.password1.value,
			email : $.email.value
		});

		user.save(user, {
			success : function() {
				Ti.API.info(JSON.stringify(user));
				Ti.App.Properties.setObject('authInfo', {
					username : user.get('username'),
					email : user.get('email'),
					id : user.get('_id')
				});
				closeWindow();
			},
			error : function(user,err) {
				Ti.API.info('err '+JSON.stringify(err.err));
				var errAlert = Ti.UI.createAlertDialog({
					title : 'Whoops!', 
					message : err
				});
				if (err.err.code == 11000)  errAlert.setMessage('That username is already taken');
				errAlert.show();
			}
		});
	}

}
