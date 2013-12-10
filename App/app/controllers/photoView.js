var dateUtil = require('dateUtil');

var self = this;

self.setPhoto = function(photo) {
	self.photo = photo;
	$.userName.text = photo.get('userName');
	$.placeName.text = photo.get('placeName');
	$.uploadDate.text = dateUtil.prettyDate(photo.get('createdDate'));
	$.image.image = photo.get('mediumPath');
};

self.closeWindow = function() {
	$.photoView.close();
};

self.openWindow = function() {
	$.photoView.open();
};

function back() {
	self.closeWindow();
	self.destroy();
	parent.openWindow();
}

function fullPhoto() {
	var full = Alloy.createController('largeImage', {
		photo: self.photo,
		parent: self
	});
	self.closeWindow();
}

function openUser() {
	parent.byUser(self.photo.get('userID'));
	back();
}

function openPlace() {
	parent.byPlace(self.photo.get('placeID'));
	back();
}


var args = arguments[0] || {};
var parent = args.parent;

self.setPhoto(args.photo);
$.photoView.open();