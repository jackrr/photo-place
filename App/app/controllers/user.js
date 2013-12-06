var users = Alloy.createCollection("user");

$.user.open();

function updateUsers(newUsers) {
	Ti.API.info(JSON.stringify(newUsers));
	userList = newUsers.toJSON();

	var data = [];
	_.each(newUsers.models, function(user) {
		data.push(Ti.UI.createTableViewRow({
			'title' : user.get('username')
		}));
	});

	var usersTable = Ti.UI.createTableView({
		data : data,
		top : 10
	});
	
	$.user.add(usersTable);
}

users.fetch({
	success : function() {
		updateUsers(users);
	},
	error : function(e) {
		alert(e);
	}
});

function closeWindow() {
	$.user.close();
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
