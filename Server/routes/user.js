
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
			console.log('sending stuff');
		  res.json({users: [{'name':'jack'}, {'name': 'nate'}]});
		  // res.json({users: users});
		});
	};

	var createNew = function(req, res) {
		console.log(req);
	};

	return {
		list: list,
		createNew: createNew
	}
};
