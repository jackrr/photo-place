var mongoose = require('mongoose');
var Photo = require('../schema/photoSchema');
var _ = require('underscore');
var fs = require('fs');
var uuid = require('node-uuid');

var mediaDir = __dirname + "/../../public/upload_images/";

var pageSize = 10;

function newPhoto(base64EncodeData, cb) {
	var path = uuid.v1() + '.jpg';
	var fullPath = mediaDir + path;
	console.log('writing to: ', fullPath);
	fs.writeFile(fullPath, new Buffer(base64EncodeData, "base64"), function(err) {
		if (err) cb(err);
		cb(null, path);
	});
}

Photo.findPageWithImages = function(page, cb) {
	Photo.find().skip(page*pageSize).limit(pageSize).exec(function(err, photos) {
		if (err) return cb(err);
		_.each(photos, function(photo) {
			console.log('reading from: ', mediaDir + photo.path);
			photo.image = fs.readFileSync(mediaDir + photo.path);
		});
		cb(null, photos);
	});
};

Photo.newPhotoByUser = function(options, cb) {
	console.log(options.image);
	newPhoto(options.image, function(err, path) {
		if (err) return cb(err);
		Photo.create({path: path, userID: options.user}, function(err, ret) {
			console.log('photo created: ', ret);
			cb(err, ret);
		});
	});
};

module.exports = Photo;