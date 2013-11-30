module.exports = function(db) {

	function all(req, res) {
		console.log('sending stuff');
		res.json({photos: [{'_id': '1111', 'name':'jack'}, {'_id': '2222', 'name': 'nate'}]});
	}

	function atPlace(req, res) {
		res.send();

	}

	function byUser(req, res) {
		var user = req.params.user;
		res.send();
	}

	function newFromUser(req, res) {
		var user = req.body.user;
		res.send();
	}

	function byID(req, res) {
		id = req.params.id;
		res.send();
	}

	return {
		all: all,
		atPlace: atPlace,
		byUser: byUser,
		newFromUser: newFromUser,
		byID: byID
	};
};