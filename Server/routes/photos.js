function error(err, res) {
	console.log(err);
	res.json(500, {err: err});
}

var pendingPhotos = {};

module.exports = function(db) {
	var Photo = db.Photo;
	var Place = db.Place;

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

	function placeConfirm(req, res) {
		if (!req.body.userID || !req.body.placeID) {
			return error('bad parameters', res);
		}
		var pend = pendingPhotos[req.body.userID];
		var place;
		_.each(pend.places, function(gplace) {
			if (gplace._id == req.body.placeID) {
				place = gplace;
			}
		});
		if (!place) {
			return error('Place not found!', res);
		}

		Photo.newPhotoByUser(pend.photo, place, function(err, photo) {
			res.json({photo: photo});
		});
	}

	function newFromUser(req, res) {
		if (!req.body.userID) {
			return error('no user', res);
		}

		if (!req.body.place) {
			return error('no place', res);
		}

		var photo = {};
		photo.userID = req.body.userID;
		photo.image = req.body.image;
		if (!photo.image) {
			return error('no image sent', res);
		}

		Place.updateOrCreate(JSON.parse(req.body.place), function(err, sPlace) {
			if (err) return error(err, res);
			Photo.newPhotoByUser(photo, sPlace._id, function(err, photo) {
				if (err) return error(err, res);
				res.json({photo: photo});
			});
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
		byID: byID,
		placeConfirm: placeConfirm
	};
};