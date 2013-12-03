function error(err, res) {
	console.log(err);
	res.json(500, {err: err});
}

module.exports = function(db) {
	var Photo = db.Photo;

	function byPage(req, res) {
		var page = 0;
		if (req.params.page) {
			page = req.params.page;
		}
		Photo.findPageWithImages(page, function(err, photos) {
			if (err) return error(err, res);
			res.json({photos: photos});
		});
		// res.json({photos: [{'_id': '1111', 'name':'jack', 'image': 'AHHH'}, {'_id': '2222', 'name': 'nate', 'image': 'BAHH'}]});
	}

	function atPlace(req, res) {
		res.send();

	}

	function byUser(req, res) {
		var user = req.params.user;
		res.send();
	}

	function newFromUser(req, res) {
		// var user = req.body.user;
		var options = {};
		console.log(req.body);
		options.user = req.body.user;
		options.image = req.body.image;
		var coords = {};
		coords.latitude = req.body.coords.latitude;
		coords.longitude = req.body.coords.longitude;
		if (!options.image) {
			return error('no image sent', res);
		}
		Photo.newPhotoByUser(options, function(err, photo) {
			if (err) return error(err, res);
			res.json({photo: photo});
		});
	}

	function byID(req, res) {
		id = req.params.id;
		console.log(id);
		res.json({photo: {'_id': '1111', 'name':'jack'}});
	}

	return {
		byPage: byPage,
		atPlace: atPlace,
		byUser: byUser,
		newFromUser: newFromUser,
		byID: byID
	};
};