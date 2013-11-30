// $.galleryPhoto.open();

var args = arguments[0] || {};
var photo = args.photo;
$.rowView.title = photo.get('name');
$.rowView.backgroundImage = photo.url();


