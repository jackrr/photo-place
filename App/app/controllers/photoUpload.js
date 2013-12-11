var args = arguments[0] || {};
var parent = args.parent;
var image = args.image;
var place = args.place;
var self = this;
var photo = Alloy.createModel('photo');

$.imageView.image = image;
$.placeName.text = place.name; 
$.photoUpload.open();

self.exit = function() {
	self.destroy();
	parent.openWindow();
};

function done() {
	photo.setImage(image, place, $.caption.value);
	self.exit();
}

function cancel() {
	self.exit();
}
