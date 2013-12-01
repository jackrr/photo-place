var mongoose = require('mongoose');
var Photo = require('../schema/photoSchema');
var _ = require('underscore');
var fs = require('fs');
var uuid = require('node-uuid');
var im = require('imagemagick');

var relativePath = "upload_images/";
var serverDir = __dirname + "/../../public/";
var mediaDir = serverDir + relativePath;
var remoteDir = "http://localhost:3000/" + relativePath;

var pageSize = 10;

function preSend(photos) {
	_.each(photos, function(photo) {
		photo.fullPath = remoteDir + photo.path;
	});
}

function newPhoto(base64EncodeData, cb) {
	var paths = {};
	var path = uuid.v1() + '.jpg';
	paths.smallPath = mediaDir + 'small_' + path;
	paths.mediumPath = mediaDir + 'medium_' + path;
	paths.largePath = mediaDir + 'large_' + path;
	paths.originalPath = mediaDir + 'original_' + path;
	console.log('writing to: ', paths.originalPath);
	fs.writeFile(paths.originalPath, new Buffer(base64EncodeData, "base64"), function(err) {
		if (err) cb(err);
		im.resize({
			srcPath: paths.originalPath,
			dstPath: paths.smallPath,
			width: 50
		}, function())
		cb(null, paths);
	});
}

Photo.findPageWithImages = function(page, cb) {
	Photo.find().skip(page*pageSize).limit(pageSize).exec(function(err, photos) {
		if (err) return cb(err);
		preSend(photos);
		console.log('sending: ', photos);
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