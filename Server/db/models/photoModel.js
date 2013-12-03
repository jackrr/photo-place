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
		photo.smallPath = remoteDir + photo.smallPath;
		photo.mediumPath = remoteDir + photo.mediumPath;
		photo.largePath = remoteDir + photo.largePath;
	});
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
		preSend(photos);
		cb(null, photos);
	});
};

Photo.newPhotoByUser = function(options, cb) {
	console.log(options.image);
	newPhoto(options.image, function(err, photo) {
		if (err) return cb(err);
		photo.userID = options.user;
		Photo.create(photo, function(err, ret) {
			console.log('photo created: ', ret);
			cb(err, ret);
		});
	});
};

module.exports = Photo;