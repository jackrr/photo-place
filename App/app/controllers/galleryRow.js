var dateUtil = require('dateUtil');

var args = arguments[0] || {};
var photo = args.photo;
$.userName.text = photo.get('userName');
$.placeName.text = photo.get('placeName');
$.uploadDate.text = dateUtil.prettyDate(photo.get('createdDate'));
$.imageView.image = photo.get('smallPath');


function openPhotoView() {
	$.createController('photoView');
}

