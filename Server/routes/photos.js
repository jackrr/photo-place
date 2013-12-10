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
	}

	function byPlace(req, res) {
		var placeID = req.params.placeID;
		var page = 0;
		if (req.params.page) {
			page = req.params.page;
		}
		Photo.findPageWithImagesByPlace(page, placeID, function(err, photos) {
			if (err) return error(err, res);
			res.json({photos: photos});
		});
	}

	function byUser(req, res) {
		var userID = req.params.userID;
		var page = 0;
		if (req.params.page) {
			page = req.params.page;
		}
		Photo.findPageWithImagesByUser(page, userID, function(err, photos) {
			if (err) return error(err, res);
			res.json({photos: photos});
		});
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
		if (req.body.caption) {
			photo.caption = req.body.caption;
		}

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

	function nearby(req, res) {
		var placeArray = req.params.placeIDs.split(",");
		if (!(placeArray || placeArray.length)) return error('bad request', res);
		Photo.findTopPhotosForPlaces(placeArray, function(err, places) {
			res.json({places: places});
		});
	}

	return {
		byPage: byPage,
		byPlace: byPlace,
		byUser: byUser,
		newFromUser: newFromUser,
		byID: byID,
		nearby: nearby,
		placeConfirm: placeConfirm
	};
};