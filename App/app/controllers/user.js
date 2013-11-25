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
		updateUsers(users);		
	},
	error: function() {
		Ti.API.error('oops!');
	}
});


