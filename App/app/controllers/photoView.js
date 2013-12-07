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

function back() {
	self.closeWindow();
	self.destroy();
	parent.openWindow();
};

function openUser() {
	// Alloy.createController('photoGallery', {user: photo.get('userID')});	
}

function openPlace() {
	// Alloy.createController('photoGallery', {place: photo.get('placeID')});
}


var args = arguments[0] || {};
var parent = args.parent;

self.setPhoto(args.photo);
$.photoView.open();