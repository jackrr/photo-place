var users = Alloy.createCollection("user");
$.user.open();

function updateUsers(newUsers) {
	newtext = '';
	_.each(newUsers.models, function(user) {
		newtext = newtext + user.get('name');
	});
	// $.usersList.text = JSON.stringify(newUsers);
	$.usersList.text = newtext;
}

users.fetch({
	success: function() {
		alert(JSON.stringify(users));
		updateUsers(users);		
	},
	error: function(e) {
		alert(e);
	}
});


