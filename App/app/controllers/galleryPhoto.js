// $.galleryPhoto.open();

var args = arguments[0] || {};
var photo = args.photo;
$.rowView.title = photo.get('name');
$.imageView.image = photo.get('image');


