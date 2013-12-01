//alert('Auth window opened');

function submitInfo() {
	if ($.username.value == '' || $.password1.value == '' || $.password2.value == '') {
		alert('All fields are required');
	} else if ($.password1.value != $.password2.value) {
		alert('Passwords do not match');
	} else {
		var newUser = {
			'username' : $.username.value,
			'password' : Titatnium.Utils.md5HexDigest($.password1.value)
		};
		Ti.API.info('username: ' + newUser.username + '\nhex digest: ' + newUser.password + '\npassword: ' + $.password1.value);

		Ti.App.Properties.setObject('authInfo', newUser);

		var http = Ti.Network.createHTTPClient({
			onload : function() {
				alert('New user added');
			},
			onerror : function(){
				alert('Error adding user');
			}
		});

		http.open('POST', 'https://127.0.0.1:3000/users');
		http.send(JSON.stringify(newUser));
		
		$.auth.close();
	}
}
