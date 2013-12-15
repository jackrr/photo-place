var dateUtil = require('dateUtil');
var self = this;

var args = arguments[0] || {};
var parent = args.parent;
var photo = args.photo;

$.image.image = photo.get('largePath');
$.caption.text = "\"" + photo.get('caption') + "\"";

$.largeImage.open();

function back() {
	$.largeImage.close();
	self.destroy();
	parent.openWindow();
}

$.largeImage.addEventListener('android:back', function() {
	back();
});
