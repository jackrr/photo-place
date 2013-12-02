var users = Alloy.createCollection("user");

//Ti.API.info('opening users page');

function updateUsers(newUsers) {
	Ti.API.info(JSON.stringify(newUsers));
	
	var data = [];
	_.each(newUsers, function(user) {
		Ti.API.info(user);
		data.push({
			'title' : user
		});
	});

	$.usersTable.setData(data);
}

users.fetch({
	success : function() {
		updateUsers(users);
	},
	error : function() {
		Ti.API.info('oops!');
	}
});

function closeWindow(){
	$.win.close();
}

// var http = Ti.Network.createHTTPClient({
	// onload : function(e){
		// Ti.API.info(http.responseText);
		// var users = JSON.parse(http.responseText).users;
		// var data = [];
		// _.each(users, function(user){
			// data.push(user.username + '\t' + user.email);
		// });
		// $.usersTable.setData(data);
	// },
	// onerror : function(e){
		// Ti.API.info('Oops!');
	// }
// });
// 
// http.open('GET','http://localhost:3000/users');
// http.send();


//$.user.open();
