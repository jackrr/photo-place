var args = arguments[0] || {};
var photo = args.photo;
$.rowView.title = photo.get('_id');
$.imageView.image = photo.get('smallPath');


