
/*
 * GET users listing.
 */

function error(err, res) {
	console.log(err);
	res.json(500, {err: err});
}

module.exports = function(db) {
	var User = db.User;

	var list = function(req, res) {
		User.find({}, function(err, users) {
		    if (err) return error(err, res);
		    //res.json({users: [{'name':'jack'}, {'name': 'nate'}]});
		    res.json({users: users});
		});
	};

	var createNew = function(req, res) {
		console.log(req.body);
		User.create(req.body, function(err, user) {
			if (err) return error(err, res);
			console.log(user);
			res.json({user: user});
		});
	};

    var authUser = function(req, res) {
	console.log(req.body);
	var username = req.body.username;
	var password = req.body.password; // we still need to handle encryption

	var userMatch = User.find({ username : username }, function(err, user){
	    if (err) return error(err, res);

	    console.log(user);

	    if (user.length != 1) return error('Incorrect username', res);
	    
	    user = user[0];
	    user.comparePassword(password, function(err, match){
		if (err) return error(err, res);
		if (match) res.json(user.toJSON());
		else return error('Incorrect password', res);
	    });
	});
	
    };

	return {
		list: list,
	    createNew: createNew,
	    authUser : authUser
	}
};
