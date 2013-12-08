var mongoose = require('mongoose');
var Photo = require('../schema/photoSchema');
var User = require('../schema/userSchema');
var Place = require('../schema/placeSchema');
var _ = require('underscore');
var fs = require('fs');
var uuid = require('node-uuid');
var im = require('imagemagick');

var relativePath = "upload_images/";
var serverDir = __dirname + "/../../public/";
var mediaDir = serverDir + relativePath;
var remoteDir = "http://localhost:3000/" + relativePath;

var pageSize = 5;

function preSend(photos, cb) {
	var numRunningQueries = photos.length;

	_.each(photos, function(photo) {
		photo.smallPath = remoteDir + photo.smallPath;
		photo.mediumPath = remoteDir + photo.mediumPath;
		photo.largePath = remoteDir + photo.largePath;

		Place.find({_id: photo.placeID}, function(err, place) {
			if (err || !(place && place.length)) {
				photo.placeName = "";
			} else {
				photo.placeName = place[0].name;
			}
			User.find({_id: photo.userID}, function(err, user) {
				if (err || !(user && user.length)) {
					photo.username = "";
				} else {
					photo.userName = user[0].username;
				}
				--numRunningQueries;
				if (numRunningQueries === 0) {
		      // finally, AFTER all callbacks did return:
		      cb(photos);
		    }
		  });
		});
	});
	if (numRunningQueries === 0) {
		cb(photos);
	}
}

function localPath(file) {
	return mediaDir + file;
}

function newPhoto(base64EncodeData, cb) {
	var path = uuid.v1() + '.jpg';
	var photoFields = {
		smallPath: 'small_' + path,
		mediumPath: 'medium_' + path,
		largePath: 'large_' + path,
		originalPath: 'original_' + path
	}
	fs.writeFile(localPath(photoFields.originalPath), new Buffer(base64EncodeData, "base64"), function(err) {
		if (err) return cb(err);
		im.resize({
			srcPath: localPath(photoFields.originalPath),
			dstPath: localPath(photoFields.smallPath),
			height: 50
		}, function(err) {
			if (err) return cb(err);
			im.resize({
				srcPath: localPath(photoFields.originalPath),
				dstPath: localPath(photoFields.mediumPath),
				height: 100
			}, function(err) {
				if (err) return cb(err);
				im.resize({
					srcPath: localPath(photoFields.originalPath),
					dstPath: localPath(photoFields.largePath),
					height: 400
				}, function(err) {
					if (err) return cb(err);
					cb(null, photoFields);
				});
			});
		});
	});
}

Photo.findPageWithImages = function(page, cb) {
	Photo.find().skip(page*pageSize).limit(pageSize).exec(function(err, photos) {
		if (err) return cb(err);
		preSend(photos, function(finalPhotos) {
			cb(null, finalPhotos);
		});
	});
};

Photo.findPageWithImagesByUser = function(page, userID, cb) {
	Photo.find({userID: userID}).skip(page*pageSize).limit(pageSize).exec(function(err, photos) {
		if (err) return cb(err);
		preSend(photos, function(finalPhotos) {
			cb(null, finalPhotos);
		});
	});
};

Photo.findPageWithImagesByPlace = function(page, placeID, cb) {
	Photo.find({placeID: placeID}).skip(page*pageSize).limit(pageSize).exec(function(err, photos) {
		if (err) return cb(err);
		preSend(photos, function(finalPhotos) {
			cb(null, finalPhotos);
		});
	});
};

Photo.findTopPhotosForPlaces = function(placeIDs, cb) {
	var photos = [];
	var errored;
	var numRunningQueries = placeIDs.length;
	_.each(placeIDs, function(id) {
		Photo.find({placeID: id}, function(err, placePhotos) {
			if (err) errored = err;
			photos.concat(placePhotos);
			--numRunningQueries;
			if (numRunningQueries === 0) {
		    // finally, AFTER all callbacks did return:
		    if (errored) {
		    	cb(errored);
		    } else {
		    	preSend(photos, function(finalPhotos) {
			      cb(null, finalPhotos);
		    	});
		    }
	    }
		});
	});
	if (numRunningQueries === 0) {
		cb(null);
	}
}

Photo.newPhotoByUser = function(pic, placeID, cb) {
	newPhoto(pic.image, function(err, photo) {
		if (err) return cb(err);
		photo.userID = pic.userID;
		photo.placeID = placeID;
		photo.createdDate = Date.now();
		Photo.create(photo, function(err, ret) {
			console.log('photo created: ', ret);
			cb(err, ret);
		});
	});
};

module.exports = Photo;