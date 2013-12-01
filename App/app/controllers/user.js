var users = Alloy.createCollection("user");

Ti.API.info('opening users page');

function updateUsers(newUsers) {
	data = [];
	_.each(newUsers.models, function(user) {
		data.push({
			'title' : user.get('name')
		});
	});

	//$.usersList.text = JSON.stringify(newUsers);
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

//$.user.open();
