var dateUtil = require('dateUtil');
var self = this;

var args = arguments[0] || {};
var parent = args.parent;
var photo = args.photo;

$.image.image = photo.get('largePath');
$.largeImage.open();

function back() {
	$.largeImage.close();
	self.destroy();
	parent.openWindow();
}
