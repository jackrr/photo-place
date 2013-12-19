var dateUtil = require('dateUtil');

var args = arguments[0] || {};
var photo = args.photo;
var parent = args.parent;

if (OS_IOS)
	$.imageView.preventDefaultImage = true;

$.userName.text = photo.get('userName');
$.placeName.text = photo.get('placeName');
$.uploadDate.text = dateUtil.prettyDate(photo.get('createdDate'));
$.imageView.image = photo.get('smallPath');

function openPhotoView() {
	var photoView = Alloy.createController('photoView', {
		photo: photo,
		parent: parent
	});
	// closeWindow();
}

function closeWindow() {
	parent.closeWindow();
}

